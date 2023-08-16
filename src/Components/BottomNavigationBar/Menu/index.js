import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../../Context";
import { Link } from "react-router-dom";

const Menu = ({ isActiveMenu, category }) => {
  const { onClickMenuButton } = useContext(AppContext);
  const { activeIcon, icon, menuId, path } = category;
  const renderList = () => {
    return (
      <li className="menu-list">
        <button
          className="menu-button"
          type="button"
          onClick={() => onClickMenuButton(menuId)}
        >
          {isActiveMenu ? activeIcon : icon}
        </button>
      </li>
    );
  };

  if (path !== null) {
    return (
      <Link to={`${path}`} className="bottom-navigation-list link">
        {renderList()}
      </Link>
    );
  }
  return renderList();
};

export default Menu;
