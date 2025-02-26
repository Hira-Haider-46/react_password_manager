import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`flex items-center justify-between w-full px-6 py-4 text-gray-300 transition-all duration-300 ${
        isOpen
          ? "bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
          : ""
      }`}
    >
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
        <ul
          className="absolute top-16 left-0 w-full flex flex-col space-y-4 py-5 items-center md:hidden
          bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-all duration-300"
        >
          <li className="text-base font-medium cursor-pointer hover:font-bold duration-300">Home</li>
          <li className="text-base font-medium cursor-pointer hover:font-bold duration-300">About</li>
          <li className="text-base font-medium cursor-pointer hover:font-bold duration-300">Contact</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;