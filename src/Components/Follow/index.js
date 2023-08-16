import React, { useContext, useEffect, useState } from "react";
import fetchFromApi from "../../fetchFromApi";
import "./index.css";
import { AppContext } from "../../Context";

export const Follow = ({ followId }) => {
  const { accountUser, setAccountUser } = useContext(AppContext);

  const updateFollow = async () => {
    const followerExists = accountUser?.following.some((id) => id === followId);
    if (followerExists) {
      const following = accountUser.following.filter((id) => id !== followId);
   
      setAccountUser((prev) => {
        return { ...prev, following };
      });
    } else {
      setAccountUser((prev) => {
        return { ...prev, following: [...prev.following, followId] };
      });
    }

    const response = await fetchFromApi("/api/user/addFollow", "PUT", {
      followId,
      userId: accountUser._id,
    });
  };

  const handleFollow = () => {
    updateFollow();
  };


  if (followId !== accountUser._id && followId && accountUser._id) {
    const isFollowing = accountUser?.following.some((id) => followId === id);
    return (
      <button type="button" className="follow-button" onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    );
  }
  return null;
};
