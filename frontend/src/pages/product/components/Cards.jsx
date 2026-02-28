import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Cards = () => {
  const [wish, setWish] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4">
      {/* Image */}
      <div className="h-40 bg-[#160059]/10 rounded-xl mb-3"></div>

      <h4 className="font-semibold text-gray-800">Product Name</h4>
      <p className="text-gray-500 text-sm">Short description here</p>

      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-[#160059]">₹499</span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setWish(!wish)}
            className={`text-lg transition ${
              wish ? "text-red-500" : "text-gray-300"
            }`}
          >
            <FaHeart />
          </button>

          <button className="bg-[#160059] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-[#2a1380] transition">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
