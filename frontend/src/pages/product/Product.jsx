import React from "react";
import {
  FaMobileAlt,
  FaTshirt,
  FaLaptop,
  FaHeadphones,
  FaShoePrints,
} from "react-icons/fa";
import Cards from "./components/Cards";
import HeaderHome from "../common/Headerhome";

const categories = [
  { name: "Mobiles", icon: <FaMobileAlt /> },
  { name: "Clothes", icon: <FaTshirt /> },
  { name: "Laptops", icon: <FaLaptop /> },
  { name: "Headphones", icon: <FaHeadphones /> },
  { name: "Shoes", icon: <FaShoePrints /> },
  { name: "More", icon: <FaTshirt /> },
];

const Product = () => {
  return (
    <div className="w-full bg-white min-h-screen">
      <HeaderHome />

      <div className="px-10 py-20 mt-8">
        <div className="flex gap-3 w-1/2 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 transition">
            Search
          </button>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            Categories
          </h3>

          <div className="flex gap-6 overflow-x-auto pb-2">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl shadow-md group-hover:bg-blue-600 group-hover:text-white transition">
                  {cat.icon}
                </div>
                <p className="text-sm mt-2 text-gray-700">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Products</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
