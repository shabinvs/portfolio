import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md px-2">
      <ul className="flex justify-center bg-black rounded-xl shadow-lg px-4 sm:px-8 py-3 gap-3 sm:gap-6 text-white font-semibold text-sm sm:text-base">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.name} className="relative px-1">
              <Link
                to={item.path}
                className={`relative block px-3 py-1 rounded-lg transition-all duration-300 ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-black z-0" />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
