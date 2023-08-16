import React, { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../Socket";
import "./index.css";
import { AppContext } from "../../Context";

const VideoCall = () => {
  const { myStream,localPeerConnection } = useContext(SocketContext);
  const { isVideoCallActive,setVideoCallActiveStatus } = useContext(AppContext);
  const viewableHeight = window.innerHeight;

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();


  useEffect(() => {
    if (myStream) {
      if(localPeerConnection){

      
      myStream?.getTracks().forEach((track) => {
       
        localPeerConnection.addTrack(track, myStream);
      });}
   
      localVideoRef.current.srcObject = myStream;
    }
  }, [myStream,localPeerConnection]);

  const stopCamera = () => {
    myStream.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        track.stop();
      }
    });
  };

  const handleEndCall = () => {
    stopCamera();
    setVideoCallActiveStatus(false);
  };

  // useEffect(() => {
  //   console.log("isConnected:", isConnected);
  // }, [isConnected]);
  

  if(!isVideoCallActive) return
  return (
    <div className="video-call">
      <div className="video-call-container">
        <div className="video-chat-user">
          <video
            className="video-local"
            ref={localVideoRef}
            autoPlay
            style={{
              height: viewableHeight - 50,
              width: (viewableHeight * 9) / 16,
            }}
          ></video>
          <video
            className="video-remote"
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              height: viewableHeight - 50,
              width: (viewableHeight * 9) / 16,
            }}
          ></video>
        </div>
        <div className="video-call-buttons">
          <button onClick={handleEndCall} className="end-button">
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
