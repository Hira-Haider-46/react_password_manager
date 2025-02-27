import React from "react";
import logo from "../assets/github_logo.png";

const Navbar: React.FC = () => {

  return (
    <nav className="flex items-center justify-between w-full p-6 text-gray-300">
      <h1 className="sm:text-xl md:text-2xl font-semibold cursor-pointer hover:font-bold duration-300">
        Password Manager
      </h1>

      <a href="https://github.com/Hira-Haider-46?tab=repositories" target="_blank" className="cursor-pointer">
        <img src={logo} className="h-12 w-12"/>
      </a>

    </nav>
  );
};

export default Navbar;