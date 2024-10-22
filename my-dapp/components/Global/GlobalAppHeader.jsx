import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const GlobalAppHeader = ({}) => {
  return (
    <div className="app-header-search">
      <form className="search-form">
        <div className="form-group searchbox mb-0 border-0 p-1">
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search..."
          />
          <i className="input-icon">
            <ion-icon
              name="search-outline"
              role="img"
              class="md hydrated"
              aria-label="search outline"
            ></ion-icon>
          </i>
          <a href="#" className="ms-1 mt-1 d-inline-block close searchbox-close">
            <i className=" font-xs">
              <AiOutlineClose />
            </i>
          </a>
        </div>
      </form>
    </div>
  );
};

export default GlobalAppHeader;
