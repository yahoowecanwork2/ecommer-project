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
import HeaderHome from "../common/Headerhome";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";

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
      const payload = {
        productId: item.productId,
        quantity: item.quantity + 1,
      };
      const res = await authApi.updateQuantity(payload);
      console.log(res);
      dispatch(
        addOrIncrementInCart({
          productId: item.productId,
          quantity: item.quantity + 1,
        }),
      );
    } catch (error) {
      console.error("Increase qty error:", error);
    }
  };

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;
    try {
      const payload = {
        productId: item.productId,
        quantity: item.quantity - 1,
      };

      const res = await authApi.updateQuantity(payload);
      console.log(res);
      dispatch(
        decrementOrRemoveInCart({
          productId: item.productId,
          quantity: item.quantity - 1,
        }),
      );
    } catch (error) {
      console.error("Decrease qty error:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
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
      <div className="min-h-screen bg-white ">
        <HeaderHome />
        <div className="flex justify-center items-center h-[60vh] text-gray-400 text-xl">
          <FaShoppingCart className="mr-2 text-[#160059]" /> Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white ">
      <HeaderHome />

      <div className="flex justify-between p-6 pl-9 pr-5 items-center mb-8 mt-20 border-b pb-4">
        <h2 className="text-3xl font-bold text-[#160059] flex items-center gap-2">
          <FaShoppingCart /> My Cart
        </h2>
        <button
          onClick={handleClearCart}
          className="border border-[#160059] text-[#160059] px-5 py-2 rounded-xl hover:bg-[#160059] hover:text-white transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pl-9 pr-5  gap-6">
        {cartItems?.map((item) => (
          <div
            key={item?.productId}
            className="bg-white border border-[#160059]/20 rounded-2xl p-4 shadow-md hover:shadow-xl transition"
          >
            <img
              src={item?.imageUrl}
              alt={item?.name}
              className="w-full h-70 object-cover rounded-xl mb-3"
            />

            <h3 className="font-semibold text-lg text-gray-800">
              {item?.name}
            </h3>

            <p className="text-[#160059] font-medium mb-2">₹{item?.price}</p>

            <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-xl p-2">
              <button
                onClick={() => decreaseQty(item)}
                className="p-2 border border-[#160059] text-[#160059] rounded-lg hover:bg-[#160059] hover:text-white transition"
              >
                <FaMinus />
              </button>

              <span className="font-semibold text-gray-800">
                {item?.quantity}
              </span>

              <button
                onClick={() => increaseQty(item)}
                className="p-2 border border-[#160059] text-[#160059] rounded-lg hover:bg-[#160059] hover:text-white transition"
              >
                <FaPlus />
              </button>
            </div>

            <button
              onClick={() => navigate(`/order`)}
              className="w-full bg-[#160059] text-white py-2 rounded-xl mb-2 hover:bg-blue-800 transition"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => handleRemoveItem(item?.productId)}
              className="w-full border border-red-500 text-red-500 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition"
            >
              <FaTrash /> Remove Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
