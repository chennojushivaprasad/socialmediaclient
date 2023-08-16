import React, { useContext } from "react";
import SidebarMenu from "./SidebarMenu";
import { categoryMenus } from "../../constansts";
import "./index.css";
import { CgMoreO } from "react-icons/cg";
import { AppContext } from "../../Context";
import Logo from "../Logo";
import SignOut from "../Buttons/SignoutButton";

const SideBar = () => {
  const { activeModalId, activeMenuId } = useContext(AppContext);
  const isActive = ["search"].includes(activeModalId?.toLowerCase());
  return (
    <div className={`sidebar ${isActive && "active-event"}`}>
      <div className="sidebar-container">
        <div className="sidebar-logo-container">
          <Logo />
        </div>
        <ul className="sidebar-menus">
          {categoryMenus.map((category) => (
            <SidebarMenu
              key={category.menuId}
              category={category}
              isActiveMenu={activeMenuId === category.menuId}
            />
          ))}
        </ul>
        <div className="more-button sidebar-menu-button">
          {/* <CgMoreO className="more-icon" /> */}
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
