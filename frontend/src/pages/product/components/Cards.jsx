import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cards = ({ item }) => {
  const navigate = useNavigate();
  const [wish, setWish] = useState(false);
  console.log(item);

  const discountedPrice =
    item?.discount > 0
      ? Math.round(item.price - (item.price * item.discount) / 100)
      : item?.price;

  return (
    <div
      // onClick={() => navigate(`/product-detail/${item.slug}`)}
      onClick={() => {
        console.log("slug:", item.slug);
        navigate(`/product-detail/${item.slug}`);
      }}
      className="relative  bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-4"
    >
      {item?.discount > 0 && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
          {item.discount}% OFF
        </span>
      )}

      <div className="h-70 bg-[#160059]/10 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
        {item?.image?.url ? (
          <img
            src={item.image.url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      <h4 className="font-semibold text-gray-800 truncate">{item?.name}</h4>
      <p className="text-gray-500 text-sm line-clamp-2">{item?.description}</p>

      <div className="flex justify-between items-center mt-4">
        <div>
          {item?.discount > 0 ? (
            <>
              <span className="text-sm line-through text-gray-400">
                ₹{item?.price}
              </span>
              <span className="block font-bold text-[#160059]">
                ₹{discountedPrice}
              </span>
            </>
          ) : (
            <span className="font-bold text-[#160059]">₹{item?.price}</span>
          )}
        </div>

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
