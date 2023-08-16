import React, { useContext } from "react";
import "./index.css";
import { bottomNavigationMenus } from "../../constansts";
import Menu from "./Menu";
import { AppContext } from "../../Context";

const BottomNavigationBar = () => {
  const { activeMenuId } = useContext(AppContext);
  return (
    <div className="bottom-navigation-bar">
      <div className="container">
        <ul className="navigation-menu-lists">
          {bottomNavigationMenus.map((category) => {
            return (
              <Menu
                key={category.menuId}
                category={category}
                isActiveMenu={activeMenuId === category.menuId}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
