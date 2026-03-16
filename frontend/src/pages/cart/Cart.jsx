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
import { IoBagHandleOutline, IoTrashOutline, IoArrowForwardOutline, IoRemoveOutline, IoAddOutline, IoChevronForwardOutline } from "react-icons/io5";

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
<div className="min-h-screen bg-white font-google pb-20">
      <HeaderHome />

      <main className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-44">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D16B92]">Shopping Bag ({cartItems.length})</p>
             <h1 className="text-6xl md:text-8xl font-serif italic text-[#3D2B3D] tracking-tighter leading-none">
               Selected <br /> <span className="not-italic font-light">Pieces.</span>
             </h1>
          </div>
          <button
            onClick={handleClearCart}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-400 transition-colors pb-2 border-b border-gray-100"
          >
            Empty Archive
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* LEFT: CART ITEMS LIST */}
          <div className="lg:col-span-7 space-y-16">
            {cartItems?.map((item) => (
              <div
                key={item?.productId}
                className="group flex flex-col sm:flex-row gap-10 items-start border-b border-gray-50 pb-16 last:border-0"
              >
                {/* Image Box */}
                <div className="w-full sm:w-56 h-72 rounded-[40px_5px_40px_5px] overflow-hidden bg-[#FAF9F6] shadow-2xl shadow-pink-50/50">
                  <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

                {/* Details Box */}
                <div className="flex-1 flex flex-col justify-between h-72 py-2 w-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-3xl font-serif italic text-[#3D2B3D] leading-tight">{item?.name}</h3>
                      <button
                        onClick={() => handleRemoveItem(item?.productId)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <IoTrashOutline size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Premium Cotton • Handcrafted</p>
                  </div>

                  <div className="flex items-center justify-between pt-10 border-t border-gray-50">
                    {/* Minimalist Quantity Controls */}
                    <div className="flex items-center gap-8 border border-gray-100 rounded-full px-6 py-3">
                      <button onClick={() => decreaseQty(item)} className="text-[#3D2B3D] hover:text-[#D16B92] transition-colors"><IoRemoveOutline /></button>
                      <span className="text-xs font-bold w-4 text-center">{item?.quantity}</span>
                      <button onClick={() => increaseQty(item)} className="text-[#3D2B3D] hover:text-[#D16B92] transition-colors"><IoAddOutline /></button>
                    </div>

                    <p className="text-2xl font-serif italic text-[#3D2B3D]">₹{item?.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY & CHECKOUT */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-12 bg-[#FAF9F6] p-12 rounded-[60px_10px_60px_10px]">
               <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D16B92]">Total Valuation</p>
                 <div className="h-[1px] w-12 bg-[#D16B92]"></div>
               </div>
               
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-[#3D2B3D] font-bold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400">
                    <span>Shipping</span>
                    <span className="text-[#D16B92] italic">Complimentary</span>
                  </div>
                  
                  <div className="pt-8 border-t border-pink-100 flex justify-between items-end">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black uppercase tracking-widest text-gray-300">Final Amount</p>
                       <h2 className="text-5xl font-serif italic text-[#3D2B3D]">₹{subtotal.toLocaleString()}</h2>
                    </div>
                  </div>
               </div>

               <button
                onClick={() => navigate(`/order`)}
                className="group w-full py-6 bg-[#3D2B3D] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden relative shadow-2xl transition-all hover:bg-[#D16B92]"
               >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  Proceed to Checkout <IoChevronForwardOutline className="group-hover:translate-x-2 transition-transform" />
                </span>
               </button>
               
               <p className="text-[8px] text-center text-gray-400 uppercase tracking-widest leading-loose">
                 Secure Checkout • Handcrafted in India
               </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Cart;