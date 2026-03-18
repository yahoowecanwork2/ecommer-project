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
import {
  IoBagOutline,
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoArrowForward,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

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

  // API Logic Helpers
  const updateQty = async (item, newQty) => {
    if (newQty < 1) return;
    try {
      await authApi.updateQuantity({
        productId: item.productId,
        quantity: newQty,
      });
      if (newQty > item.quantity) {
        dispatch(
          addOrIncrementInCart({ productId: item.productId, quantity: newQty }),
        );
      } else {
        dispatch(decrementOrRemoveInCart({ productId: item.productId }));
      }
    } catch (error) {
      console.error("Update qty error:", error);
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

  // EMPTY STATE
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderHome />
        <div className="flex flex-col items-center justify-center pt-40 px-6">
          <IoBagOutline className="text-6xl text-gray-200 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 text-center max-w-sm">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <HeaderHome />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex items-baseline justify-between mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500">{cartItems.length} Items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: ITEMS LIST */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 border-b border-gray-100 last:border-0"
                >
                  {/* Image */}
                  <div className="w-full sm:w-32 h-40 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      className="w-full h-full object-cover"
                      alt={item.name}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider">
                          Premium Selection
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      {/* Modern Qty Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQty(item, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors text-gray-600"
                        >
                          <IoRemoveOutline size={18} />
                        </button>
                        <span className="px-4 text-sm font-medium w-10 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors text-gray-600"
                        >
                          <IoAddOutline size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <IoTrashOutline size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm sticky top-32">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
  onClick={() => navigate(`/order`)}
  className="w-full bg-[#1a1a1a] text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#c9a07a] transition-all duration-500 shadow-xl shadow-gray-100/50 group active:scale-95 mb-6"
>
  Checkout Now
  <IoArrowForward className="text-sm group-hover:translate-x-2 transition-transform duration-500" />
</button>

              <div className="flex items-center justify-center gap-2 text-gray-400 text-[11px] uppercase tracking-widest">
                <IoShieldCheckmarkOutline className="text-green-500" /> Secure
                Payment
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
