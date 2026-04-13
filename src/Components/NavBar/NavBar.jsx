import React from "react";
import { NavLink } from "react-router";

const NavBar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#23BE0A] border border-[#23BE0A] font-semibold bg-transparent hover:bg-transparent rounded-lg"
              : "text-gray-500 hover:text-[#23BE0A]"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive
              ? "text-[#23BE0A] border border-[#23BE0A] font-semibold bg-transparent hover:bg-transparent"
              : "text-gray-500 hover:text-[#23BE0A]"
          }
        >
          Listed Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pages-to-read"
          className={({ isActive }) =>
            isActive
              ? "text-[#23BE0A] font-semibold bg-transparent hover:bg-transparent"
              : "text-gray-500 hover:text-[#23BE0A]"
          }
        >
          Pages to Read
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 py-4 shadow-sm container mx-auto">
      <div className="navbar-start">
        <h2 className="font-extrabold text-2xl text-base-content">Book Vibe</h2>
      </div>

      <div className="navbar-center hidden lg:flex">
        {/* daisyUI requires the ul wrapper for menu styling */}
        <ul className="menu menu-horizontal px-1 gap-3 text-base">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        <a className="btn bg-[#23BE0A] text-white hover:bg-[#1fa109] border-none px-6">
          Sign In
        </a>
        <a className="btn bg-[#59C6D2] text-white hover:bg-[#4ab0bc] border-none px-6 hidden sm:flex">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default NavBar;
