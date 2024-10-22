import React, { useState, useEffect } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { IoLockOpenOutline, IoEyeOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

import Events from "../../../Ads/eventsAds.json";

const UserInfo = ({ AppUserPost }) => {
  const [displayUser, setDisplayUser] = useState({});

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("YOUR_DETAIL"));

    setDisplayUser(userDetails);
  }, []);

  return (
    <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
      <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
        <div className="card-body d-block p-4">
          <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
          <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">
            {displayUser?.biography}
          </p>
        </div>
        <div className="card-body d-flex border-top-xs">
          <i className=" text-grey-500 me-3 font-lg">
            <FaRegUser />
          </i>
          <h4 className="fw-700 text-grey-900 font-xssss mt-0">
            Full Name
            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
              {displayUser?.firstName} {displayUser?.lastName}
            </span>
          </h4>
        </div>

        <div className="card-body d-flex pt-0">
          <i className=" text-grey-500 me-3 font-lg">
            <TfiWorld />
          </i>
          <h4 className="fw-700 text-grey-900 font-xssss mt-0">
            Website
            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
              {displayUser?.website?.slice(0, 30)}..
            </span>
          </h4>
        </div>
        <div className="card-body d-flex pt-0">
          <i className=" text-grey-500 me-3 font-lg">
            <IoLocationOutline />
          </i>
          <h4 className="fw-700 text-grey-900 font-xssss mt-1">
            {displayUser?.city}, {displayUser?.phone}
          </h4>
        </div>
      </div>
      <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
        <div className="card-body d-flex align-items-center p-4">
          <h4 className="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
          <a href="#" className="fw-600 ms-auto font-xssss text-primary">
            Recent Photos
          </a>
        </div>
        <div className="card-body d-block pt-0 pb-2">
          <div className="row">
            {AppUserPost.reverse().map((photo, index) => (
              <>
                {photo.postType == "Image" && (
                  <div className={`col-6 mb-2 ps-1`}>
                    <a href="images/e-2.jpg" data-lightbox="roadtrip">
                      <img
                        src={photo.postURL}
                        alt="image"
                        className="img-fluid rounded-3 w-100"
                      />
                    </a>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="card-body d-block w-100 pt-0">
          <a
            href="#"
            className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
          >
            <i className=" font-xss me-2">
              <BsBoxArrowUpRight />
            </i>
            More
          </a>
        </div>
      </div>

      <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
        <div className="card-body d-flex align-items-center p-4">
          <h4 className="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
          <a href="#" className="fw-600 ms-auto font-xssss text-primary">
            See all
          </a>
        </div>

        {Events.map((event, index) => (
          <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
            <div
              className={`${
                index == 0
                  ? "bg-success"
                  : index == 1
                  ? "bg-warning"
                  : "bg-primary"
              } me-2 p-3 rounded-xxl`}
            >
              <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
                <span className="ls-1 d-block font-xsss text-white fw-600">
                  {event.month}
                </span>
                {event.day}
              </h4>
            </div>
            <h4 className="fw-700 text-grey-900 font-xssss mt-2">
              {event.title}
              <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">
                {event.discription}
              </span>
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
