import React, { useEffect, useState } from "react";
import "./index.css";
import fetchFromApi from "../../../../fetchFromApi";

export const CommentItem = ({ commentId }) => {
  const [commentData, setCommentData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const { commentText, userId } = commentData;

  useEffect(() => {
    const getData = async () => {
      let commentData;
      const url = `/api/post/comment/${commentId}`;
      const response = await fetchFromApi(url, "GET");
   
      if (response.ok) {
        commentData = await response.json();
        
        setCommentData(commentData);
      }
  
      const userResponse = await fetchFromApi(`/api/user/${userId}`, "GET");
      const data = await userResponse.json();
     
      setUserDetails(data?.user);
    };
  
    getData();
  }, [commentId,userId]);

  return (
    <div className="comment-item">
      
        <img
          src={userDetails?.userImage ? userDetails?.userImage : "images/blank-profile-picture.png"}
          alt=""
          className="user-image"
        />

        <div className="username-comment-container">
          <p className="username">{userDetails?.userName}</p>
          <p className="comment-text">{commentText}</p>
        </div>
      </div>
  
  );
};
