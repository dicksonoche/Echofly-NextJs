import React from "react";
import { BsSearch } from "react-icons/bs";
import { BiSolidFilterAlt } from "react-icons/bi";

import { shortenAddress } from "../../../utils/utils";

const YourFriends = ({ intrestedUsers, handleFunction, type }) => {
  const displyFollowing = [];

  intrestedUsers.map((item) => {
    if (item.owner == "0x0000000000000000000000000000000000000000") {
      console.log("delete iTem");
    } else {
      displyFollowing.push(item);
      console.log(item);
    }
  });
  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left pe-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                <div className="card-body d-flex align-items-center p-0">
                  <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">
                    Users
                  </h2>
                  <div className="search-form-2 ms-auto">
                    <i className=" font-xss">
                      <BsSearch />
                    </i>
                    <input
                      type="text"
                      className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                      placeholder="Search here."
                    />
                  </div>
                  <a
                    href="#"
                    className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"
                  >
                    <i className=" font-xss text-grey-500">
                      <BiSolidFilterAlt />
                    </i>
                  </a>
                </div>
              </div>

              <div className="row ps-2 pe-1">
                {displyFollowing.map((follower, index) => (
                  <div className="col-md-4 col-sm-6 pe-2 ps-2">
                    <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                      <div className="card-body d-block w-100 p-4 text-center">
                        <figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
                          <img
                            src="images/user_2.png"
                            alt="image"
                            className="float-right p-1 bg-white rounded-circle w-100"
                          />
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xss mt-3 mb-0">
                          {follower.name}
                        </h4>
                        <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                          {shortenAddress(follower.owner)}
                        </p>
                        <ul className="d-flex align-items-center justify-content-center mt-1">
                          <li className="m-2">
                            <h4 className="fw-700 font-sm">
                              {follower.postCount}
                              <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                Posts
                              </span>
                            </h4>
                          </li>
                          <li className="m-2">
                            <h4 className="fw-700 font-sm">
                              {follower.followerCount}
                              <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                Followers
                              </span>
                            </h4>
                          </li>
                          <li className="m-2">
                            <h4 className="fw-700 font-sm">
                              {follower.followingCount}
                              <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                Followings
                              </span>
                            </h4>
                          </li>
                        </ul>

                        <a
                          onClick={() => handleFunction(follower.owner)}
                          className="mt-4 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
                        >
                          {type}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFriends;
