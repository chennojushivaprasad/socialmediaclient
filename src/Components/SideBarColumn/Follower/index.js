import React, { useEffect, useState } from "react";
import UserDetails from "../../UserDetails";
import fetchFromApi from "../../../fetchFromApi";
import { Follow } from "../../Follow";
import "./index.css";

const Follower = ({ userId }) => {
  const [followerDetails, setFollowerUserDetails] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetchFromApi(`/api/user/${userId}`, "GET");
      if (response.ok) {
        const data = await response.json();
        setFollowerUserDetails(data?.user);
      }
    };

    getUserData();
  }, [userId]);

  return (
    <li className="suggested-follower-list">
      <div className="suggested-follower-container">
        <UserDetails
          userImage={followerDetails?.userImage}
          userName={followerDetails?.userName}
        />

        <Follow followId={followerDetails?._id} />
      </div>
    </li>
  );
};

export default Follower;
