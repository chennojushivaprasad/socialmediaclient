import React, { useContext, useEffect } from "react";
import "./index.css";
import UserDetails from "../UserDetails";
import SearchBar from "./SearchBar";
import { AppContext } from "../../Context";
import { Follow } from "../Follow";
import { AiOutlineClose } from "react-icons/ai";

const Search = () => {
  const { searchResults, setActiveMenuId, setSearchResults } =
    useContext(AppContext);

  useEffect(() => {
    window.document.body.overflow = "hidden";
  }, []);

  const closeModal = () => {
    setSearchResults(null);
  };
  return (
    <div className="search">
      <div className="search-header">
        <h1 className="search-heading">Search</h1>
        <button
          type="button"
          className="small-screen-close-modal-button"
          onClick={closeModal}
        >
          <AiOutlineClose className="close-modal-icon" />
        </button>
      </div>
      <div className="searchbar">
        <SearchBar />
      </div>
      <div className="search-results-display">
        {/* 
          <div className="recent-search-heading">
            <p>Recent</p>
            <button
              type="reset"
              className="reset-search-button"
              onClick={reset}
            >
              Clear All
            </button>
          </div>
         */}
        <div className="search-results-container">
          <ul className="search-results">
            {searchResults?.map((obj) => (
              <li className="search-result-item">
                <button
                  type="button"
                  className="search-button"
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      setSearchResults([]);
                      setActiveMenuId("PROFILE");
                    }
                  }}
                >
                  <UserDetails
                    userImage={obj.userImage}
                    userName={obj.userName}
                    userId={obj._id}
                  />
                </button>
                <Follow followId={obj._id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
