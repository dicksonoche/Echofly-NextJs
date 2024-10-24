import React from "react";

//INTERNAL IMPORT
import { MainVideoPost } from "../MainBody";

const YourVideos = ({
  AllAppPost,
  LIKE_POST,
  DELETE_POST,
  setOpenComment,
  setCommentPostID,
  setAllPostComments,
}) => {
  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {AllAppPost.map((post, index) => (
                <>
                  {post.postType == "Video" && (
                    <MainVideoPost
                      DELETE_POST={DELETE_POST}
                      LIKE_POST={LIKE_POST}
                      post={post}
                      setOpenComment={setOpenComment}
                      setCommentPostID={setCommentPostID}
                      setAllPostComments={setAllPostComments}
                    />
                  )}
                </>
              ))}

              <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3">
                <div
                  className="snippet mt-2 ms-auto me-auto"
                  data-title=".dot-typing"
                >
                  <div className="stage">
                    <div className="dot-typing"></div>
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

export default YourVideos;
