import React, { useState, useEffect } from "react";
import {
  BiUser,
} from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";

// Utility function
import { shortenAddress } from "../../../utils/utils";

// Header component
const Header = ({
  INITAIL_CONTRACT,
  intrestedUsers,
  setActiveComponent,
  setOpenSideChat,
  openSideChat,
  openTheme,
  setOpenTheme,
  setTheme,
  theme,
  menuPostion,
  setMenuPostion,
  backgroundTheme,
  setBackgroundTheme,
  functionName,
  navbarActive,
  setNavbarActive,
  userAddress,
  setUserAddress,
  onHandleSearch,
  onClearSearch,
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const displayFollowing = intrestedUsers.filter(
    (item) => item.owner !== "0x0000000000000000000000000000000000000000"
  );

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [userAddress]);

  const handleAccountsChanged = (accounts) => {
    setUserAddress(accounts[0]?.toLowerCase());
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  return (
    <div className="nav-header bg-white shadow-xs border-0">
      <HeaderTop
        functionName={functionName}
        setOpenSideChat={setOpenSideChat}
        openSideChat={openSideChat}
        setActiveComponent={setActiveComponent}
        navbarActive={navbarActive}
        setNavbarActive={setNavbarActive}
      />

      <HeaderSearch
        searchItem={searchItem}
        setSearchItem={setSearchItem}
      />

      <HeaderNotification
        setActiveComponent={setActiveComponent}
        displayFollowing={displayFollowing}
      />

      <HeaderTheme
        backgroundTheme={backgroundTheme}
        setBackgroundTheme={setBackgroundTheme}
        menuPostion={menuPostion}
        setMenuPostion={setMenuPostion}
        theme={theme}
        setTheme={setTheme}
        openTheme={openTheme}
        setOpenTheme={setOpenTheme}
        openSideChat={openSideChat}
        setOpenSideChat={setOpenSideChat}
      />

      <HeaderAvatar setActiveComponent={setActiveComponent} />
    </div>
  );
};

// Sub-components
const HeaderTop = ({
  functionName,
  setOpenSideChat,
  openSideChat,
  setActiveComponent,
  navbarActive,
  setNavbarActive,
}) => (
  <div className="nav-top">
    <a onClick={() => functionName()}>
      <Image
        src="/images/logo.png"
        height={60}
        width={60}
        alt="user"
        className="h-12 w-fit"
      />
      <span className="d-inline-block fredoka-font ls-3 fw-400 text-current font-md logo-text mb-0">
        Echofly
      </span>
    </a>
    <button
      onClick={() =>
        navbarActive ? setNavbarActive(false) : setNavbarActive(true)
      }
      className="nav-menu me-0 ms-2"
    ></button>
  </div>
);

const HeaderSearch = ({ searchItem, setSearchItem }) => (
  <form action="#" className="float-left header-search">
    <div className="form-group mb-0 icon-input">
      <i className=" font-sm text-grey-400">
        <BsSearch />
      </i>
      <input
        type="text"
        placeholder="Search"
        className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
        onChange={(e) => setSearchItem(e.target.value)}
        value={searchItem}
      />
    </div>
  </form>
);

const HeaderNotification = ({ displayFollowing, setActiveComponent }) => (
  <>
    <a
      className="p-2 text-center ms-auto menu-icon"
      id="dropdownMenu3"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span className="dot-count bg-warning"></span>
      <i className=" font-xl text-current">
        <MdOutlineNotificationsNone />
      </i>
    </a>
    <div
      onClick={() => setActiveComponent("Message")}
      className="dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg"
      aria-labelledby="dropdownMenu3"
    >
      <h4 className="fw-700 font-xss mb-4">Notification</h4>
      {displayFollowing
        .map((notification, index) => (
          <NotificationItem notification={notification} index={index} />
        ))
        .slice(0, 5)}
    </div>
  </>
);

const NotificationItem = ({ notification, index }) => (
  <div
    key={index + 1}
    className={`card bg-transparent-card w-100 border-0 ps-5 ${
      index == 3 ? "mb-0" : "mb-3"
    }`}
  >
    <img
      src={`images/user-${index + 1}.png`}
      alt="user"
      className="w40 position-absolute left-0"
    />
    <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
      {notification.name}
      <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
        {new Date(notification.timeCreated * 1000).toDateString()}
      </span>
    </h5>
    <h6 className="text-grey-500 fw-500 font-xssss lh-4">
      {shortenAddress(notification.owner)} &nbsp; &nbsp; &nbsp; &nbsp;ID:{" "}
      {notification.userID}
    </h6>
  </div>
);

const HeaderTheme = ({
  setOpenSideChat,
  openSideChat,
  openTheme,
  setOpenTheme,
  setTheme,
  theme,
  menuPostion,
  setMenuPostion,
  backgroundTheme,
  setBackgroundTheme,
}) => (
  <>
    <div className="p-2 text-center ms-3 position-relative dropdown-menu-icon menu-icon cursor-pointer">
      <span onClick={() => (openTheme ? setOpenTheme(false) : setOpenTheme(true))}>
        <IconComponent
          icon={<FiMenu />}
          styleClass="d-inline-block"
        />
      </span>
      <div className={`dropdown-menu-settings switchcolor-wrap ${openTheme ? "active" : ""}`}>
        <h4 className="fw-700 font-sm mb-4">Additional Settings</h4>
        <ThemeComponent
          target="toggle-menu-color"
          title="Sidebar Background"
          handleClick={() =>
            backgroundTheme
              ? setBackgroundTheme(false)
              : setBackgroundTheme(true)
          }
        />
        <ThemeComponent
          target="toggle-menu"
          title="Indent Sidebar"
          handleClick={() =>
            menuPostion ? setMenuPostion(false) : setMenuPostion(true)
          }
        />
        <ThemeComponent
          target="toggle-dark"
          title="Dark Mode"
          handleClick={() => (theme ? setTheme(false) : setTheme(true))}
        />
      </div>
    </div>
  </>
);

const HeaderAvatar = ({ setActiveComponent }) => (
  <a
    onClick={() => setActiveComponent("Profile")}
    className="p-0 ms-3 menu-icon"
  >
    <IconComponent icon={<BiUser />} />
  </a>
);

// Utility Components
const IconComponent = ({ icon, styleClass = "" }) => (
  <i className={`font-xl text-current ${styleClass}`}>{icon}</i>
);

const ThemeComponent = ({ title, target, handleClick }) => (
  <div
    onClick={handleClick}
    className={`dropdown-item toggle-settings ${target}`}
  >
    <span className="btn-round-xss ms-auto bg-grey-200"></span>
    {title}
  </div>
);

export default Header;
