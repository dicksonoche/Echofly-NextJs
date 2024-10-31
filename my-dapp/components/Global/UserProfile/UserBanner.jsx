import React from "react";

//INTERNAL IMPORT
import { shortenAddress } from "../../../utils/utils";
import { BiUser } from "react-icons/bi";

const UserBanner = ({ userAccount }) => {
  
  return (
    <div className="col-xl-12">
      <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3 overflow-hidden">
        <div
          className="card-body position-relative h240 bg-image-cover bg-image-center"
          style={{ backgroundImage: "url(images/bb-9.jpg)" }}
        ></div>
        <div className="card-body d-block pt-4 text-center position-relative">
          <figure className="avatar mt--6 position-relative w75 z-index-1 w100 z-index-1 ms-auto me-auto">
            <i className="btn-round-md font-xl text-white bg-black">
              <BiUser />
            </i>
          </figure>

          <h4 className="font-xs ls-1 fw-700 text-grey-900">
            {shortenAddress(userAccount.owner)}
            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
              {userAccount.name}
            </span>
          </h4>
          <div className="d-flex align-items-center pt-0 position-absolute left-15 top-10 mt-4 ms-2">
            <h4 className="font-xsssss text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2">
              <b className="text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark">
                {userAccount.postCount}
              </b>
              Posts
            </h4>
            <h4 className="font-xsssss text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2">
              <b className="text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark">
                {userAccount.followerCount}
              </b>
              Followers
            </h4>
            <h4 className="font-xsssss text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2">
              <b className="text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark">
                {userAccount.followingCount}
              </b>
              Following
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
