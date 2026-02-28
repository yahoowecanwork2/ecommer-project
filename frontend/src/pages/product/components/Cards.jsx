import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Cards = () => {
  const [wish, setWish] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 relative">
      <button
        onClick={() => setWish(!wish)}
        className={`absolute top-3 right-3 text-lg ${
          wish ? "text-red-500" : "text-gray-300"
        }`}
      >
        <FaHeart />
      </button>

      <div className="h-40 bg-blue-50 rounded-xl mb-3"></div>

      <h4 className="font-semibold text-gray-800">Product Name</h4>
      <p className="text-gray-500 text-sm">Short description here</p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-blue-600">₹499</span>
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
          Add
        </button>
      </div>
    </div>
  );
};

export default Cards;
