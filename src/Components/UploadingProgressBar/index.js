import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../Context";

const UploadingProgressBar = () => {
  const { uploadPercent, uploadStatus } = useContext(AppContext);

  const uploadedSuccessFully = () => {
    return (
      <div className="uploaded-successfully-toast">
        <p className="upload-status-text">Uploaded SussessFully</p>
      </div>
    );
  };

  const uploadedFailed = () => {
    return (
      <div className="upload-failed-toast">
        <p className="upload-status-text">Uploaded SussessFully</p>
      </div>
    );
  };

  switch (uploadStatus?.type) {
    case "Success":
      return uploadedSuccessFully();

    case "Failed":
      return uploadedFailed();
  }

  return (
    <div class="progress uploading-progress-bar">
      <div class="progress-bar" style={{ width: `${uploadPercent}%` }}></div>
    </div>
  );
};

export default UploadingProgressBar;
