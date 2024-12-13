import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import {
  Header,
  SideBar,
  MainBody,
  GlobalChatModal,
  GlobalAppHeader,
  GlobalAppFooter,
  Register,
  Members,
  UserProfile,
  User,
  Message,
  YourFriends,
  YourPhotos,
  YourVideos,
  YourText,
  SinglePost,
  EditPost,
  GlobalCommentModal,
  Loader,
} from "../components/index";
import { CreatePost } from "../components/Global/MainBody/index";
///INTERNAL IMPORT
import { SOCIAL_MEDIA_Context } from "../context/context";

const index = () => {
  //CONTEXT DATA
  const {
    INITAIL_CONTRACT,
    CREATE_ACCOUNT,
    CREATE_POST,
    LIKE_POST,
    UNLIKE_POST,
    ADD_COMMENT_POST,
    SEND_MESSAGE,
    EDIT_POST,
    FOLLOW_USER,
    UNFOLLOW_USER,
    READ_MESSAGE,
    GET_SINGLE_POST,
    DELETE_POST,
    connected,
    setConnected,
    connectWallet,
    AllAppPost,
    AppUsers,
    AppUserPost,
    userAccount,
    userFollowers,
    userFollowing,
    loader,
    openCreatePost,
    setOpenCreatePost,
    userAddress,
    setUserAddress,
    activeComponent,
    setActiveComponent,
    openComment,
    setOpenComment,
    count,
  } = useContext(SOCIAL_MEDIA_Context);

  //ROUTER
  const router = useRouter();
  const [postType, setPostType] = useState();
  const [openSideChat, setOpenSideChat] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const [backgroundTheme, setBackgroundTheme] = useState(false); //menu-current-color
  const [menuPostion, setMenuPostion] = useState(false); //menu-active
  const [theme, setTheme] = useState(false); //theme-dark
  const [navbarActive, setNavbarActive] = useState(false); //nav-active

  //LOCAL STATE
  const [commentPostID, setCommentPostID] = useState();
  const [allPostComments, setAllPostComments] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    if (router.asPath == "/") {
      setActiveComponent("Timeline");
    } else setActiveComponent(router.asPath.slice(2));
    if (router.query.type) {
      setActiveComponent("");
      console.log(router.query.type);
      setPostType(router.query.type);
    }
  }, [router.isReady]);

  const [sendUser, setSendUser] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [openChatModel, setOpenChatModel] = useState(false);

  //NEW LOCAL STATE
  const [allPostFilter, setAllPostFilter] = useState(AllAppPost);
  const [allPostFilterCopy, setAllPostFilterCopy] = useState(AllAppPost);

  //FILTER ALL POST
  const onHandleSearch = (value) => {
    const filteredPost = AllAppPost.filter(({ postType }) =>
      postType.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredPost.length === 0) {
      setAllPostFilter(allPostFilterCopy);
    } else {
      setAllPostFilter(filteredPost);
    }
  };

  const onClearSearch = () => {
    if (AllAppPost.length && allPostFilterCopy.length) {
      setAllPostFilter(allPostCopy);
    }
  };

  console.log(allPostFilter);

  return (
    <>
      {connected == "CREATE_ACCOUNT" ? (
        <Register
          CREATE_ACCOUNT={CREATE_ACCOUNT}
          userAddress={userAddress}
          connected={connected}
          connectWallet={connectWallet}
        />
      ) : (
        <div
          className={`color-theme-darkorchid mont-font ${theme ? "theme-dark" : ""} `}
        >
          <div className="main-wrapper">
            {/* TOP NAVIGATION */}
            <Header
              INITAIL_CONTRACT={INITAIL_CONTRACT}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
              navbarActive={navbarActive}
              setNavbarActive={setNavbarActive}
              backgroundTheme={backgroundTheme}
              setBackgroundTheme={setBackgroundTheme}
              menuPostion={menuPostion}
              setMenuPostion={setMenuPostion}
              theme={theme}
              setTheme={setTheme}
              openTheme={openTheme}
              setOpenTheme={setOpenTheme}
              openSideChat={openSideChat}
              setOpenSideChat={setOpenSideChat}
              intrestedUsers={userFollowers}
              setActiveComponent={setActiveComponent}
              onHandleSearch={onHandleSearch}
              onClearSearch={onClearSearch}
            />
            {/* <!-- navigation left --> */}
            <SideBar
              navbarActive={navbarActive}
              menuPostion={menuPostion}
              backgroundTheme={backgroundTheme}
              setActiveComponent={setActiveComponent}
              message={userFollowers.length}
              pageType={router.query.type}
              userAddress={userAddress}
              userAccount={userAccount}
            />

            {activeComponent == "Timeline" ? (
              <MainBody
                menuPostion={menuPostion}
                userAddress={userAddress}
                CREATE_ACCOUNT={CREATE_ACCOUNT}
                DELETE_POST={DELETE_POST}
                setOpenCreatePost={setOpenCreatePost}
                AllAppPost={AllAppPost}
                AppUsers={AppUsers}
                LIKE_POST={LIKE_POST}
                FOLLOW_USER={FOLLOW_USER}
                setOpenComment={setOpenComment}
                setCommentPostID={setCommentPostID}
                setAllPostComments={setAllPostComments}
              />
            ) : activeComponent == "Users" ? (
              <Members AppUsers={AppUsers} FOLLOW_USER={FOLLOW_USER} />
            ) : activeComponent == "Profile" ? (
              <UserProfile
                setOpenCreatePost={setOpenCreatePost}
                userAccount={userAccount}
                AppUserPost={AppUserPost}
                AppUsers={AppUsers}
                LIKE_POST={LIKE_POST}
                FOLLOW_USER={FOLLOW_USER}
                setOpenComment={setOpenComment}
                setCommentPostID={setCommentPostID}
                setAllPostComments={setAllPostComments}
              />
            ) : activeComponent == "Messages" ? (
              <Message
                intrestedUsers={userFollowers}
                setSendUser={setSendUser}
                setSendAddress={setSendAddress}
                setOpenChatModel={setOpenChatModel}
              />
            ) : activeComponent == "Following" ? (
              <YourFriends
                intrestedUsers={userFollowing}
                handleFunction={UNFOLLOW_USER}
                type={"Unfollow"}
              />
            ) : activeComponent == "Followers" ? (
              <YourFriends
                handleFunction={() => {}}
                intrestedUsers={userFollowers}
              />
            ) : activeComponent == "Photos" ? (
              <YourPhotos
                AllAppPost={AllAppPost}
                LIKE_POST={LIKE_POST}
                setOpenComment={setOpenComment}
                setCommentPostID={setCommentPostID}
                setAllPostComments={setAllPostComments}
              />
            ) : activeComponent == "Videos" ? (
              <YourVideos
                DELETE_POST={DELETE_POST}
                AllAppPost={AllAppPost}
                LIKE_POST={LIKE_POST}
                setOpenComment={setOpenComment}
                setCommentPostID={setCommentPostID}
                setAllPostComments={setAllPostComments}
              />
            ) : activeComponent == "Edit Profile" ? (
              <YourText userAddress={userAddress} />
            ) : postType == "details" ? (
              <SinglePost
                GET_SINGLE_POST={GET_SINGLE_POST}
                DELETE_POST={DELETE_POST}
                userAddress={userAddress}
                LIKE_POST={LIKE_POST}
                setOpenComment={setOpenComment}
                setCommentPostID={setCommentPostID}
                setAllPostComments={setAllPostComments}
              />
            ) : postType == "edit" ? (
              <EditPost EDIT_POST={EDIT_POST} query={router.query} />
            ) : (
              <MainBody
                menuPostion={menuPostion}
                userAddress={userAddress}
                CREATE_ACCOUNT={CREATE_ACCOUNT}
                DELETE_POST={DELETE_POST}
                setOpenCreatePost={setOpenCreatePost}
                AllAppPost={AllAppPost}
                AppUsers={AppUsers}
                LIKE_POST={LIKE_POST}
                FOLLOW_USER={FOLLOW_USER}
                setOpenComment={setOpenComment}
                setCommentPostID={setCommentPostID}
                setAllPostComments={setAllPostComments}
              />
            )}

            <GlobalAppFooter setActiveComponent={setActiveComponent} />
            <GlobalAppHeader
              setOpenSideChat={setOpenSideChat}
              setActiveComponent={setActiveComponent}
            />
          </div>

          {openChatModel ? (
            <GlobalChatModal
              userAddress={userAddress}
              READ_MESSAGE={READ_MESSAGE}
              sendUser={sendUser}
              sendAddress={sendAddress}
              openChatModel={openChatModel}
              setOpenChatModel={setOpenChatModel}
              SEND_MESSAGE={SEND_MESSAGE}
              loader={loader}
              count={count}
            />
          ) : (
            ""
          )}

          {openCreatePost ? (
            <div className="createPost">
              <CreatePost
                setOpenCreatePost={setOpenCreatePost}
                CREATE_POST={CREATE_POST}
              />
            </div>
          ) : (
            ""
          )}

          {openComment ? (
            <div className="createPost">
              <GlobalCommentModal
                allPostComments={allPostComments}
                setOpenComment={setOpenComment}
                ADD_COMMENT_POST={ADD_COMMENT_POST}
                commentPostID={commentPostID}
              />
            </div>
          ) : (
            ""
          )}
          {loader ? (
            <div className="new_loader">
              <Loader />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default index;
