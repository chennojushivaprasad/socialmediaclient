import React, { useContext, useRef, useState } from "react";
import "./index.css";
import SearchBar from "../../Search/SearchBar";
import { AppContext } from "../../../Context";
import SearchedUser from "./SearchedUser";
import CloseModalButton from "../../Buttons/CloseModal";
import fetchFromApi from "../../../fetchFromApi";
import { AiOutlineClose } from "react-icons/ai";

const ShareDialogBox = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const [isToastActive, setToastStatus] = useState(false);

  const {
    searchResults,
    accountUser,
    activeSharePostDetails,
    setSearchResults,
    setSharePostDetails,
    setShareModalActiveStatus,
  } = useContext(AppContext);

  let id = useRef();
  const removeToast = () => {
    id.current = setTimeout(() => setToastStatus(false), 3000);
  };

  const getConversationAndPostMessage = async () => {
    const senderId = accountUser?._id;
    const recipientId = selectedUser?._id;

    const addConversation = async () => {
      const object = { senderId, recipientId };
      const response = await fetchFromApi(
        `/api/conversation/${senderId}/${recipientId}`,
        "POST",
        object
      );

      if (response.ok) {
        const data = await response.json();
        sendPostMessage(senderId, data?._id);
      }
    };

    if (selectedUser) {
      const response = await fetchFromApi(
        `/api/conversation/${senderId}/${recipientId}`,
        "GET"
      );

      if (response.status === 204) {
        await addConversation();
      } else if (response.status === 200) {
        const conversation = await response.json();
        sendPostMessage(senderId, conversation?._id);
      }
    }
  };

  const sendPostMessage = async (senderId, conversationId) => {
    const post = activeSharePostDetails;
    const response = await fetchFromApi(
      `/api/message/addMessage/${senderId}/${conversationId}`,
      "POST",
      { post }
    );

    if (response.ok) {
      const data = await response.json();
      setToastStatus(true);
      setMessageSent(true);
      removeToast();
    } else {
      setToastStatus(true);
      setMessageSent(false);
      removeToast();
    }
  };

  const sendMessage = () => {
    getConversationAndPostMessage();
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShareModalActiveStatus(false);
    setSharePostDetails(null);
    setSearchResults([]);
    setMessageSent(false);
    clearTimeout(id.current);
  };

  return (
    <div className="share-dialog-box">
      <div className="share-dialogbox-container">
        <div className="share-header">
          <p className="share-heading">Share</p>
          <button
            type="button"
            className="small-screen-close-modal-button"
            onClick={closeModal}
          >
            <AiOutlineClose className="close-modal-icon" />
          </button>
        </div>
        <SearchBar />
        <div className="search-people-results">
          <ul className="results">
            {searchResults?.map((user) => (
              <SearchedUser
                user={user}
                setSelectedUser={setSelectedUser}
                isSelectedUser={user._id === selectedUser?._id}
              />
            ))}
          </ul>
        </div>
        <button type="button" className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
      {isToastActive && (
        <div
          className={`message-toast ${
            messageSent ? "success-toast" : "fail-toast"
          }`}
        >
          <p
            className={`message-toast-text ${
              messageSent ? "success-text" : "fail-text"
            }`}
          >
            {messageSent ? "Sent" : "Failed"}
          </p>
        </div>
      )}
      {window.innerWidth > 768 && <CloseModalButton closeModal={closeModal} />}
    </div>
  );
};

export default ShareDialogBox;
