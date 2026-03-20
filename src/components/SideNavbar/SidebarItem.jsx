import React, { useState } from "react";
import { Icon } from "../ui/DashboardPrimitives";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.children) {
      setOpen(!open); // toggle dropdown
    } else {
      navigate(item.path);
    }
  };

  return (
    <div>
      {/* Main Item */}
      <div
        className="nav-button"
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          padding: "10px"
        }}
      >
        <Icon type={item.icon} />
        <span>{item.label}</span>
      </div>

      {/* Submenu */}
      {item.children && open && (
        <div style={{ paddingLeft: "30px" }}>
          {item.children.map((sub, index) => (
            <div
              key={index}
              onClick={() => navigate(sub.path)}
              style={{
                padding: "8px 0",
                cursor: "pointer",
                fontSize: "14px",
                color: "#555"
              }}
            >
              • {sub.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;