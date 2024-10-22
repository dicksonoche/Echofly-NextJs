import React from "react";
import { BiHomeAlt, BiSolidVideo, BiUser, BiShoppingBag } from "react-icons/bi";

const GlobalAppFooter = ({ setActiveComponent }) => {
  return (
    <div className="app-footer border-0 shadow-lg bg-primary-gradiant">
      <a
        onClick={() => setActiveComponent("Timeline")}
        className="nav-content-bttn nav-center"
      >
        <i className="">
          <BiHomeAlt />
        </i>
      </a>
      <a
        onClick={() => setActiveComponent("Top User")}
        className="nav-content-bttn"
      >
        <i className="">
          <BiUser />
        </i>
      </a>
      <a
        onClick={() => setActiveComponent("Memberships")}
        className="nav-content-bttn"
        data-tab="chats"
      >
        <i className="">
          <BiShoppingBag />
        </i>
      </a>
      <a onClick={() => setActiveComponent("Video")} className="nav-content-bttn">
        <i className="">
          <BiSolidVideo />
        </i>
      </a>
      <a
        onClick={() => setActiveComponent("Author Profile")}
        className="nav-content-bttn"
      >
        <img
          src="images/female-profile.png"
          alt="user"
          className="w30 shadow-xss"
        />
      </a>
    </div>
  );
};

export default GlobalAppFooter;
