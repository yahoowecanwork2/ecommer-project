import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../apis/auth";
import { addOrIncrementInCart } from "../../redux/cartSlice";
import HeaderHome from "../common/Header";
const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, subtotal } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      if (items.length > 0) return;

      try {
        setLoading(true);
        const res = await authApi.myCart();
        if (res?.cart?.length) {
          res.cart.forEach((item) => {
            dispatch(addOrIncrementInCart(item));
          });
        }
      } catch (err) {
        console.error("Fetch cart error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleProceedOrder = async () => {
    try {
      navigate("/checkout");
    } catch (err) {
      console.error("Order error:", err);
    }
  };

  // ✅ empty state
  if (!loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-[#160059] text-white px-6 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <HeaderHome />
      <div className="p-6 mt-20 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#160059] mb-6">
          Order Summary
        </h1>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white rounded-2xl shadow p-4"
            >
              <div className="h-40 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between mt-3">
                <span className="font-bold text-[#160059]">₹{item.price}</span>
                <span className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            Subtotal: ₹{subtotal}
          </h2>

          <button
            onClick={handleProceedOrder}
            className="bg-[#160059] hover:bg-[#2a1380] text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Proceed to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
