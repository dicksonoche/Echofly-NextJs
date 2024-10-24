import React, { useState } from "react";

import {
  MainLoader,
  MainRightSideBar,
  MainStory,
  MainCreatePost,
  MainMultiPost,
  MainTextPost,
  MainVideoPost,
  MainFourPost,
  MainFriendSliderTwo,
  MainImagePost,
  MainPostLoader,
  CreatePost,
} from "./index";

const MainBody = ({
  menuPostion,
  setOpenCreatePost,
  CREATE_ACCOUNT,
  AllAppPost,
  AppUsers,
  LIKE_POST,
  FOLLOW_USER,
  DELETE_POST,
  userAddress,
  setOpenComment,
  setCommentPostID,
  setAllPostComments,
}) => {
  const displayPosts = [];

  AllAppPost.map((item) => {
    if (item.author == "0x0000000000000000000000000000000000000000") {
      return;
    } else {
      displayPosts.push(item);
    }
  });
  return (
    <>
      <div
        className={`main-content right-chat-active ${
          menuPostion ? "menu-active" : ""
        }`}
      >
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            {/* <!-- loader wrapper --> */}
            <MainLoader />
            {/* /<!-- loader wrapper --> */}
            <div className="row feed-body">
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                <MainStory CREATE_ACCOUNT={CREATE_ACCOUNT} />
                <MainCreatePost setOpenCreatePost={setOpenCreatePost} />
                {/* //POST SECTION  1*/}
                {displayPosts
                  .reverse()
                  .map((post, index) => (
                    <>
                      {post.postType == "Text" ? (
                        <MainTextPost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      ) : post.postType == "Video" ? (
                        <MainVideoPost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      ) : (
                        <MainImagePost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      )}
                    </>
                  ))
                  .slice(0, 1)}
                {/* //POST SECTION  2*/}
                {displayPosts
                  .map((post, index) => (
                    <>
                      {post.postType == "Text" ? (
                        <MainTextPost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      ) : post.postType == "Video" ? (
                        <MainVideoPost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      ) : (
                        <MainImagePost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      )}
                    </>
                  ))
                  .slice(1, 5)}
                <MainFriendSliderTwo
                  FOLLOW_USER={FOLLOW_USER}
                  AppUsers={AppUsers}
                />
                {displayPosts
                  .map((post, index) => (
                    <>
                      {post.postType == "Text" ? (
                        <MainTextPost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      ) : post.postType == "Video" ? (
                        <MainVideoPost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      ) : (
                        <MainImagePost
                          setAllPostComments={setAllPostComments}
                          setCommentPostID={setCommentPostID}
                          setOpenComment={setOpenComment}
                          DELETE_POST={DELETE_POST}
                          userAddress={userAddress}
                          LIKE_POST={LIKE_POST}
                          post={post}
                        />
                      )}
                    </>
                  ))
                  .slice(5)}

                <MainPostLoader />
              </div>

              <MainRightSideBar AppUsers={AppUsers} FOLLOW_USER={FOLLOW_USER} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBody;
