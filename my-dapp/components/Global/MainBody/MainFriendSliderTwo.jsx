import React from "react";

//INTERNAL IMPORT
import { shortenAddress } from "../../../utils/utils";
import { BiUser } from "react-icons/bi";

const MainFriendSliderTwo = ({ AppUsers, FOLLOW_USER }) => {
  return (
    <div className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
      <div className="new_flex owl-theme overflow-hidden nav-none">
        {AppUsers.reverse().map((user, index) => (
          <div className="item" key={index + 1}>
            <div className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-2 mt-3">
              <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                <figure className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                  <i className="btn-round-md font-xl text-white bg-black">
                    <BiUser />
                  </i>
                </figure>
                <div className="clearfix"></div>
                <h4 className="fw-700 font-xssss mt-3 mb-1">{user.name}</h4>
                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                  {shortenAddress(user.owner)}
                </p>
                <a
                  onClick={() => FOLLOW_USER(user.owner)}
                  className="text-center p-2 lh-20 w100 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                >
                  FOLLOW
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFriendSliderTwo;
