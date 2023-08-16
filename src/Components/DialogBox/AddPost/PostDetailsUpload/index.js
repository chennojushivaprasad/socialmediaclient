import React, { useContext, useState } from "react";
import "./index.css";
// import 'emoji-mart/css/emoji-mart.css'; // Import the emoji-mart styles
// import { Picker } from "emoji-mart";

import { AppContext } from "../../../../Context";

const PostUploadDetails = ({ content, handleUpdateContent }) => {
  const { accountUser } = useContext(AppContext);
  const { userName, userImage } = accountUser;
  // const [emojiPicker, setEmojiPicker] = useState(false);

  const setText = (event) => {
    const text = event.target.value;
    handleUpdateContent(text);
  };

  // const toggleEmojiPicker = () => {
  //   setEmojiPicker((prev) => !prev);
  // };

  return (
    <div className="upload-details-container">
      <div className="user-profile">
        <img src={`${userImage ? userImage : ""}`} alt="" />
        <p className="user-name">{userName}</p>
      </div>
      <div className="post-caption-container">
        <textarea
          className="post-caption-editable"
          placeholder="write a caption"
          onChange={setText}
          value={content}
        />
      </div>
      <div className="emojis-content-length-container">
        {/* <button type="button" className="emoji-button" onClick={toggleEmojiPicker}>emoji</button> */}
        {/* {emojiPicker && <Picker onSelect={handleEmojiSelect} />} */}
        <p className="characters-count">{content.length}/2,200</p>
      </div>
      {/* <div className="add-location-container"></div>
                <div className="advanced-seetings-container"></div>
      */}
    </div>
  );
};

export default PostUploadDetails;
