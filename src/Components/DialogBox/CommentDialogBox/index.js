import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
// import { PostPreviewImage } from "../AddPost/PostPreviewImage";
import { AppContext } from "../../../Context";
import DisplayComments from "./DisplayComments";
import ShortVideoPlayer from "../../ShortVideoPlayer";
import CloseModalButton from "../../Buttons/CloseModal";

const CommentDialogBox = () => {
  const { activePost } = useContext(AppContext);
  const { media, _id: postId } = activePost;

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const [screenHeight, setScreenHeight] = useState(windowHeight - 20);
  const { updateCommentComponent } = useContext(AppContext);
  const [maxMediaWidth, setmaxMediaWidth] = useState(null);
  const refMedia = useRef(null);

  const closeModal = () => updateCommentComponent(false, null);

  useEffect(() => {
    const getResize = (event) => {
      setScreenHeight(event.target.innerHeight);
    };

    window.addEventListener("resize", getResize);
    return () => window.removeEventListener("resize", getResize);
  });

  useEffect(() => {
    const width =
      (refMedia.current?.naturalWidth / refMedia?.current?.naturalHeight) *
      (screenHeight - 20);
    setmaxMediaWidth(width);
  }, [maxMediaWidth, screenHeight]);

  if (activePost) {
    const { mediaType, mediaUrl } = media;
    return (
      <div className="comment-dialog-box">
        <div className="blur-background"></div>
        <div
          className="dialog-box dialog-box-container"
          style={{ height: screenHeight - 20 }}
        >
          <div className="comment-container">
            {/* <div className="comment-card"> */}
            <div
              className="comment-post-media-container"
              style={{
                maxWidth:
                  mediaType === "image"
                    ? maxMediaWidth <= (60 / 100) * windowWidth
                      ? maxMediaWidth
                      : (70 / 100) * windowWidth
                    : "100%",
              }}
            >
              {mediaType?.toLowerCase() === "video" ? (
                <ShortVideoPlayer
                  video={activePost}
                  className="post-video"
                  viewableHeight={screenHeight - 20}
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="postImage"
                  ref={refMedia}
                  className="post-image"
                />
              )}
            </div>
            <DisplayComments postId={postId} post={activePost} />
            {/* </div> */}
          </div>
        </div>
        <CloseModalButton closeModal={closeModal} />
      </div>
    );
  }
};

export default CommentDialogBox;
