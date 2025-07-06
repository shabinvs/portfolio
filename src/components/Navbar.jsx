import React, { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const navItems = ["Home", "Skills", "Projects", "Contact"];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md px-2">
      <ul className="flex flex-wrap justify-center bg-black rounded-xl shadow-lg px-4 sm:px-8 py-3 gap- sm:gap-6 text-white font-semibold text-sm sm:text-base">
        {navItems.map((item) => {
          const isActive = active === item;
          return (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`relative cursor-pointer px-3 py-1 rounded-lg transition-all duration-300 ${
                isActive ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-black" />
              )}
              <span className="relative z-10">{item}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
