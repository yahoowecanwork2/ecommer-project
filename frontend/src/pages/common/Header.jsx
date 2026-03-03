import React from "react";
import {
  IoMenu,
  IoCartOutline,
  IoSearchOutline,
  IoPerson,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";

const Header = () => {
  return (
<div className="fixed top-0 w-[100vw] z-50 bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

    {/* Left */}
    <div className="flex items-center gap-6">
      <IoMenu className="text-xl cursor-pointer lg:hidden" />

      <Link to="/" className="text-3xl font-medium font-rouge">
        Navi Clothing
      </Link>
    </div>

    {/* Center Navigation */}
    <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
      <Link to="/" className="hover:text-black transition">
        Home
      </Link>
      <Link to="/about" className="hover:text-black transition">
        About
      </Link>
      <Link to="/product" className="hover:text-black transition">
        Shop
      </Link>
    </div>

    {/* Right */}
    <div className="flex items-center gap-6 text-gray-700">

      <Link to="/wishlist" className="hover:text-black transition">
        <IoHeartOutline className="text-xl" />
      </Link>

      <Link to="/cart" className="hover:text-black transition relative">
        <IoCartOutline className="text-xl" />
      </Link>

      <Link
        to="/login"
        className="text-sm font-medium hover:text-black transition"
      >
        Login
      </Link>
    </div>

  </div>
</div>
  );
};

export default Header;
