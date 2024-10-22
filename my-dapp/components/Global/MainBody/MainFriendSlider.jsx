import React from "react";

//INTERNAL IMPORT
import { shortenAddress } from "../../../utils/utils";

const MainFriendSlider = ({ AppUsers }) => {
  return (
    <div className="card w-100 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
      <div className="new_flex owl-theme overflow-hidden nav-none">
        {AppUsers.map((user, index) => (
          <div className="item">
            <div className="card w200 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 me-2 mt-3">
              <div
                className="card-body position-relative h100 bg-image-cover bg-image-center"
                style={{ backgroundImage: "url(images/u-bg.jpg)" }}
              ></div>
              <div className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                <figure className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                  <img
                    src="images/user.png"
                    alt="image"
                    className="float-right p-1 bg-white rounded-circle w-100"
                  />
                </figure>
                <div className="clearfix"></div>
                <h4 className="fw-700 font-xsss mt-2 mb-1">{user.name}</h4>
                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                  {shortenAddress(user.owner)}
                </p>
                <span className="live-tag mt-2 mb-0 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">
                  LIVE PROFILE
                </span>
                <div className="clearfix mb-2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFriendSlider;
