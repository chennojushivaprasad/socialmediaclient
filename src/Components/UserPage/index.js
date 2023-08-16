import { useState, useEffect, useContext } from "react";
import "./index.css";
import fetchFromApi from "../../fetchFromApi";
import { useParams } from "react-router-dom";
import TabList from "./TabList";
import PostImage from "./PostMedia";
import { AppContext } from "../../Context";
import SignOut from "../Buttons/SignoutButton";

const tabs = [
  { tabName: "Posts", tabId: "POSTS" },
  { tabName: "Saved", tabId: "SAVED" },
];

export const UserDetailsPage = () => {
  const { setActiveMenuId } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(tabs[0].tabId);
  const { id: userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setLoadingStatus] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  const getUserData = async (userId) => {
    const response = await fetchFromApi(`/api/user/${userId}`, "GET");

    if (response.ok) {
      const data = await response.json();
      setUserDetails(data?.user);

      setAllPosts(data?.user?.posts);
      setLoadingStatus(false);
    } else {
      setUserDetails([]);
      setLoadingStatus(true);
    }
  };

  useEffect(() => {
    if (userId !== undefined) {
      getUserData(userId);
    } else {
      setUserDetails([]);
    }
  }, [userId]);

  const renderReels = () => {
    <ul className="reels-lists">{}</ul>;
  };

  const renderPosts = () => {
    return (
      <ul className="posts-lists">
        {allPosts?.map((id) => {
          return (
            <PostImage postId={id} userId={userId} setAllposts={setAllPosts} />
          );
        })}
      </ul>
    );
  };
  const renderActiveTabData = () => {
    switch (activeTab) {
      case tabs[0].tabId:
        return renderPosts();

      case tabs[1].tabId:
        return renderReels();
    }
  };

  if (isLoading) {
    return;
  }

  const { userName, userImage, followers, posts, following } = userDetails;

  return (
    <div className="user-page">
      <div className="container">
        <div className="user-info-container">
          <div className="user-image-container">
            <img
              src={
                userImage
                  ? userImage
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
              className="user-image"
            />
          </div>
          <div className="user-details">
            <p className="user-name">{userName}</p>

            <div className="stats">
              <p className="posts-count count">{posts?.length} posts</p>
              <p className="followers-count count">
                {followers?.length} followers
              </p>
              <p className="following-count count">
                {following?.length} following
              </p>
            </div>
          </div>
          <div className="signout-container">
            <SignOut />
          </div>
        </div>
        <div className="tabs-container">
          <ul className="tabs-lists">
            {tabs.map((tab) => (
              <TabList
                tab={tab}
                isActive={tab.tabId === activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </ul>
        </div>
        <div className="user-uploaded-media">{renderActiveTabData()}</div>
      </div>
    </div>
  );
};
