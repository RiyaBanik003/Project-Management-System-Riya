import React from "react";
import "./Navbar.css";
import { IMAGES } from "../../utils/constants";
import { Link } from "react-router-dom";

const Navbar = ({ onSignUp }) => {
  return (
    <nav className="navbar">
       
      <div className="logo-container">
        <img src={IMAGES.logo} alt="Logo" className="logo-img" />
      </div>
 
      <ul className="links">
        <li className="active">Home</li>
        <li >Blog</li>
        <li>Contact</li>
      </ul>
    {/* <Link to={/das}></Link> */}
      <button className="nav-btn" onClick={onSignUp}>Log In ➤</button>
    </nav>
  );
};

export default Navbar;
