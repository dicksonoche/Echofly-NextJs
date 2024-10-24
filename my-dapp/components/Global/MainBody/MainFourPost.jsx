import React from "react";

//INTERNAL IMPRT
import { MainShareLink, MainSocialShare } from "./index";

const MainFourPost = () => {
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
      <div className="card-body p-0 d-flex">
        <figure className="avatar me-3">
          <img
            src="images/user-8.png"
            alt="image"
            className="shadow-sm rounded-circle w45"
          />
        </figure>
        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
          Anthony Daugloi
          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
            2 hour ago
          </span>
        </h4>
        <a
          href="#"
          className="ms-auto"
          id="dropdownMenu5"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
        </a>

        <MainShareLink />
      </div>

      <div className="card-body p-0 me-lg-5">
        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla
          dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus
          mollis pharetra. Proin blandit ac massa sed rhoncus
          <a href="#" className="fw-600 text-primary ms-2">
            See more
          </a>
        </p>
      </div>
      <div className="card-body d-block p-0 mb-3">
        <div className="row ps-2 pe-2">
          <div className="col-xs-6 col-sm-6 p-1">
            <a href="images/t-36.jpg" data-lightbox="roadtri">
              <img src="images/t-21.jpg" className="rounded-3 w-100" alt="image" />
            </a>
          </div>
          <div className="col-xs-6 col-sm-6 p-1">
            <a href="images/t-32.jpg" data-lightbox="roadtri">
              <img src="images/t-22.jpg" className="rounded-3 w-100" alt="image" />
            </a>
          </div>
        </div>
        <div className="row ps-2 pe-2">
          <div className="col-xs-4 col-sm-4 p-1">
            <a href="images/t-33.jpg" data-lightbox="roadtri">
              <img src="images/t-23.jpg" className="rounded-3 w-100" alt="image" />
            </a>
          </div>
          <div className="col-xs-4 col-sm-4 p-1">
            <a href="images/t-34.jpg" data-lightbox="roadtri">
              <img src="images/t-24.jpg" className="rounded-3 w-100" alt="image" />
            </a>
          </div>
          <div className="col-xs-4 col-sm-4 p-1">
            <a
              href="images/t-35.jpg"
              data-lightbox="roadtri"
              className="position-relative d-block"
            >
              <img src="images/t-25.jpg" className="rounded-3 w-100" alt="image" />
              <span className="img-count font-sm text-white ls-3 fw-600">
                <b>+2</b>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="card-body d-flex p-0">
        <a
          href="#"
          className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
        >
          <i className="feather-heart text-white bg-red-gradient me-2 btn-round-xs font-xss"></i>
          2.8K Like
        </a>
        <div className="emoji-wrap">
          <ul className="emojis list-inline mb-0">
            <li className="emoji list-inline-item">
              <i className="em em---1"></i>
            </li>
            <li className="emoji list-inline-item">
              <i className="em em-angry"></i>
            </li>
            <li className="emoji list-inline-item">
              <i className="em em-anguished"></i>
            </li>
            <li className="emoji list-inline-item">
              <i className="em em-astonished"></i>
            </li>
            <li className="emoji list-inline-item">
              <i className="em em-blush"></i>
            </li>
            <li className="emoji list-inline-item">
              <i className="em em-clap"></i>
            </li>
            <li className="emoji list-inline-item">
              <i className="em em-cry"></i>
            </li>
            <li className="emoji list-inline-item">
              <i className="em em-full_moon_with_face"></i>
            </li>
          </ul>
        </div>
        <a
          href="#"
          className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
        >
          <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
          <span className="d-none-xss">22 Comment</span>
        </a>
        <a
          href="#"
          id="dropdownMenu31"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
        >
          <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
          <span className="d-none-xs">Share</span>
        </a>

        <MainSocialShare />
      </div>
    </div>
  );
};

export default MainFourPost;
