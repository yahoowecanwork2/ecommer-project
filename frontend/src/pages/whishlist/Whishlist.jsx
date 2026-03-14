import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrIncrementInWishlist,
  removeItemInWishlist,
} from "../../redux/wishlistSlice";
import { addOrIncrementInCart } from "../../redux/cartSlice";
import HeaderHome from "../common/Header";
import { IoCloseOutline, IoHeartOutline, IoBagHandleOutline } from "react-icons/io5";
import { authApi } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

const Whishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const addToCart = async (item) => {
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
      await authApi.addToCart(payload);
      return true;
    } catch (err) {
      console.error("Add to cart error:", err);
      return false;
    }
  };

  const handleAddToCart = async (item) => {
    try {
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

  // --- EMPTY WISHLIST STATE ---
  if (!wishlistItems.length) {
    return (
      <div className="min-h-screen bg-[#FCFBF9] font-google">
        <HeaderHome />
        <div className="flex flex-col items-center justify-center h-screen text-center px-6">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-8">
            <IoHeartOutline className="text-4xl text-[#D16B92]" />
          </div>
          <h2 className="text-3xl font-serif italic text-[#2D1B2D] mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-400 mb-10 max-w-xs font-light tracking-wide uppercase text-[9px]">
            Save your favorite pieces here to revisit them later.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="px-10 py-4 bg-[#2D1B2D] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-[#D16B92] transition-all"
          >
            Go To Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-google pb-20">
      <HeaderHome />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-20 pt-32 lg:pt-44">
        {/* Header */}
        <div className="space-y-4 mb-16 border-b border-gray-100 pb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="w-8 h-[1px] bg-[#D16B92]"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D16B92]">Saved Archive</p>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif italic text-[#2D1B2D]">My Wishlist.</h1>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          {wishlistItems?.map((item) => (
            <div
              key={item?.productId}
              className="group relative bg-white flex flex-col overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4.2] bg-[#FAF9F6] overflow-hidden">
                {item?.imageUrl ? (
                  <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 font-serif italic text-xs">Navi Edit</div>
                )}

                {/* Remove Button - Top Right */}
                <button
                  onClick={() => handleRemove(item?.productId)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full text-[#2D1B2D] hover:bg-[#D16B92] hover:text-white transition-all duration-300"
                >
                  <IoCloseOutline size={18} />
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-4 bg-[#2D1B2D]/95 text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#D16B92]"
                  >
                    <IoBagHandleOutline size={16} /> Move to Bag
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="py-4 px-1 space-y-1">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#D16B92] opacity-70">Handpicked</p>
                <h4 className="text-[14px] font-serif italic text-[#2D1B2D] leading-tight truncate group-hover:text-[#D16B92] transition-colors">
                  {item?.name}
                </h4>
                <p className="text-[14px] font-bold text-[#2D1B2D] pt-1">₹{item?.price}.00</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Whishlist;