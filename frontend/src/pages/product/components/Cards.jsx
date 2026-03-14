import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrIncrementInCart } from "../../../redux/cartSlice";
import { addOrIncrementInWishlist } from "../../../redux/wishlistSlice";
import { authApi } from "../../../apis/auth";

const Cards = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wish, setWish] = useState(false);

  const discountedPrice =
    item?.discount > 0
      ? Math.round(item.price - (item.price * item.discount) / 100)
      : item?.price;

  const addToCart = async (e) => {
    e.stopPropagation();
    const payload = {
      productId: item._id,
      slug: item.slug,
      price: discountedPrice,
      name: item.name,
      description: item.description,
      imageUrl: item?.image?.url || "",
    };
    try {
      dispatch(addOrIncrementInCart(payload));
      await authApi.addToCart(payload);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const addToWishlist = async (e) => {
    e.stopPropagation();
    const payload = {
      productId: item._id,
      slug: item.slug,
      price: discountedPrice,
      name: item.name,
      description: item.description,
      imageUrl: item?.image?.url || "",
    };
    try {
      dispatch(addOrIncrementInWishlist(payload));
      await authApi.addToWishlist(payload);
      setWish(true);
    } catch (err) {
      console.error("Add to wishlist error:", err);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product-detail/${item.slug}`)}
      className="group relative bg-white cursor-pointer border-[0.5px] border-gray-100 flex flex-col overflow-hidden"
    >
      {/* --- IMAGE SECTION (Sharp Edges, No Curves) --- */}
      <div className="relative aspect-[3/4.2] bg-[#F2F2F2] overflow-hidden">
        
        {/* 'Ready to Ship' Badge */}
        <div className="absolute top-0 left-0 z-10 bg-[#7A4431] text-white text-[8px] font-bold px-2 py-1 uppercase tracking-tighter">
          Ready to Ship
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={addToWishlist}
          className="absolute top-2 right-2 z-10 text-[#2D1B2D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {wish ? <FaHeart size={16} className="text-[#7A4431]" /> : <FaRegHeart size={16} />}
        </button>

        {/* Main Product Image */}
        {item?.image?.url ? (
          <img
            src={item.image.url}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-[10px] uppercase font-bold">
            No Image
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-[#7A4431]/95 text-white text-[10px] font-bold uppercase tracking-widest py-3.5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          Quick View
        </div>
      </div>

      {/* --- CONTENT DETAILS (Clean & Compact) --- */}
      <div className="p-3 bg-white flex flex-col gap-1">
        <h4 className="text-[12px] font-medium text-[#2D1B2D] tracking-tight truncate uppercase opacity-80 group-hover:text-[#7A4431] transition-colors">
          {item?.name}
        </h4>

        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-[#2D1B2D]">
            Rs. {discountedPrice}.00
          </span>
          {item?.discount > 0 && (
            <span className="text-[11px] line-through text-gray-400 font-light italic">
              Rs. {item?.price}.00
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;