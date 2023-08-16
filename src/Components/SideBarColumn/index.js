import React, { useContext } from "react";
import "./index.css";
// import AccountUser from "./AccountUser";
import UserDetails from "../UserDetails";
import { AppContext } from "../../Context";
import Followers from "./Followers";

const SideBarColumn = () => {
  const { accountUser } = useContext(AppContext);

  if (accountUser) {
    const { userImage, userName, _id } = accountUser;
   
    return (
      <div className="sidebar-column">
        <div className="sidebar-column-container">
          <UserDetails userImage={userImage} userName={userName} userId={_id} />
          <Followers />
        </div>
      </div>
    );
  }
};

export default SideBarColumn;
