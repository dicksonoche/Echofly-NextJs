import React from "react";
import { BiHomeAlt, BiUser, BiShoppingBag } from "react-icons/bi";

const GlobalAppFooter = ({ setActiveComponent }) => {
  return (
    <div className="app-footer border-0 shadow-lg bg-primary-gradient">
      <a
        onClick={() => setActiveComponent("Timeline")}
        className="nav-content-bttn nav-center"
      >
        <i className="">
          <BiHomeAlt />
        </i>
      </a>
      <a
        onClick={() => setActiveComponent("Users")}
        className="nav-content-bttn"
      >
        <i className="">
          <BiUser />
        </i>
      </a>
      <a
        onClick={() => setActiveComponent("Profile")}
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
