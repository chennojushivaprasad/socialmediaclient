import React from "react";
import "./index.css";
import { AiOutlineClose } from "react-icons/ai";

const CloseModalButton = ({ closeModal }) => {
  return (
    <button type="button" className="close-modal-button" onClick={closeModal}>
      <AiOutlineClose className="close-modal-icon" />
    </button>
  );
};

export default CloseModalButton;
