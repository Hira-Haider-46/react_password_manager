import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 text-white">
      <h1 className="sm:text-xl md:text-2xl font-semibold cursor-pointer hover:font-bold duration-300">
        Password Manager
      </h1>
      <ul className="hidden md:flex space-x-8">
        <li className="text-lg font-medium cursor-pointer hover:font-bold duration-300">Home</li>
        <li className="text-lg font-medium cursor-pointer hover:font-bold duration-300">About</li>
        <li className="text-lg font-medium cursor-pointer hover:font-bold duration-300">Contact</li>
      </ul>
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <ul className="absolute top-16 left-0 w-full text-white flex flex-col space-y-4 py-5 items-center md:hidden">
          <li className="text-base font-medium cursor-pointer hover:font-bold duration-300">Home</li>
          <li className="text-base font-medium cursor-pointer hover:font-bold duration-300">About</li>
          <li className="text-base font-medium cursor-pointer hover:font-bold duration-300">Contact</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;