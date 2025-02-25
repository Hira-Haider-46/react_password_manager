import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between w-[100%] px-10 py-5 bg-teal-500">
        <h1 className="text-2xl font-600 cursor-pointer hover:font-bold duration-300 ease-out">Password Manager</h1>
        <ul className="flex gap-15">
            <li className="text-lg font-500 cursor-pointer hover:font-bold duration-300 ease-out">Home</li>
            <li className="text-lg font-500 cursor-pointer hover:font-bold duration-300 ease-out">About</li>
            <li className="text-lg font-500 cursor-pointer hover:font-bold duration-300 ease-out">Contact</li>
        </ul>
    </nav>
  );
};

export default Navbar;