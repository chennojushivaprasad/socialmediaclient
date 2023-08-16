import React, { useContext } from "react";
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import { AppContext } from "../../../Context";
import "./index.css";

const PostCardButtons = (props) => {
  const {
    updateCommentComponent,
    updateLike,
    setShareModalActiveStatus,
    setSharePostDetails,
  } = useContext(AppContext);
  const { post, updateLikePost } = props;
  const { isLiked } = post;

  const openShareModal = () => {
    setShareModalActiveStatus(true);
    setSharePostDetails(post);
  };

  return (
    <div className="post-card-button-container">
      <button
        type="button"
        className="post-card-button"
        onClick={() => {
          if (updateLikePost) {
            updateLike(post, updateLikePost);
          }
        }}
      >
        {isLiked ? (
          <BsFillSuitHeartFill
            className={`post-like-icon post-card-button-icon ${
              isLiked && "active-like-icon"
            }`}
          />
        ) : (
          <BsSuitHeart className="post-like-icon post-card-button-icon " />
        )}
      </button>
      <button
        type="button"
        className="post-card-button"
        onClick={() => {
          post !== undefined && updateCommentComponent(true, post);
        }}
      >
        <FaRegComment className="post-comment-icon post-card-button-icon" />
      </button>
      <button type="button" className="post-card-button" onClick={openShareModal}>
        <MdOutlineIosShare className="post-share-icon post-card-button-icon" />
      </button>
    </div>
  );
};

export default PostCardButtons;
