import React from "react";
import {
  AiOutlineEdit,
  AiOutlineVideoCameraAdd,
  AiOutlineCamera,
} from "react-icons/ai";
import { HiPhotograph } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";

//INTERNAL IMPORT
import { MainShareLink } from "./index";
import { BiUser } from "react-icons/bi";

const MainCreatePost = ({ setOpenCreatePost }) => {
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
      <div className="card-body p-0 mt-3 position-relative">
        <figure className="avatar position-absolute ms-2 mt-1 top-5">
          <i className="btn-round-sm font-sm text-white bg-black">
            <BiUser />
          </i>
        </figure>
        <textarea
          onClick={() => setOpenCreatePost(true)}
          name="message"
          className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
          cols="30"
          rows="10"
          placeholder="What's happening?"
        ></textarea>
      </div>
    </div>
  );
};

export default MainCreatePost;
