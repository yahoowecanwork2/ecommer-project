import React from "react";
import {
  IoMenu,
  IoCartOutline,
  IoSearchOutline,
  IoPerson,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";

const HeaderHome = () => {
  return (
    <div className="fixed w-full top-0 z-50 bg-[#160059] text-white">
      <div className="w-full h-20 flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <IoMenu className="text-2xl cursor-pointer lg:hidden" />

          <Link to="/">
            <h1 className="text-xl font-bold">Ecommerce</h1>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/dashboard">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/product">Product</Link>

          <Link to="/wishlist">
            <IoHeartOutline className="text-2xl" />
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
