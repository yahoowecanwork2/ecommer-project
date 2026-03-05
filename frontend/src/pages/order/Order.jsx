import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../apis/auth";
import { addOrIncrementInCart, clearCart } from "../../redux/cartSlice";
import HeaderHome from "../common/Header";
import { orderApi } from "../../apis/order";
import toast from "react-hot-toast";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, subtotal } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  console.log(items);
  const [form, setForm] = useState({
    customername: "",
    phoneno: "",
    alternateno: "",
    emailid: "",
    shippingaddress: "",
    pincode: "",
  });

  const [paymentType, setPaymentType] = useState("cod");

  const discount = 0;
  const total = subtotal - discount;

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

  // COD ORDER
  const createCodOrder = async () => {
    try {
      setLoading(true);
      const payload = {
        items,
        ...form,
        calculatedamount: subtotal,
        discount,
        ordertotal: total,
        paymentType: "cod",
      };
      const res = await orderApi.placeOrder(payload);
      if (res.success) {
        console.log(res.order);
        toast.success(res.message || "Order placed");
        handleClearCart();
        navigate("/my-order");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ONLINE PAYMENT
  const createOnlineOrder = async () => {

    try {
      setLoading(true);
      const { data } = await orderApi.checkOut({
        amount: total,
      });
      console.log(data)
      const options = {
        key:import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "E-commerce Module",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          try {
            const payload = {
              items,
              ...form,
              calculatedamount: subtotal,
              discount,
              ordertotal: total,
              paymentType: "online",
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
                console.log(payload)
            const res = await orderApi.placeOrder(payload);
            console.log(res)
            toast.success(res.message || "Order successful");
            navigate("/my-order");
          } catch (error) {
            toast.error("Order failed");
          }
        },

        theme: {
          color: "#160059",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutOrder = () => {
    if (!form.customername || !form.phoneno || !form.shippingaddress) {
      toast.error("Please fill address details");
      return;
    }

    if (paymentType === "cod") {
      createCodOrder();
    } else {
      createOnlineOrder();
    }
  };

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

        {/* CART ITEMS */}
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

        {/* ADDRESS FORM */}

        <div className="mt-8 bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="customername"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              name="phoneno"
              placeholder="Phone Number"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              name="alternateno"
              placeholder="Alternate Phone"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              name="emailid"
              placeholder="Email"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <textarea
              name="shippingaddress"
              placeholder="Full Address"
              className="border p-3 rounded-lg md:col-span-2"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PAYMENT METHOD */}

        <div className="mt-6 bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          <div className="flex gap-6">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="cod"
                checked={paymentType === "cod"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="radio"
                value="online"
                checked={paymentType === "online"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              Pay Online
            </label>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-gray-600">Subtotal : ₹{subtotal}</p>
            <p className="text-gray-600">Discount : ₹{discount}</p>

            <h2 className="text-xl font-bold text-gray-800">
              Total : ₹{total}
            </h2>
          </div>

          <button
            onClick={handleCheckoutOrder}
            className="bg-[#160059] hover:bg-[#2a1380] text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
