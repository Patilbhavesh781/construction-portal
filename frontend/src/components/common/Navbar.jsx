import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-12 py-5 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-2xl font-semibold tracking-wide text-gray-900">
          JSW<span className="font-light">Homes</span>
        </div>

        {/* MENU */}
        <ul className="hidden md:flex gap-12 text-sm tracking-widest uppercase font-medium">
          {["Home", "About", "Projects", "Sustainability", "Contact"].map(
            (item) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive
                        ? "text-red-600"
                        : "text-gray-700 hover:text-red-600"
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <button className="hidden md:block px-8 py-3 border border-gray-900 text-gray-900 uppercase tracking-widest text-xs hover:bg-gray-900 hover:text-white transition-all">
          Enquire
        </button>

      </nav>
    </header>
  );
};

export default Navbar;
