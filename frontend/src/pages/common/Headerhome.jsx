import React from "react";
import {
  IoMenu,
  IoCartOutline,
  IoSearchOutline,
  IoPerson,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <div className="fixed w-full top-0 z-50 bg-[#160059] text-white">
      <div className="w-full h-20 flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <IoMenu className="text-2xl cursor-pointer lg:hidden" />

          <Link to="/">
            <h1 className="text-xl font-bold">PharmaClosing</h1>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="hidden lg:flex items-center">
          <div className="relative">
            <IoSearchOutline className="absolute left-2 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search medicines"
              className="pl-8 pr-3 h-9 rounded-l-sm text-black"
            />
          </div>
          <button className="bg-[#3A00E6] h-9 px-4 rounded-r-sm">Search</button>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/dashboard">Home</Link>
          <Link to="/about">About</Link>

          <Link to="/whishlist">
            <IoCartOutline className="text-2xl" />
          </Link>
          <Link to="/cart">
            <IoCartOutline className="text-2xl" />
          </Link>

          <Link to="/auth" className="flex items-center gap-1">
            <IoPerson />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
