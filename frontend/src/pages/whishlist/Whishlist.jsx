import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrIncrementInWishlist,
  removeItemInWishlist,
} from "../../redux/wishlistSlice";
import { addOrIncrementInCart } from "../../redux/cartSlice";
import HeaderHome from "../common/Headerhome";
import { FaTimes } from "react-icons/fa";
import { authApi } from "../../apis/auth";

const Whishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  

  const addToCart = async (item) => {
  // console.log(item);
  console.log("Add to cart function call");

  const discountedPrice =
    item?.discount > 0
      ? Math.round(item.price - (item.price * item.discount) / 100)
      : item?.price;

  const payload = {
    productId: item.productId || item._id,
    slug: item.slug,
    price: discountedPrice,
    name: item.name,
    description: item.description,
    imageUrl: item?.image?.url || item?.imageUrl || "",
  };

  try {
    dispatch(addOrIncrementInCart(payload));
    const res = await authApi.addToCart(payload);
    // console.log(res);
    return true; 
  } catch (err) {
    console.error("Add to cart error:", err);
    return false;
  }
};


const handleAddToCart = async (item) => {
  try {
    // console.log(item);
    const success = await addToCart(item);
    if (!success) return;
    const id = item.productId || item._id;
    dispatch(removeItemInWishlist(id));
    await authApi.removeItemFromWishlist(id);
  } catch (err) {
    console.error("Move to cart error:", err);
  }
};

const handleRemove = async (productId) => {
    try {
      dispatch(removeItemInWishlist(productId));
      await authApi.removeItemFromWishlist(productId);
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };


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



  if (!wishlistItems.length) {
    return (
      <div>
        <HeaderHome />
        <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
          No items in wishlist
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeaderHome />
      <h2 className="text-2xl font-bold text-[#160059] mb-6 mt-20 text-center">
        My Wishlist
      </h2>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems?.map((item) => (
          <div
            key={item?.productId}
            className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition p-3"
          >
            <button
              onClick={() => handleRemove(item?.productId)}
              className="absolute -top-3 -right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#160059] text-[#160059] hover:bg-[#160059] hover:text-white transition shadow"
            >
              <FaTimes size={16} />
            </button>

            <div className="h-70 bg-[#160059]/5 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
              {item?.imageUrl ? (
                <img
                  src={item?.imageUrl}
                  alt={item?.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            <h4 className="font-medium text-gray-800 truncate">{item?.name}</h4>

            <p className="font-semibold text-[#160059] mt-1">₹{item?.price}</p>

            <div className="flex mt-4">
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-[#160059] text-white py-2 rounded-lg text-sm hover:bg-[#2a1380] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Whishlist;
