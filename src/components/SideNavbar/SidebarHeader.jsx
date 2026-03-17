import React from "react";

const SidebarHeader = ({ toggleSidebar }) => {
  return (
    <div id="nav-header">
      {/* Hamburger */}
      <div className="hamburger" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Logo */}
      <div id="nav-title">
        <span>NAVBAR</span>
      </div>
    </div>
  );
};

export default SidebarHeader;