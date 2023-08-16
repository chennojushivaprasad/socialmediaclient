import React from "react";
import TimeAgo from "javascript-time-ago";
import { FiMoreHorizontal } from "react-icons/fi";
import en from "javascript-time-ago/locale/en";
import "./index.css";
import UserDetails from "../../UserDetails";
import { Follow } from "../../Follow";
TimeAgo.addDefaultLocale(en);

const PostCardUserProfie = ({ userName, userImage,userId, date }) => {
  
  const timeAgo = new TimeAgo("en-US");

  const publishedAgo = timeAgo.format(new Date(date), "mini");
  // const userMoreModel = () => {};

  return (
    <div className="user-profile-card">
      <div className="user-card-left">
        <UserDetails userImage={userImage} userName={userName} userId={userId}/>
        {date && <p className="published-ago">{publishedAgo} ago</p>}
        <Follow followId={userId}/>
      </div>
      <div className="user-card-right">
        <button
          type="button"
          className="user-more-button"
          // onClick={userMoreModel}
          // onClick={deletePost}
        >
          <FiMoreHorizontal />
        </button>
      </div>
    </div>
  );
};

export default PostCardUserProfie;
