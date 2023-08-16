import React from "react";
import "./index.css";

const TabList = ({ tab, isActive, setActiveTab }) => {
  const { tabName, tabId } = tab;
  const handleTabClick = () => {
    setActiveTab(tabId);
  };

  return (
    <li className={`tab-list ${isActive && "active-tab"}`}>
      <button type="button" onClick={handleTabClick} className="tab-button">
        {tabName}
      </button>
    </li>
  );
};

export default TabList;
