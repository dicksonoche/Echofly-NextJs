import React from "react";

import {
  MainTextPost,
  MainVideoPost,
  MainImagePost,
  MainCreatePost,
} from "../MainBody/index";
import { UserBanner, UserInfo } from "./index";
//INTERNAL IMPORT
import { Members, Shop } from "../../index";

const UserProfile = ({
  AppUserPost,
  LIKE_POST,
  userAccount,
  setOpenCreatePost,
  setOpenComment,
  setCommentPostID,
  setAllPostComments,
}) => {
  const displayPosts = [];

  AppUserPost.map((item) => {
    if (item.author == "0x0000000000000000000000000000000000000000") {
      console.log("delete iTem");
    } else {
      displayPosts.push(item);
    }
  });

  console.log(AppUserPost);
  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <UserBanner userAccount={userAccount} />

            <UserInfo AppUserPost={AppUserPost} />

            <div className="col-xl-8 col-xxl-9 col-lg-8">
              <MainCreatePost setOpenCreatePost={setOpenCreatePost} />
              {displayPosts.reverse().map((post, index) => (
                <>
                  {post.postType == "Text" ? (
                    <MainTextPost
                      setOpenComment={setOpenComment}
                      setCommentPostID={setCommentPostID}
                      setAllPostComments={setAllPostComments}
                      userAccount={userAccount}
                      LIKE_POST={LIKE_POST}
                      post={post}
                    />
                  ) : post.postType == "Video" ? (
                    <MainVideoPost
                      setOpenComment={setOpenComment}
                      setCommentPostID={setCommentPostID}
                      setAllPostComments={setAllPostComments}
                      userAccount={userAccount}
                      LIKE_POST={LIKE_POST}
                      post={post}
                    />
                  ) : (
                    <MainImagePost
                      setOpenComment={setOpenComment}
                      setCommentPostID={setCommentPostID}
                      setAllPostComments={setAllPostComments}
                      userAccount={userAccount}
                      LIKE_POST={LIKE_POST}
                      post={post}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
