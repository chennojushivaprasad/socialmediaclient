import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../../Context";
import { Link } from "react-router-dom";

const SidebarMenu = (props) => {
  const { activeModalId, onClickMenuButton } = useContext(AppContext);
  const { category, isActiveMenu } = props;
  const { activeIcon, icon, name, menuId, path } = category;

  const renderList = () => {
    return (
      <li className="sidebar-list-container">
        <button
          className="sidebar-menu-button"
          type="button"
          onClick={() => onClickMenuButton(menuId)}
        >
          <div className="sidebar-menu-container">
            {activeModalId === menuId
              ? activeIcon
              : isActiveMenu && activeModalId === null
              ? activeIcon
              : icon}

            <p className="side-menu-name">{name}</p>
          </div>
        </button>
      </li>
    );
  };

  if (path !== null) {
    return (
      <Link to={`${path}`} className="sidebar-list link">
        {renderList()}
      </Link>
    );
  }
  return renderList();
};

export default SidebarMenu;
