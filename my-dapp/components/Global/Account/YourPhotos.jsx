import React from "react";

//INTERNAL IMPORT
import { MainImagePost } from "../MainBody/index";

const YourPhotos = ({
  AllAppPost,
  LIKE_POST,
  setOpenComment,
  setCommentPostID,
  setAllPostComments,
}) => {
  return (
    <div className="main-content bg-white right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-lg-12">
              <div className="row">
                {AllAppPost.map((post, index) => (
                  <>
                    {post.postType == "Image" && (
                      <MainImagePost
                        LIKE_POST={LIKE_POST}
                        post={post}
                        setOpenComment={setOpenComment}
                        setCommentPostID={setCommentPostID}
                        setAllPostComments={setAllPostComments}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPhotos;
