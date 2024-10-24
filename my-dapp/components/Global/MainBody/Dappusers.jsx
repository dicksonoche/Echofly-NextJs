import React from "react";
import { BiUser } from "react-icons/bi";

const Dappusers = ({ FOLLOW_USER, AppUsers, shortenAddress }) => {
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
      <div className="card-body d-flex align-items-center p-4">
        <h4 className="fw-700 mb-0 font-xssss text-grey-900">Who to follow</h4>
      </div>
      {AppUsers.map((user, index) => (
        <>
          <div
            className={`card-body d-flex ps-4  pe-4 pb-0 ${
              index == 0 ? "border-top-xs bor-0 pt-4" : "pt-0"
            } `}
          >
            <figure className="avatar me-3">
              <i className="btn-round-md font-xl text-white bg-black">
                <BiUser />
              </i>
            </figure>
            <h4 className="fw-700 text-grey-900 font-xssss mt-1">
              {user.name}
              <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                {shortenAddress(user.owner)}
              </span>
            </h4>
          </div>
          <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
            <a
              onClick={() => FOLLOW_USER(user.owner)}
              className="p-2 lh-20 w100 bg-primary-gradient me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl"
            >
              Follow
            </a>
          </div>
        </>
      )).slice(0, 3)}
    </div>
  );
};

export default Dappusers;
