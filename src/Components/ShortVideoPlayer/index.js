import React, { useState, useRef, useEffect, useContext } from "react";

import "./index.css";
import { AppContext } from "../../Context";
import ProgressBar from "../Reels/ProgressBar";

import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";
import UserDetails from "../UserDetails";

const ShortVideoPlayer = (props) => {
  const { isMuted, setMuteState, volume, setVolume,activeMenuId } = useContext(AppContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const { video, activeVideo, viewableHeight, nextVideo } = props;

  const { media } = video;

  const height = viewableHeight ? viewableHeight : "100%";

  const width =
    height * (9 / 16) <= window.innerWidth ? height * (9 / 16) : "100%";

  const { mediaUrl } = media;
  const { userId, userImage, userName } = video;
  const handleTimeUpdate = () => {
    const duration = videoRef.current?.duration;
    const currentTime = videoRef.current?.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  const handleMuteUnmute = () => {
    videoRef.current.muted = !isMuted;
    setMuteState(!isMuted);
    setVolume(isMuted ? 1 : 0);
  };

  useEffect(() => {
    if (activeMenuId && activeMenuId === "REELS") {
      if (activeVideo) {
        const playPromise = videoRef.current.play();
        if (playPromise !== null) {
          playPromise.catch(() => {
            videoRef.current.play();
          });
        }
        // videoRef.current.play();
      } else {
        stopVideo();
      }
    }
  }, [activeVideo,activeMenuId]);

  const stopVideo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
    setProgress(0);
  };

  useEffect(() => {
    const play = () => {
      setIsPlaying(true);
    };
    const pause = () => {
      setIsPlaying(false);
    };
    videoRef.current.addEventListener("play", play);
    videoRef.current.addEventListener("pause", pause);
    // return () => {
    //   videoRef.current.removeEventListener("play", play);
    //   videoRef.current.removeEventListener("pause", pause);
    // };
  }, []);

  useEffect(() => {
    const end = () => {
      if (activeVideo && nextVideo) {
        nextVideo();
      }
      stopVideo();
    };
    videoRef.current.addEventListener("ended", end);
    // return () => {
    //   videoRef.current.removeEventListener("ended", end);
    // };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <div className="short-video-container" style={{ height: height, width: width }}>
      <video
        webkit-playsinline="true"
        playsinline="true"
        className="short-video-player"
        ref={videoRef}
        src={mediaUrl}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        volume={volume}
        muted={isMuted}
      ></video>
      <ProgressBar progress={progress} />
      <button
        type="button"
        className="mute-unmute-button"
        onClick={handleMuteUnmute}
      >
        {isMuted ? (
          <BsFillVolumeMuteFill className="unmute-icon" />
        ) : (
          <BsFillVolumeUpFill className="mute-icon" />
        )}
      </button>
      <div className="short-video-button-container">
        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? (
            <BsFillPauseFill className="short-video-button-icon" />
          ) : (
            <BsFillPlayFill className="short-video-button-icon" />
          )}
        </button>
        <UserDetails
          userImage={userImage}
          userName={userName}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default ShortVideoPlayer;
