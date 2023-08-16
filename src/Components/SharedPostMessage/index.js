import React, { useEffect, useState } from "react";
import PostCardUserProfie from "../Post/PostCardUserProfile";
import ShortVideoPlayer from "../ShortVideoPlayer";
import fetchFromApi from "../../fetchFromApi";
import "./index.css";

const SharedPostMessage = ({ post }) => {
  const { userId } = post;
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetchFromApi(`/api/user/${userId}`, "GET");
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data?.user);
      } else {
        setUserDetails(null);
      }
    };

    getUserData();
  }, [userId]);

  if (userDetails && post) {
    const { userImage, userName } = userDetails;
    const { media } = post;
    const { mediaType, mediaUrl } = media;
    return (
      <div className="share-post-message">
        <PostCardUserProfie userName={userName} userImage={userImage} />

        <div className="post-card-media">
          {mediaType?.toLowerCase() === "video" ? (
            <ShortVideoPlayer video={post} />
          ) : (
            <img src={mediaUrl} alt="postImage" className="post-card-image" />
          )}
        </div>
      </div>
    );
  }
};

export default SharedPostMessage;
