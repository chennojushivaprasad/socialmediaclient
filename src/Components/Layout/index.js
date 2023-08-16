import React, { useContext } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import BottomNavigationBar from "../BottomNavigationBar";
import "./index.css";
import { AppContext } from "../../Context";
import CommentDialogBox from "../DialogBox/CommentDialogBox";
import Search from "../Search";
import CreatePost from "../DialogBox/AddPost/CreatePost";
import { Navigate } from "react-router-dom";
import UploadingProgressBar from "../UploadingProgressBar";
import ShareDialogBox from "../DialogBox/ShareDialogBox";

const Layout = (props) => {
  const {
    activeComment,
    activeMenuId,
    isValidUser,
    uploadStatus,
    activeModalId,
    isActiveshareModal,
  } = useContext(AppContext);

  if (isValidUser) {
    return (
      <div className="app-container">
        {(activeMenuId !== "REELS" || activeMenuId !== "MESSAGES") && <Header />}
        {uploadStatus && <UploadingProgressBar />}

        {activeModalId === "SEARCH" && <Search />}
        {activeModalId === "CREATE" && <CreatePost />}
        {isActiveshareModal &&  <ShareDialogBox/>}
        <div className="main-content">
          <Sidebar />
          {props.children}
        </div>
        <BottomNavigationBar />
        {activeComment && <CommentDialogBox />}
      </div>
    );
  }
  return <Navigate to="/login" replace="true" />;
};

export default Layout;
