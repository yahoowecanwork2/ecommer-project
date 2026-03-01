import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cards = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#160059]/10 group">
      <div
        onClick={() => navigate(`/product-detail/${item._id}`)}
        className="relative h-44 overflow-hidden cursor-pointer"
      >
        <img
          src={item?.image?.url}
          alt={item?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md
          ${
            item.available === "yes"
              ? "bg-green-100/80 text-green-700"
              : "bg-red-100/80 text-red-700"
          }`}
        >
          {item?.available === "yes" ? "Available" : "Out of Stock"}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-[#160059] text-lg truncate">
          {item?.name}
        </h3>

        <div className="flex justify-between items-center text-sm text-[#160059]/80">
          <span className="flex items-center gap-1 font-medium">
            <FaRupeeSign className="text-[#160059]" />
            {item?.price}
          </span>

          <span className="flex items-center gap-1 font-medium">
            <MdInventory className="text-[#160059]" />
            Stock: {item?.stock}
          </span>
        </div>

        <button
          onClick={() => navigate(`/product-detail/${item._id}`)}
          className="mt-3 w-full bg-[#160059] text-white py-2 rounded-xl text-sm font-semibold tracking-wide 
          hover:bg-[#0f003d] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default Cards;
