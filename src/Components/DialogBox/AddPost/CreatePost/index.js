import React, { useContext, useState } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { AppContext } from "../../../../Context";
import PostSubmit from "../PostSubmit";
import CloseModalButton from "../../../Buttons/CloseModal";


const userId = Cookies.get("userId");

const CreatePost = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { setActiveModalId, uploadStatus } = useContext(AppContext);
  const [caption, setCaption] = useState("");

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = [...event.dataTransfer.files];

    if (droppedFiles.length > 0) {
      setSelectedFile(droppedFiles[0]);
    }
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdateContent = (text) => {
    if (text.length <= 2200) {
      setCaption(text);
    }
  };

  const closeModal = () => {
    setCaption("");
    setSelectedFile(null);
    setActiveModalId(null);
  };

  const reset = () => {
    setCaption("");
    setSelectedFile(null);
  };

  const renderUploadMedia = () => {
    return (
      <div
        className="upload-media-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="drag-and-drop-text">Drag photos and videos here</p>
        <button type="button" className="post-upload-image-button">
          <input
            type="file"
            className="hide-input-file"
            onChange={handleFileInputChange}
            placeholder="Drag photos and videos here"
          />
          Select file from Computer
        </button>
      </div>
    );
  };

  const renderCreatePostDialogBox = () => {
    const url = window.URL.createObjectURL(selectedFile);
    return (
      <PostSubmit
        url={url}
        selectedFile={selectedFile}
        handleUpdateContent={handleUpdateContent}
        caption={caption}
        reset={reset}
        closeModal={closeModal}
      />
    );
  };

  return (
    <div className="create-post-dialog-box">
      <div className="dialog-box">
        {selectedFile === null
          ? renderUploadMedia()
          : renderCreatePostDialogBox()}
      </div>

      <CloseModalButton closeModal={closeModal} />
    </div>
  );
};

export default CreatePost;
