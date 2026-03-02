import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrIncrementInWishlist,
  removeItemInWishlist,
} from "../../redux/wishlistSlice";
import { authApi } from "../../apis/auth";
import { addOrIncrementInCart } from "../../redux/cartSlice";

const Whishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // ✅ fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await authApi.myWishlist();
        const items = res?.data?.wishlist || [];

        items.forEach((item) => {
          dispatch(addOrIncrementInWishlist(item));
        });
      } catch (err) {
        console.error("Fetch wishlist error:", err);
      }
    };

    if (!wishlistItems.length) {
      fetchWishlist();
    }
  }, [dispatch, wishlistItems.length]);

  // ✅ ADD TO CART (FIXED)
  const addToCart = async (item) => {
    const payload = {
      productId: item.productId,
      slug: item.slug,
      price: item.price,
      name: item.name,
      description: item.description,
      imageUrl: item.imageUrl || "",
      quantity: 1,
    };

    try {
      dispatch(addOrIncrementInCart(payload));
      await authApi.addToCart(payload);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // ✅ MOVE TO CART (FIXED PROPERLY)
  const handleAddToCart = async (item) => {
    try {
      // 1️⃣ remove from wishlist (redux)
      dispatch(removeItemInWishlist(item.productId));

      // 2️⃣ remove from backend wishlist
      await authApi.removeItemFromWishlist(item.productId);

      // 3️⃣ add to cart
      await addToCart(item);
    } catch (err) {
      console.error("Move to cart error:", err);
    }
  };

  // ✅ REMOVE FROM WISHLIST (FIXED)
  const handleRemove = async (productId) => {
    try {
      dispatch(removeItemInWishlist(productId));
      await authApi.removeItemFromWishlist(productId);
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

  // ✅ empty state
  if (!wishlistItems.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        No items in wishlist
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlistItems.map((item) => (
        <div
          key={item.productId}
          className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition"
        >
          {/* image */}
          <div className="h-48 bg-[#160059]/10 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
            {item?.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>

          {/* title */}
          <h4 className="font-semibold text-gray-800 truncate">
            {item.name}
          </h4>

          {/* price */}
          <p className="font-bold text-[#160059] mt-1">₹{item.price}</p>

          {/* buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleAddToCart(item)}
              className="flex-1 bg-[#160059] text-white py-1.5 rounded-lg text-sm hover:bg-[#2a1380] transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleRemove(item.productId)}
              className="flex-1 border border-red-500 text-red-500 py-1.5 rounded-lg text-sm hover:bg-red-50 transition"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Whishlist;