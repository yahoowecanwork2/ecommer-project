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
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        customername: user.name || "",
        phoneno: user.phoneno || "",
        emailid: user.email || "",

        shippingaddress: `${user.address?.locality || ""}, ${user.address?.city || ""}, ${user.address?.state || ""}`,

        pincode: user.address?.pinCode || "",
      }));
    }
  }, [user]);
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
      console.log(data);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
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
            console.log(payload);
            const res = await orderApi.placeOrder(payload);
            console.log(res);
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
    <div className="font-google bg-[#FFFBFB] min-h-screen">
      <HeaderHome />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-10">
        {/* Page Title - Small & Elegant */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-serif italic text-[#3D2B3D]">
            Secure Checkout
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">
            Review and finalize your order
          </p>
        </div>

        {/* THREE COLUMN GRID - EVERYTHING VISIBLE */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* 1. SHIPPING FORM (LEFT) */}
          <div className="bg-white p-6 rounded-3xl border border-pink-50 shadow-sm">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-[#D16B92] mb-6 flex items-center gap-2">
              <span className="w-5 h-5 bg-pink-50 rounded-full flex items-center justify-center">
                1
              </span>
              Shipping
            </h2>
            <div className="space-y-4">
              <input
                name="customername"
                value={form.customername}
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full bg-[#FAF9F6] p-3 rounded-xl text-xs outline-none border border-transparent focus:border-pink-200"
              />

              <input
                name="phoneno"
                value={form.phoneno}
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full bg-[#FAF9F6] p-3 rounded-xl text-xs outline-none border border-transparent focus:border-pink-200"
              />
              <input
                name="emailid"
                value={form.emailid}
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-[#FAF9F6] p-3 rounded-xl text-xs outline-none border border-transparent focus:border-pink-200"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full bg-[#FAF9F6] p-3 rounded-xl text-xs outline-none border border-transparent focus:border-pink-200"
                />
                <div className="bg-pink-50/20 rounded-xl flex items-center justify-center text-[9px] text-[#D16B92] uppercase font-bold tracking-tighter italic">
                  Standard Delivery
                </div>
              </div>
              <textarea
                name="shippingaddress"
                placeholder="Full Address"
                value={form.shippingaddress}
                rows="2"
                onChange={handleChange}
                className="w-full bg-[#FAF9F6] p-3 rounded-xl text-xs outline-none border border-transparent focus:border-pink-200 resize-none"
              />
            </div>
          </div>

          {/* 2. ORDER CURATION (CENTER) */}
          <div className="bg-white p-6 rounded-3xl border border-pink-50 shadow-sm flex flex-col h-full max-h-[500px]">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-[#D16B92] mb-6 flex items-center gap-2">
              <span className="w-5 h-5 bg-pink-50 rounded-full flex items-center justify-center">
                2
              </span>
              Curation
            </h2>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0"
                >
                  <img
                    src={item.imageUrl}
                    className="w-10 h-14 object-cover rounded-lg shadow-sm"
                    alt={item.name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-serif italic text-[#3D2B3D] truncate">
                      {item.name}
                    </p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-tighter">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-[11px] font-bold text-[#3D2B3D]">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. PAYMENT & SUMMARY (RIGHT) */}
          <div className="space-y-6">
            {/* PAYMENT BOX */}
            <div className="bg-white p-6 rounded-3xl border border-pink-50 shadow-sm">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#D16B92] mb-6 flex items-center gap-2">
                <span className="w-5 h-5 bg-pink-50 rounded-full flex items-center justify-center">
                  3
                </span>
                Payment
              </h2>
              <div className="flex flex-col gap-3">
                <label
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${paymentType === "cod" ? "border-[#D16B92] bg-pink-50/30" : "border-gray-50 bg-[#FAF9F6]"}`}
                >
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentType === "cod"}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="accent-[#D16B92]"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B3D]">
                    Cash on Delivery
                  </span>
                </label>
                <label
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${paymentType === "online" ? "border-[#D16B92] bg-pink-50/30" : "border-gray-100 bg-[#FAF9F6]"}`}
                >
                  <input
                    type="radio"
                    value="online"
                    checked={paymentType === "online"}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="accent-[#D16B92]"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B3D]">
                    Online Payment
                  </span>
                </label>
              </div>
            </div>

            {/* SUMMARY & ACTION */}
            <div className="bg-[#3D2B3D] text-white p-6 rounded-3xl shadow-xl shadow-pink-100">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] text-pink-100/50 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[10px] text-emerald-400 uppercase tracking-widest">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-8 border-t border-white/10 pt-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-pink-200">
                  To Pay
                </span>
                <span className="text-3xl font-serif italic">₹{total}</span>
              </div>
              <button
                onClick={handleCheckoutOrder}
                className="w-full py-4 bg-[#D16B92] hover:bg-[#A34D6F] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-lg active:scale-95"
              >
                Place Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
