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
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const fetchCart = async () => {
    try {
      const res = await authApi.myCart();
      console.log(res);
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
        (cartItem) => cartItem.productId === item.productId,
      );
      if (!currentItem) return;

      const newQty = currentItem.quantity + 1;

      const payload = {
        productId: item.productId,
        quantity: newQty,
      };

      const res = await authApi.updateQuantity(payload);
      console.log(res);

      dispatch(
        addOrIncrementInCart({
          productId: item.productId,
          quantity: newQty,
        }),
      );
    } catch (error) {
      console.error("Increase qty error:", error);
    }
  };

  const decreaseQty = async (item) => {
    try {
      const currentItem = cartItems.find(
        (cartItem) => cartItem.productId === item.productId,
      );
      if (!currentItem || currentItem.quantity <= 1) return;

      const newQty = currentItem.quantity - 1;

      const payload = {
        productId: item.productId,
        quantity: newQty,
      };

      const res = await authApi.updateQuantity(payload);
      console.log(res);

      // ✅ FIXED DISPATCH
      dispatch(decrementOrRemoveInCart({ productId: item.productId }));
    } catch (error) {
      console.error("Decrease qty error:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      console.log(productId);
      const res = await authApi.removeItemFromCart(productId);
      console.log(res);
      dispatch(removeItemInCart(productId));
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await authApi.clearCart();
      console.log(res);
      dispatch(clearCart());
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <HeaderHome />
        <div className="min-h-screen bg-[#faf7f2] font-google flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
            <IoCartOutline className="text-6xl text-[#e8d8c3] mb-6" />

            <h2 className="text-2xl font-medium text-gray-900 mb-3">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mb-8 max-w-sm">
              Looks like you haven’t added anything yet. Explore our latest
              kurtis and find something beautiful.
            </p>

            <button
              onClick={() => navigate("/product")}
              className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] font-google">
      <HeaderHome />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-6 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
          <FaShoppingCart className="text-[#160059]" /> My Cart
        </h2>

        <button
          onClick={handleClearCart}
          className="text-sm border border-gray-300 px-5 py-2 rounded-full hover:bg-gray-900 hover:text-white transition"
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cartItems?.map((item) => (
          <div
            key={item?.productId}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <img
              src={item?.imageUrl}
              alt={item?.name}
              className="w-full h-[320px] object-cover"
            />

            <div className="p-5 space-y-3">
              <h3 className="font-medium text-gray-900">{item?.name}</h3>

              <p className="text-[#160059] font-semibold">₹{item?.price}</p>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between bg-[#faf7f2] rounded-xl p-2">
                <button
                  onClick={() => decreaseQty(item)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-900 hover:text-white transition"
                >
                  <FaMinus />
                </button>

                <span className="font-medium text-gray-800">
                  {item?.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-900 hover:text-white transition"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item?.productId)}
                className="w-full text-sm border border-red-400 text-red-500 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition"
              >
                <FaTrash /> Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      <div className="max-w-7xl mx-auto px-6 pb-20 flex justify-end">
        <button
          onClick={() => navigate(`/order`)}
          className="px-10 py-3 bg-[#160059] text-white rounded-full text-sm font-medium hover:bg-[#0f003f] transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
