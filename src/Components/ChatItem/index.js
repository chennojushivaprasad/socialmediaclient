import React from "react";
import "./index.css";
import Cookies from "js-cookie";
import SharedPostMessage from "../SharedPostMessage";

const ChatItem = ({ chat }) => {
  const { senderId, text, post, image, video } = chat;

  const userId = Cookies.get("userId");

  const isUserChat = senderId === userId;

  const renderPost = () => {
    return (
      <div className="post-message">
        <SharedPostMessage post={post} />
      </div>
    );
  };

  const renderImage = () => {
    return (
      <div className="">
        <img src="" alt="" />
      </div>
    );
  };

  const renderVideo = () => {
    return <div className="">{}</div>;
  };

  const renderText = () => (
    <div className="message-text-container">
      <p className="message-text">{text}</p>
    </div>
  );

  return (
    <li
      className={`chat-item ${
        isUserChat ? "sender-message-item" : "recipient-message-item"
      }`}
    >
      {text && renderText()}
      {image && renderImage()}
      {video && renderVideo()}
      {post && renderPost()}
    </li>
  );
};

export default ChatItem;
