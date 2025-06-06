
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import mdm from "../../assets/mdm.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Fetch Device Info" },
    { path: "/enroll", label: "Enroll Device" },
    { path: "/manage-devices", label: "Manage Device" },
    { path: "/policy", label: "Manage Policy" },
    { path: "/manage-application", label: "Manage Application" },
    { path: "/manage-content", label: "Content Management" },
  ];

  const linkClass =
    "border px-4 py-2 rounded-md font-medium transition";
  const activeClass = "bg-white text-black";
  const inactiveClass = "border-white text-white hover:bg-white hover:text-black";

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-[#03A9FC] p-4 shadow-md z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={mdm} alt="Logo" className="h-7 w-7" />
          <span className="text-white font-bold text-lg">mobiHEAL MDM</span>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-4 z-50">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="flex flex-col space-y-2 md:hidden mt-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `border px-1 py-1 text-sm rounded-md font-normal ${
                  isActive ? "bg-white text-black" : "text-white hover:bg-white hover:text-black"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
