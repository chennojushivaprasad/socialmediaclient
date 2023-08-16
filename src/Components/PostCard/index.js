import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import fetchFromApi from "../../fetchFromApi";
import PostCardButtons from "../Buttons/PostCardButtons";
import PostCardUserProfie from "../Post/PostCardUserProfile";
import { AppContext } from "../../Context";
import ShortVideoPlayer from "../ShortVideoPlayer";

export const PostCard = ({ post }) => {
  const { updateCommentComponent, accountUser } = useContext(AppContext);
  const { _id: postId } = post;
  const [postDetails, setPostDetails] = useState([]);
  const [isLoading, setLoadingStatus] = useState(true);

  useEffect(() => {
    const userId = accountUser?._id;
    fetchFromApi(`/api/post/${postId}/${userId}`, "GET")
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => {
        setPostDetails(data);
        setLoadingStatus(false);
      });
  }, [postId]);

  const renderList = () => {
    const { userName, userImage, media, meta, date, userId } = postDetails;
    const { mediaType, mediaUrl } = media;
    const { comments, likes } = meta;
    return (
      <li className="post-card">
        <div className="card-container">
          <PostCardUserProfie
            userName={userName}
            userImage={userImage}
            userId={userId}
            date={date}
          />
          <div className="post-card-media">
            {mediaType?.toLowerCase() === "video" ? (
              <ShortVideoPlayer video={postDetails} />
            ) : (
              <img src={mediaUrl} alt="postImage" className="post-card-image" />
            )}
          </div>
          <div className="">
            <PostCardButtons
              updateLikePost={setPostDetails}
              post={postDetails}
            />
            <p className="post-likes-count">
              {likes > 0
                ? likes === 1
                  ? "1 like"
                  : likes + "likes"
                : "Be the first to Like this"}{" "}
            </p>

            {comments > 0 && (
              <button type="button" className="view-all-comments-button">
                <p
                  className="post-comments-count"
                  onClick={() => updateCommentComponent(true)}
                >
                  View all {comments} comments{" "}
                </p>
              </button>
            )}
          </div>
        </div>
      </li>
    );
  };
  return isLoading ? null : renderList();
};
