import React, { useContext } from "react";
import { AppContext } from "../../../../Context";

const UploadStatus = () => {
    const {postSubmitStatus} = useContext(AppContext)
  return (
    <div className="upload-status-container">
      {postSubmitStatus ? <p>Succesffuly</p> : <p>failed</p>}
    </div>
  );
};


export default UploadStatus