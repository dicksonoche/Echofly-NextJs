import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaLongArrowAltLeft } from "react-icons/fa";

const PostEdit = ({ EDIT_POST, query }) => {
  const router = useRouter();

  const [updatePost, setUpdatePost] = useState("");

  const postEdit = async () => {
    try {
      if (!updatePost) {
        console.log("Provide Details");
      } else {
        await EDIT_POST(query.postEdit, updatePost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="middle-wrap">
            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                <a href="/" className="ont-xs text-white fw-600">
                  <FaLongArrowAltLeft />
                </a>
                <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                  Edit Post Details
                </h4>
              </div>
              <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <label className="mont-font fw-600 font-xsss">
                      Description
                    </label>
                    <textarea
                      onChange={(e) => setUpdatePost(e.target.value)}
                      className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                      rows="5"
                      placeholder={"update Post"}
                      spellCheck="false"
                    ></textarea>
                  </div>

                  <div className="col-lg-12">
                    <a
                      onClick={() => postEdit()}
                      className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                    >
                      Update Post
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
