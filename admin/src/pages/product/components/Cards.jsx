import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cards = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div
        onClick={() => navigate(`/product-detail/${item._id}`)}
        className="relative h-44 overflow-hidden"
      >
        <img
          src={item.image?.url}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full 
          ${item.available === "yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {item.available === "yes" ? "Available" : "Out of Stock"}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-800 text-lg truncate">
          {item.name}
        </h3>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <FaRupeeSign className="text-blue-600" />
            {item.price}
          </span>

          <span className="flex items-center gap-1">
            <MdInventory className="text-blue-600" />
            Stock: {item.stock}
          </span>
        </div>

        <button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90">
          View Product
        </button>
      </div>
    </div>
  );
};

export default Cards;
