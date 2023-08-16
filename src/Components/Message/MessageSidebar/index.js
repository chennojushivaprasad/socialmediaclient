import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import fetchFromApi from "../../../fetchFromApi";
import UserDetails from "../../UserDetails";
import "./index.css";
import { AppContext } from "../../../Context";
import SearchBar from "../../Search/SearchBar";

const MessageSidebar = () => {
  const {searchResults} = useContext(AppContext)

  return (
    <div className="message-sidebar">
      <div className="message-header">
        <h1 className="search-heading">Message</h1>
      </div>
       <SearchBar/>
      <div className="search-results-display">
        <ul className="search-results">
          {searchResults.map(({ userImage, userName, _id }) => (
            <li key={_id} className="result-item">
              <Link to={`/message/${_id}`} className="link">
                <UserDetails userImage={userImage} userName={userName} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageSidebar;
