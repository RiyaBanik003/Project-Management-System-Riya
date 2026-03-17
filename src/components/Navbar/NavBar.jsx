import React from "react";
import { IMAGES } from "../../utils/constants";
import { Link } from "react-router-dom";

const Navbar = ({ onSignUp }) => {
  return (
    <nav className="w-[70%] mx-auto px-[20px] flex items-center justify-between font-[Poppins]">

      {/* Logo */}
      <div className="flex items-center">
        <img
          src={IMAGES.logo}
          alt="Logo"
          className="h-[50px] w-auto object-contain"
        />
      </div>

      {/* Links */}
      <ul className="flex gap-[36px] list-none">
        <li className="text-[#ebab0c] text-[14px] cursor-pointer">Home</li>
        <li className="text-[#002d74] text-[14px] cursor-pointer hover:text-[#1691fd]">
          Blog
        </li>
        <li className="text-[#002d74] text-[14px] cursor-pointer hover:text-[#1691fd]">
          Contact
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className="px-[20px] py-[8px] rounded-[20px] bg-[#1691fd] text-white font-bold text-[14px] cursor-pointer hover:bg-blue-600 transition"
          onClick={onSignUp}
        >
          Log In ➤
        </button>

        <button
          className="px-[20px] py-[8px] rounded-[20px] bg-[#1691fd] text-white font-bold text-[14px] cursor-pointer hover:bg-blue-600 transition"
          onClick={onSignUp}
        >
          Sign Up ➤
        </button>
      </div>

    </nav>
  );
};

export default Navbar;