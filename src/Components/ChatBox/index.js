import React, {
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { FiVideo } from "react-icons/fi";
import Cookies from "js-cookie";
import fetchFromApi from "../../fetchFromApi";
import UserDetails from "../UserDetails";
import ChatItem from "../ChatItem";
import VideoCall from "../VideoCall";
import { AppContext } from "../../Context";
import { SocketContext } from "../Socket";
import "./index.css";

const ChatBox = () => {
  const { isVideoCallActive, setVideoCallActiveStatus } =
    useContext(AppContext);
  const { socket, accessVideoAndAudio, makeVideoCall } =
    useContext(SocketContext);

  const { recipientId } = useParams();
  const contentInput = useRef();
  const userId = Cookies.get("userId");
  const senderId = userId;

  const [chatUserDetails, setChatUserDetails] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [chatConversation, setChatConversation] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const localPeerConnection = useRef();

  const chatListsBox = useRef();

  useLayoutEffect(() => {
    const getUserData = async () => {
      const response = await fetchFromApi(`/api/user/${recipientId}`, "GET");
      if (response.ok) {
        const data = await response.json();
        setChatUserDetails(data?.user);
      }
    };
    getUserData();
  }, [recipientId]);

  useEffect(() => {
    if (chatConversation?.length > 0) {
      moveToBottom();
    }
  }, [chatConversation]);

  const moveToBottom = () => {
    chatListsBox?.current?.scrollIntoView(true);
  };

  useEffect(() => {
    const configureSocketListeners = () => {
      if (socket) {
        socket.on("getUser", (data) => {});

        socket.on("getMessage", (data) => {
          setChatConversation((prev) => [...prev, data]);
        });

        localPeerConnection.current?.addEventListener(
          "connectionstatechange",
          () => {
            if (localPeerConnection.current.connectionState === "connected") {
              setIsConnected(true);
            }
          }
        );
      }
    };

    if (socket) {
      configureSocketListeners();
    }
  }, [socket]);

  useEffect(() => {
    if (conversationId) {
      const fetchChats = () => {
        const fetch = async () => {
          const response = await fetchFromApi(
            `/api/message/${conversationId}`,
            "GET"
          );

          if (response.ok) {
            const data = await response.json();
            setChatConversation(data);
          }
        };
        fetch();
      };

      fetchChats();
    }
  }, [conversationId]);

  const addMessage = async () => {
    const text = contentInput.current.value;
    const response = await fetchFromApi(
      `/api/message/addMessage/${senderId}/${conversationId}`,
      "POST",
      { text }
    );

    if (response.ok) {
      socket.emit("sendMessage", {
        senderId,
        text,
        recipientId,
        conversationId,
        date: new Date(),
      });
      contentInput.current.value = "";
    }
  };

  const videoCall = async () => {
    setVideoCallActiveStatus(true);
    await accessVideoAndAudio();
    makeVideoCall(senderId, recipientId);
  };

  useEffect(() => {
    const addConversation = async () => {
      const object = { senderId, recipientId };
      const response = await fetchFromApi(
        `/api/conversation/${senderId}/${recipientId}`,
        "POST",
        object
      );

      if (response.ok) {
        const data = await response.json();
        setConversationId(data?._id);
      }
    };

    const getOrCreateConversation = async () => {
      const response = await fetchFromApi(
        `/api/conversation/${senderId}/${recipientId}`,
        "GET"
      );

      if (response.status === 204) {
        await addConversation();
      } else if (response.status === 200) {
        const conversation = await response.json();
        setConversationId(conversation?._id);
      }
    };

    getOrCreateConversation();
  }, [recipientId,senderId]);

  useEffect(() => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    localPeerConnection.current = new RTCPeerConnection(configuration);
  }, []);

  return (
    <div className="chat-box">
      {isVideoCallActive && (
        <VideoCall
          setVideoCallActiveStatus={setVideoCallActiveStatus}
          isConnected={isConnected}
        />
      )}

      <div className="chat-box-header">
        <UserDetails
          userImage={chatUserDetails?.userImage}
          userName={chatUserDetails?.userName}
        />
        <div className="chat-box-header-right">
          <button
            type="button"
            className="video-chat-button"
            onClick={videoCall}
          >
            <FiVideo className="video-chat-icon" />
          </button>
        </div>
      </div>

      <div className="chat-lists" ref={chatListsBox}>
        {chatConversation?.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>

      <div className="chat-box-bottom">
        <div className="chat-box-input-container">
          <textarea
            className="message-input"
            id="userInput"
            placeholder="type a message"
            ref={contentInput}
          />
          <button className="send-msg-btn" id="sendMsgBtn" onClick={addMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
