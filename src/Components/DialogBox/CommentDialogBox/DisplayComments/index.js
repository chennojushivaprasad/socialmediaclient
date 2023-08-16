import React, { useContext, useState } from "react";
import "./index.css";
import PostCardButtons from "../../../Buttons/PostCardButtons";
import PostCardUserProfie from "../../../Post/PostCardUserProfile";
import { AppContext } from "../../../../Context";

const DisplayComments = ({ post }) => {
  const { userImage, userName } = post;
  const { setActivePost } = useContext(AppContext);

  const [commentText, setCommentText] = useState("");

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    // const response = await fetchFromApi(`/api/post/comment/addComment/${postId}`, "POST", {
    //   commentText,
    //   userId,
    // });
    // const data = await response.json();
    // return data;
  };

  return (
    <div className="display-comment">
      <PostCardUserProfie userImage={userImage} userName={userName} />
      <div className="comments-list-button-container">
        <ul className="comments-list">
          {/* {comments.map((id) => {
            return <CommentItem commentId={id} key={id} />;
          })} */}
        </ul>

        <div>
          <PostCardButtons post={post} updateLikePost={setActivePost} />
          <div className="add-comment-container">
            <textarea
              placeholder="Add a comment..."
              className="comment-input"
              onChange={handleInputChange}
            />
            {commentText && (
              <button
                className="send-comment-button"
                type="button"
                onClick={handleCommentSubmit}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayComments;
