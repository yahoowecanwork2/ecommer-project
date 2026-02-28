import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Cards = ({ item }) => {
  console.log(item);

  const [wish, setWish] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4">
      {item?.discount > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
          {item.discount}% OFF
        </span>
      )}

      <div className="h-40 bg-[#160059]/10 rounded-xl mb-3 overflow-hidden">
        {item?.image?.url ? (
          <img
            src={item.image.url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <h4 className="font-semibold text-gray-800">{item?.name}</h4>
      <p className="text-gray-500 text-sm">{item?.description}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-[#160059]">₹{item?.price}</span>

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
