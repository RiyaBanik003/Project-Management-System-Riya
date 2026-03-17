import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, text, path, closeMenu }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? "nav-button active" : "nav-button"
      }
      onClick={closeMenu}
    >
      <i className={icon}></i>
      <span>{text}</span>
    </NavLink>
  );
};

export default SidebarItem;