import React, { useEffect } from "react";
import "./index.css";
import MessageSidebar from "../Message/MessageSidebar";
import ChatBox from "../ChatBox";
// import ChatBox from '../ChatBox'

export const Chat = () => {
  useEffect(()=>{
    window.document.body.style.overflow = 'hidden';
  })
  return (
    <div className="chat">
      {/* <div className="chat-container"> */}
        <MessageSidebar />
        <ChatBox />
      {/* </div> */}
    </div>
  );
};
