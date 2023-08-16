import React from "react";
import "./index.css";

export const PostPreviewImage = ({ imageUrl }) => {
  return (
    <div className="preview-image-container">
      <img src={imageUrl} alt="preview-img" className="post-preview-image" />
    </div>
  );
};
