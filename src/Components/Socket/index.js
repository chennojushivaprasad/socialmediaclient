import Cookies from "js-cookie";
import { createContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

const userId = Cookies.get("userId");
const SocketContext = createContext();

const Socket = (props) => {
  const [socket, setSocketIo] = useState(null);

  const [myStream, setMyStream] = useState(null);
  const [incomingCallStatus, setIncomingCallStatus] = useState(false);
  const [incomingCallDetails, setIncomingCallDetails] = useState(null);

  const localPeerConnection = useRef();

  const socketIoUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    localPeerConnection.current = new RTCPeerConnection();
  }, []);

  useEffect(() => {
    if (userId) {
      const socketIO = io(socketIoUrl, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      });

      setSocketIo(socketIO);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("SOCKET.IO: Connected to the server!");
      });

      socket.emit("addUser", userId);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket?.on("incomingCall", (data) => {
        setIncomingCallDetails(data);
        setIncomingCallStatus(true);
      });
    }
  });

  useEffect(() => {
    if (incomingCallStatus) {
      acceptCall(incomingCallDetails);
    }
  }, [incomingCallStatus]);

  const accessVideoAndAudio = async () => {
    const openMediaDevices = async (constraints) => {
      return await navigator.mediaDevices.getUserMedia(constraints);
    };

    try {
      const stream = await openMediaDevices({ video: true, audio: true });

      setMyStream(stream);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const acceptCall = async (data) => {
    // const remotePeerConnection = new RTCPeerConnection(configuration);

    const { offer, senderSocketID, senderId, recipientId } = data;
    // const configuration = {
    //   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    // };

    localPeerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await localPeerConnection.current.createAnswer();
    await localPeerConnection.current.setLocalDescription(answer);

    socket.emit("acceptedCall", {
      answer,
      senderId,
      recipientId,
      senderSocketID,
    });
  };

  const makeVideoCall = async (senderId, recipientId) => {
    const offer = await localPeerConnection.current.createOffer();
    await localPeerConnection.current.setLocalDescription(offer);
    socket.emit("outgoingCall", { senderId, recipientId, offer });

    socket.on("answeredCall", async (data) => {
      const { answer } = data;
      const remoteDescription = new RTCSessionDescription(answer);
      await localPeerConnection.current.setRemoteDescription(remoteDescription);
    });

    localPeerConnection.current.addEventListener(
      "connectionstatechange",
      (event) => {
        if (localPeerConnection.connectionState === "connected") {
          // Peers connected!
          console.log("peers connected");
        }
      }
    );
  };

  const values = {
    incomingCallStatus,
    localPeerConnection: localPeerConnection.current,
    incomingCallDetails,
    accessVideoAndAudio,
    makeVideoCall,
    socket,
    acceptCall,
    myStream,
  };
  return (
    <SocketContext.Provider value={values}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default Socket;

export { SocketContext };
