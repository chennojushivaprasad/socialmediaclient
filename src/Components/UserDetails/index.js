import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const UserDetails = ({ userImage, userName, userId }) => {
  const renderList = () => (
    <div className="user-details">
      <img
        src={userImage ? userImage : "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png"}
        alt=""
        className="user-image"
      />
      <p className="username">{userName}</p>
    </div>
  );

  if (userId) {
    return (
      <Link to={`/user/${userId}`} className="link">
        {renderList()}
      </Link>
    );
  }
  return renderList();
};

export default UserDetails;
