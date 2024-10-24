import React from "react";
import {
  BiSolidVideo,
  BiUser,
  BiImage,
} from "react-icons/bi";
import { LiaCertificateSolid } from "react-icons/lia";
import {
  MdOutlineMail,
  MdOutlineVerifiedUser,
  MdOutlineViewTimeline,
} from "react-icons/md";
import { GiShadowFollower } from "react-icons/gi";
import { SlUserFollowing } from "react-icons/sl";

const SideBar = ({
  setActiveComponent,
  backgroundTheme,
  menuPostion,
  navbarActive,
  pageType,
  userAccount,
}) => {
  const sideBarMenu = [
    {
      name: "Timeline",
      icon: <MdOutlineViewTimeline />,
    },
    {
      name: "Users",
      icon: <MdOutlineVerifiedUser />,
    },
    {
      name: "Profile",
      icon: <BiUser />,
    },
  ];

  const morePageMenu = [
    {
      name: "Messages",
      icon: <MdOutlineMail />,
    },
    {
      name: "Following",
      icon: <GiShadowFollower />,
    },
    {
      name: "Followers",
      icon: <SlUserFollowing />,
    },
  ];

  const accountPage = [
    {
      name: "Photos",
      icon: <BiImage />,
    },
    {
      name: "Videos",
      icon: <BiSolidVideo />,
    },
  ];

  return (
    <nav
      className={`navigation scroll-bar ${
        backgroundTheme ? "menu-current-color" : ""
      }  ${menuPostion ? "menu-active" : ""} ${
        navbarActive ? "nav-active" : ""
      }`}
    >
      <div className="container ps-0 pe-0">
        <div className="nav-content">
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span> {userAccount?.name} </span>
            </div>
            <ul className="mb-1 top-content">
              {sideBarMenu.map((menu, index) => (
                <li key={index + 1}>
                  <a
                    href={pageType == "details" ? "/" : `#${menu.name}`}
                    onClick={() => setActiveComponent(menu.name)}
                    className="nav-content-bttn open-font"
                  >
                    <i
                      className={` btn-round-md text-current bg-transparent me-3`}
                    >
                      {menu.icon}
                    </i>
                    <span>{menu.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span>Account Activity</span>
            </div>
            <ul className="mb-3">
              {morePageMenu.map((menu, index) => (
                <li key={index}>
                  <a
                    href={pageType == "details" ? "/" : `#${menu.name}`}
                    onClick={() => setActiveComponent(menu.name)}
                    className="nav-content-bttn open-font"
                  >
                    <i className="font-xl text-current  me-3">{menu.icon}</i>
                    <span>{menu.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span>Explore Media</span>
            </div>
            <ul className="mb-1">
              <li className="logo d-none d-xl-block d-lg-block"></li>
              {accountPage.map((menu, index) => (
                <li key={index}>
                  <a
                    href={pageType == "details" ? "/" : `#${menu.name}`}
                    onClick={() => setActiveComponent(menu.name)}
                    className="nav-content-bttn open-font h-auto pt-2 pb-2"
                  >
                    <i className="font-sm  me-3 text-grey-500">{menu.icon}</i>
                    <span>{menu.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
