import React from "react";

import PostCardButtons from "../../Buttons/PostCardButtons";

import "./index.css";
import ShortVideoPlayer from "../../ShortVideoPlayer";

export const ShortVideo = ({
  video,
  viewableHeight,
  activeVideo,
  nextVideo,
}) => {
  return (
    <li className="video-item">
      <ShortVideoPlayer
        video={video}
        activeVideo={activeVideo}
        viewableHeight={viewableHeight}
        nextVideo={nextVideo}
      />
      <div className="video-statistics">
        <PostCardButtons post={video} />
        {/* Render your statistics or PostCardButtons component here */}
      </div>
    </li>
  );
};
