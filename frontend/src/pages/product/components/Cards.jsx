import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrIncrementInCart } from "../../../redux/cartSlice";
import { addOrIncrementInWishlist } from "../../../redux/wishlistSlice";
import { authApi } from "../../../apis/auth";

const Cards = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wish, setWish] = useState(false);

  // console.log(item);

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
      const res = await authApi.addToCart(payload);
      //  console.log(res)
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
      const res = await authApi.addToWishlist(payload);
      //  console.log(res)
      setWish(true);
    } catch (err) {
      console.error("Add to wishlist error:", err);
    }
  };

  return (
    <div
      onClick={() => {
        console.log("slug:", item.slug);
        navigate(`/product-detail/${item.slug}`);
      }}
      className="relative bg-white border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer"
    >
      {/* Discount Badge */}
      {item?.discount > 0 && (
        <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
          {item.discount}% OFF
        </span>
      )}

      {/* Product Image */}
      <div className="h-[320px] bg-gray-100 overflow-hidden">
        {item?.image?.url ? (
          <img
            src={item.image.url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3">
        <h4 className="text-sm font-semibold text-gray-900 truncate">
          {item?.name}
        </h4>

        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {item?.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          {item?.discount > 0 ? (
            <>
              <span className="text-xs line-through text-gray-400">
                ₹{item?.price}
              </span>

              <span className="text-sm font-semibold text-gray-900">
                ₹{discountedPrice}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-gray-900">
              ₹{item?.price}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={addToWishlist}
            className={`text-lg transition ${
              wish ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <FaHeart />
          </button>

          <button
            onClick={addToCart}
            className="px-3 py-1 text-xs bg-black text-white hover:bg-gray-800 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
