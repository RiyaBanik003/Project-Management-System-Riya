// import React, { useState, useEffect } from "react";
// import "./sidebar.css";
// import SidebarItem from "./SidebarItem";
// import { IMAGES } from "../../utils/constants";

// const menuItems = [
//   { icon: "fas fa-home", text: "Dashboard", path: "/dashboard" },
//   { icon: "fas fa-file", text: "Project", path: "/project" },
//   { icon: "fas fa-user", text: "User", path: "/user" },
//   { icon: "fas fa-thumbtack", text: "Deployment Details", path: "/deployment" },
//   { icon: "fas fa-chart-line", text: "Service", path: "/service" }
// ];

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(true);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth <= 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const toggleMenu = () => {
//     if (isMobile) {
//       setMobileMenu(!mobileMenu);
//     } else {
//       setCollapsed(!collapsed);
//     }
//   };

//   return (
//     <>
//       {/* MOBILE NAVBAR */}
//       {isMobile && (
//         <div className="mobile-topbar">
//           <div className="mobile-logo">
//             <img src={IMAGES.logo} alt="Logo" className="logo-img" />
//           </div>

//           <div className="mobile-hamburger" onClick={toggleMenu}>
//             ☰
//           </div>
//         </div>
//       )}

//       {/* DESKTOP SIDEBAR */}
//       {!isMobile && (
//         <div id="nav-bar" className={collapsed ? "collapsed" : ""}>

//           <div id="nav-header">
//             <div className="hamburger" onClick={toggleMenu}>☰</div>

//             {/* <div id="nav-title">
//               <img src={IMAGES.logo} alt="Logo" className="logo-img" />
//             </div> */}
//           </div>

//           <hr />

//           <div id="nav-content">
//             {menuItems.map((item, index) => (
//               <SidebarItem
//                 key={index}
//                 icon={item.icon}
//                 text={item.text}
//                 path={item.path}
//               />
//             ))}
//           </div>

//         </div>
//       )}

//       {/* MOBILE MENU */}
//       {isMobile && mobileMenu && (
//         <div className="mobile-menu">
//           {menuItems.map((item, index) => (
//             <SidebarItem
//               key={index}
//               icon={item.icon}
//               text={item.text}
//               path={item.path}
//               closeMenu={() => setMobileMenu(false)}
//             />
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;