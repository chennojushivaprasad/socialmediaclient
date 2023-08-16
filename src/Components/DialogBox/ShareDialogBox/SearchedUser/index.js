import React from "react";
import UserDetails from "../../../UserDetails";
import { BiMessageSquareAdd, BiMessageSquareCheck } from "react-icons/bi";
import "./index.css";
// import { AppContext } from "../../../../Context";

const SearchedUser = ({ user, setSelectedUser, isSelectedUser }) => {
  const handleSelectUser = () => {
    setSelectedUser(user);
  };

  const { userImage, userName, _id } = user;

  return (
    <li className="searched-user">
      <UserDetails userId={_id} userImage={userImage} userName={userName} />
      <button
        type="button"
        className="select-user-button"
        onClick={handleSelectUser}
      >
        {isSelectedUser ? (
          <BiMessageSquareCheck className="check-message-icon" />
        ) : (
          <BiMessageSquareAdd className="add-message-icon" />
        )}
      </button>
    </li>
  );
};

export default SearchedUser;
