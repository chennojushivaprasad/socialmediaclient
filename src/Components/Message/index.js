import React from "react";
import "./index.css";
import MessageSidebar from "./MessageSidebar";
import { BiMessageSquareDetail } from "react-icons/bi";
// import { Chat } from "../Chat";

const Message = () => {
  return (
    <div className="message">
      <div className="message-container">
        <MessageSidebar />
        <div className="chat-open-container">
          <div className="icon-container">
            <BiMessageSquareDetail fontSize="10px" className="icon" />
          </div>
          <p className="your-message">Your Messages</p>
          <p className="desc">Send messages to people</p>
          <button type="button" className="send-message-button">
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
