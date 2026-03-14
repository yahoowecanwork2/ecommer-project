import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../apis/auth";
import {
  addOrIncrementInCart,
  clearCart,
  decrementOrRemoveInCart,
  removeItemInCart,
  setCartItems,
} from "../../redux/cartSlice";
import HeaderHome from "../common/Header";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { IoBagHandleOutline, IoTrashOutline, IoArrowForwardOutline } from "react-icons/io5";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const fetchCart = async () => {
    try {
      const res = await authApi.myCart();
      if (res?.cart) {
        dispatch(setCartItems(res.cart));
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      fetchCart();
    }
  }, []);

  const increaseQty = async (item) => {
    try {
      const currentItem = cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );
      if (!currentItem) return;
      const newQty = currentItem.quantity + 1;
      const payload = { productId: item.productId, quantity: newQty };
      await authApi.updateQuantity(payload);
      dispatch(addOrIncrementInCart({ productId: item.productId, quantity: newQty }));
    } catch (error) {
      console.error("Increase qty error:", error);
    }
  };

  const decreaseQty = async (item) => {
    try {
      const currentItem = cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );
      if (!currentItem || currentItem.quantity <= 1) return;
      const newQty = currentItem.quantity - 1;
      const payload = { productId: item.productId, quantity: newQty };
      await authApi.updateQuantity(payload);
      dispatch(decrementOrRemoveInCart({ productId: item.productId }));
    } catch (error) {
      console.error("Decrease qty error:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await authApi.removeItemFromCart(productId);
      dispatch(removeItemInCart(productId));
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await authApi.clearCart();
      dispatch(clearCart());
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  // --- EMPTY CART STATE ---
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFBF9] font-google">
        <HeaderHome />
        <div className="flex flex-col items-center justify-center h-screen text-center px-6">
          <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-8">
            <IoBagHandleOutline className="text-5xl text-[#D16B92]" />
          </div>
          <h2 className="text-4xl font-serif italic text-[#2D1B2D] mb-4">Your Bag is Empty</h2>
          <p className="text-gray-400 mb-10 max-w-xs font-light tracking-wide uppercase text-[10px]">
            The pieces you love are waiting to be found. Explore our summer archive.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="px-12 py-4 bg-[#2D1B2D] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-[#D16B92] transition-all shadow-xl"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  // --- CALCULATE TOTAL (Internal helper for design) ---
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#FCFBF9] font-google pb-24">
      <HeaderHome />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-20 pt-32 lg:pt-44">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-gray-100 pb-10">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D16B92]"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D16B92]">Shopping Bag</p>
             </div>
             <h1 className="text-5xl lg:text-7xl font-serif italic text-[#2D1B2D]">Your Selection.</h1>
          </div>
          <button
            onClick={handleClearCart}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2"
          >
            <IoTrashOutline size={16} /> Empty Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: CART ITEMS LIST */}
          <div className="lg:col-span-8 space-y-10">
            {cartItems?.map((item) => (
              <div
                key={item?.productId}
                className="group flex flex-col sm:flex-row gap-8 items-center bg-white p-6 rounded-[2rem] border border-gray-50 hover:shadow-2xl transition-all duration-700"
              >
                {/* Image Box */}
                <div className="w-full sm:w-44 h-56 rounded-[1.5rem] overflow-hidden bg-[#FAF9F6]">
                  <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Details Box */}
                <div className="flex-1 space-y-4 w-full text-center sm:text-left">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#D16B92] mb-1 opacity-70">Boutique Edit</p>
                    <h3 className="text-xl font-serif italic text-[#2D1B2D]">{item?.name}</h3>
                  </div>

                  <p className="text-lg font-light text-[#2D1B2D]">₹{item?.price}.00</p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                    {/* Compact Quantity Controls */}
                    <div className="flex items-center gap-6 bg-[#FCFBF9] border border-gray-100 rounded-full px-6 py-2">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="text-gray-400 hover:text-[#D16B92] transition-colors"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="text-[12px] font-black text-[#2D1B2D]">{item?.quantity}</span>
                      <button
                        onClick={() => increaseQty(item)}
                        className="text-gray-400 hover:text-[#D16B92] transition-colors"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>

                    {/* Minimal Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item?.productId)}
                      className="text-[9px] font-black uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors flex items-center gap-2"
                    >
                      <FaTrash size={10} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY & CHECKOUT */}
          <div className="lg:col-span-4 h-fit sticky top-40">
            <div className="bg-[#2D1B2D] text-white p-10 rounded-[3rem] shadow-2xl space-y-8 relative overflow-hidden">
               {/* Aesthetic Background Detail */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D16B92] rounded-full opacity-20 blur-3xl"></div>
               
               <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D16B92] border-b border-white/10 pb-6">Bag Summary</h4>
               
               <div className="space-y-4">
                  <div className="flex justify-between text-sm font-light text-gray-300 italic">
                    <span>Subtotal</span>
                    <span>₹{subtotal}.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-light text-gray-300 italic">
                    <span>Estimated Shipping</span>
                    <span className="text-green-400 uppercase text-[10px] font-black tracking-widest">Complimentary</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Due</p>
                    <p className="text-3xl font-serif italic">₹{subtotal}.00</p>
                  </div>
               </div>

               <button
                onClick={() => navigate(`/order`)}
                className="group w-full py-5 bg-[#D16B92] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-[#2D1B2D] transition-all duration-500 shadow-xl active:scale-95"
               >
                Proceed to Checkout <IoArrowForwardOutline className="group-hover:translate-x-2 transition-transform" size={16} />
               </button>
               
               <p className="text-[8px] text-center text-gray-500 uppercase tracking-widest leading-loose">
                  Secure Checkout by Navi Clothing Heritage
               </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Cart;