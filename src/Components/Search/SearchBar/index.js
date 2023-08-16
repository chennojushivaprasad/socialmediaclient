import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import fetchFromApi from "../../../fetchFromApi";
import { AppContext } from "../../../Context";

const useDebounceValue = (value, delayTime) => {
  const [debouncedValue, setDebouncedvalue] = useState(value);
  useEffect(() => {
    let id = setTimeout(() => {
      setDebouncedvalue(value);
    }, delayTime);

    return () => clearTimeout(id);
  }, [value, delayTime]);

  return debouncedValue;
};

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { setSearchResults } = useContext(AppContext);

  // const reset = () => {};

  const searchValue = useDebounceValue(searchInput, 300);

  useEffect(() => {
    const getSearchData = async (value) => {
      const respone = await fetchFromApi(`/api/user?search=${value}`, "GET");
      if (respone.ok) {
        const data = await respone.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    };

    if (searchValue !== "") {
      getSearchData(searchValue);
    } else {
      setSearchResults([]);
    }
  }, [searchValue, setSearchResults]);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="search-input-container">
      <input
        type="Search"
        className="search-input"
        value={searchInput}
        onChange={handleSearchInput}
        placeholder="search"
      />
    </div>
  );
};

export default SearchBar;
