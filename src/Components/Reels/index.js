import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import fetchFromApi from "../../fetchFromApi";
import { ShortVideo } from "./ShortVideo";

const Reels = () => {
  const shortVideoContainerRef = useRef(null);
  const [videosData, setVideosData] = useState([]);
  // const [isLoading, setLoadingStatus] = useState(true);
  const [viewableHeight, setViewableHeight] = useState(window.innerHeight - 50);
  const [videoElementId, setActiveVideoElement] = useState(0);

  const getVideosData = async () => {
    const response = await fetchFromApi("/api/post/reels/", "GET");
    if (response.ok) {
      const data = await response.json();

      setVideosData(data.reels);
      // setLoadingStatus(false);
      // setApiStatus()
    } else {
      // setLoadingStatus(false);
    }
  };

  useEffect(() => {
    window.document.body.style["overflow"] = "hidden";
    window.document.body.style.overflow = "hidden";

    getVideosData();
    return () => {
      document.body.style["overflow"] = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const resize = (event) => {
      setViewableHeight(event.target.innerHeight - 50);
    };
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const nextVideo = () => {
    const elem = shortVideoContainerRef.current;
    if (elem.clientHeight + elem.scrollTop < elem.scrollHeight) {
      const positionElement =
        shortVideoContainerRef?.current?.scrollTop / viewableHeight;

      shortVideoContainerRef?.current?.scrollTo(
        0,
        shortVideoContainerRef?.current?.scrollTop + viewableHeight
      );
      setActiveVideoElement(positionElement + 1);
    } 
  };

  useEffect(() => {
    shortVideoContainerRef?.current.addEventListener("scroll", () => {
      const positionElement =
        shortVideoContainerRef?.current?.scrollTop / viewableHeight;
      if (Number.isInteger(positionElement)) {
        setActiveVideoElement(positionElement);
      }
    });
  });

  return (
    <div className="reels">
      <div className="reels-container">
        <ul
          ref={shortVideoContainerRef}
          className="short-videos"
          style={{ height: viewableHeight }}
        >
          {videosData?.map((video, index) => (
            <ShortVideo
              video={video}
              viewableHeight={viewableHeight}
              activeVideo={videoElementId === index}
              nextVideo={nextVideo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reels;
