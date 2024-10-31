import React from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";
//INTERNAL IMPORT
import { MainShareLink, MainSocialShare } from "./index";
import { shortenAddress } from "../../../utils/utils";

const MainTextPost = ({
  post,
  LIKE_POST,
  userAddress,
  DELETE_POST,
  setOpenComment,
  setCommentPostID,
  setAllPostComments,
}) => {
  //NOTIFICATION
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    notifySuccess("Address Copy Successfully");
  };
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0 new_margin">
      <div className="card-body p-0 d-flex">
        <figure className="avatar me-3 m-0">
          <i className="btn-round-md font-xl text-white bg-black">
            <BiUser />
          </i>
        </figure>
        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
          {shortenAddress(post.author)}
          <MdOutlineContentCopy onClick={() => copyAddress(post.author)} />
          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
            {new Date(post.timeCreated * 1000).toDateString()}
          </span>
        </h4>
        <a
          href="#"
          className="ms-auto"
          id="dropdownMenu6"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className=" text-grey-900 btn-round-md bg-greylight font-xss">
            <BsThreeDots />
          </i>
        </a>
        <MainShareLink
          userAddress={userAddress}
          author={post.author}
          DELETE_POST={DELETE_POST}
          postID={post.postID}
        />
      </div>
      <div className="card-body p-0 me-lg-5">
        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
          {post.postDescription}
        </p>
      </div>
      <div className="card-body d-flex p-0">
        <a
          onClick={() => LIKE_POST(post.postID)}
          className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
        >
          <i className=" text-black bg-transparent me-2 btn-round-xs font-xs">
            <AiOutlineHeart />
          </i>
          {post.likes} Like
        </a>
        <a
          onClick={() => (
            setOpenComment(true),
            setCommentPostID(post.postID),
            setAllPostComments(post.comments)
          )}
          className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
        >
          <i className=" text-dark text-grey-900 btn-round-sm font-xs">
            <FaRegComment />
          </i>
          <span className="d-none-xss">{post.comments.length} Comment</span>
        </a>
        <a
          href="#"
          id="dropdownMenu31"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
        >
          <i className=" text-grey-900 text-dark btn-round-sm font-lg">
            <AiOutlineShareAlt />
          </i>
          <span className="d-none-xs">Share</span>
        </a>

        <MainSocialShare postID={post.postID} />
      </div>
    </div>
  );
};

export default MainTextPost;
