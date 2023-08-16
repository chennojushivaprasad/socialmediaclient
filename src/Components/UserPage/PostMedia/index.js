import React, { useEffect, useState } from "react";
import "./index.css";
import fetchFromApi from "../../../fetchFromApi";
import { MdDeleteOutline } from "react-icons/md";

const PostImage = ({ postId, userId, setAllposts }) => {
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const getPostData = async () => {
      const response = await fetchFromApi(
        `/api/post/${postId}/${userId}`,
        "GET"
      );

      if (response.ok) {
        const data = await response.json();
        setPostDetails(data);
      } else {
        setPostDetails([]);
      }
    };
    getPostData();
  }, [userId, postId]);

  const deletePost = async () => {
    const response = await fetchFromApi(
      `/api/post/${postId}/${userId}`,
      "DELETE"
    );

    if (response.ok) {
      await response.json();
      setAllposts((prev) => {
        const filteredPosts = prev?.filter((id) => id !== postId);
        return filteredPosts;
      });
    }
  };

  if (postDetails) {
    const { _id, media } = postDetails;

    return (
      <li key={_id} className="post">
        <div className="post-container">
          {media?.mediaType === "image" && (
            <img
              src={media?.mediaUrl}
              className="post-media post-image"
              alt={`Post `}
            />
          )}
          {media?.mediaType === "video" && (
            <video src={media?.mediaUrl} className="post-media post-video" />
          )}
          <p>{}</p>
        </div>
        <button
          type="button"
          className="post-delete-button"
          onClick={deletePost}
        >
          <MdDeleteOutline className="delete-icon" />
        </button>
      </li>
    );
  }
  return;
};

export default PostImage;
