import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../../Context";
import Follower from "../Follower";

const Followers = () => {
  const { accountUser } = useContext(AppContext);

  const renderFollowersList = () => {
    const { followers } = accountUser;
    return (
      <ul className="suggested-peoples-lists">
        {followers?.map((followerId) => (
          <Follower userId={followerId} />
        ))}
      </ul>
    );
  };

  const renderNoFollowers = () => {
    return (
      <div className="no-followers-container">
        <img
          className="no-followers-image"
          src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png"
          alt=""
        />
        <p className="no-followers">No Followers</p>
      </div>
    );
  };

  if (accountUser?.following) {
    const { followers } = accountUser;
    return (
      <div className="suggestions-container">
        <div className="suggestion-header">
          <p className="suggestion-heading">Follows you</p>
          {/* <button tyoe="button" className="see-all-btn">
            See All
          </button> */}
        </div>
        {followers.length > 0 ? renderFollowersList() : renderNoFollowers()}
      </div>
    );
  }
};

export default Followers;
