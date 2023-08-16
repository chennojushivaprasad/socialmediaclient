import React from "react";
import "./index.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progressbar">
      <div className="progress-line" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
