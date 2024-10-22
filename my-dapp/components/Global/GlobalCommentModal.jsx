import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";

//INTERNAL IMPRT
import { MainShareLink, Upload } from "../index";

const GlobalComment = ({
  setOpenComment,
  ADD_COMMENT_POST,
  commentPostID,
  allPostComments,
}) => {
  const [comment, setComment] = useState("");

  console.log(allPostComments);
  return (
    <div className="middle-sidebar-left w-100">
      <div className="middle-wrap">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 ">
            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
              <div className="card-body p-0">
                <a
                  onClick={() => setOpenComment(false)}
                  className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"
                >
                  <i className="btn-round-sm font-xs text-primary  me-2 bg-greylight">
                    <AiOutlineClose />
                  </i>
                  Give Comment
                </a>
              </div>
            </div>

            <div className="modal-popup-body w-100 p-3 new_chat_modal">
              {allPostComments.map((comment, index) => (
                <>
                  <div className="message self text-right mt-2">
                    <div className="message-content font-xssss lh-24 fw-500">
                      {comment}
                    </div>
                  </div>

                  <div className="font-xsssss lh-24 fw-500 text-grey-500   float-right">
                    COMMENT ID: {index + 1}
                  </div>
                  <div className="clearfix"></div>
                </>
              ))}
            </div>
            <div className="modal-popup-footer w-100 border-top">
              <div className="card p-3 d-block border-0 d-block">
                <div className="form-group icon-right-input style1-input mb-0">
                  <input
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Start typing.."
                    className="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3"
                  />
                  <i
                    className=" text-grey-500 font-md"
                    onClick={() => ADD_COMMENT_POST(commentPostID, comment)}
                  >
                    <BsFillSendFill />
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalComment;
