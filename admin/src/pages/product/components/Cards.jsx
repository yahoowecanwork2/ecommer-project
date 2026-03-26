import React from "react";
import { FaRupeeSign, FaArrowRight } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cards = ({ item }) => {
  const navigate = useNavigate();

  const isAvailable = item?.stock > 0;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* IMAGE CONTAINER */}
      <div
        onClick={() => navigate(`/product-detail/${item._id}`)}
        className="relative h-48 overflow-hidden cursor-pointer bg-gray-50"
      >
        <img
          src={item?.image}
          alt={item?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* STATUS BADGE */}
        <div className="absolute top-2 left-2">
          <span
            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border rounded-sm shadow-sm ${
              isAvailable
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-red-600 border-red-100"
            }`}
          >
            {isAvailable ? "In Stock" : "Sold Out"}
          </span>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-auto">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight truncate mb-1">
            {item?.name}
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
            ID: <span className="text-gray-300">#{item?._id?.slice(-6)}</span>
          </p>
        </div>

        {/* DETAILS GRID */}
        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
              Price
            </span>
            <span className="flex items-center text-sm font-black text-gray-900">
              <FaRupeeSign className="text-[10px]" />
              {item?.price}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
              Stock
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-gray-700">
              <MdInventory size={12} className="text-gray-300" />
              {item?.stock}
            </span>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => navigate(`/product-detail/${item._id}`)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-900 py-2 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-gray-100 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
        >
          Manage <FaArrowRight size={10} />
        </button>
      </div>
    </div>
  );
};

export default Cards;
