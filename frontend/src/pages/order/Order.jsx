import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../apis/auth";
import { addOrIncrementInCart, clearCart } from "../../redux/cartSlice";
import HeaderHome from "../common/Header";
import { orderApi } from "../../apis/order";
import toast from "react-hot-toast";
import { IoChevronForwardOutline } from "react-icons/io5";

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
    <div className="min-h-screen bg-[#F9F9F9] font-sans">
      <HeaderHome />

      <main className="max-w-6xl mx-auto px-2 lg:px-8 pt-32 pb-24">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Checkout
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Complete your details to finalize the order.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: FORMS */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. SHIPPING DETAILS */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Full Name
                  </label>
                  <input
                    name="customername"
                    placeholder="John Doe"
                    onChange={handleChange}
                    className="w-full bg-slate-50 p-3.5 rounded-lg text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Email Address
                  </label>
                  <input
                    name="emailid"
                    type="email"
                    placeholder="john@example.com"
                    onChange={handleChange}
                    className="w-full bg-slate-50 p-3.5 rounded-lg text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    name="phoneno"
                    placeholder="+91 00000 00000"
                    onChange={handleChange}
                    className="w-full bg-slate-50 p-3.5 rounded-lg text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Shipping Address
                  </label>
                  <textarea
                    name="shippingaddress"
                    placeholder="House No, Street, Landmark..."
                    rows="3"
                    onChange={handleChange}
                    className="w-full bg-slate-50 p-3.5 rounded-lg text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                    Pincode
                  </label>
                  <input
                    name="pincode"
                    placeholder="1100XX"
                    onChange={handleChange}
                    className="w-full bg-slate-50 p-3.5 rounded-lg text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* 2. PAYMENT METHOD */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentType === "cod" ? "border-slate-900 bg-slate-50" : "border-slate-100 hover:border-slate-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentType === "cod"}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-4 h-4 accent-slate-900"
                    />
                    <span className="text-sm font-medium text-slate-900">
                      Cash on Delivery
                    </span>
                  </div>
                </label>

                <label
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentType === "online" ? "border-slate-900 bg-slate-50" : "border-slate-100 hover:border-slate-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="online"
                      checked={paymentType === "online"}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-4 h-4 accent-slate-900"
                    />
                    <span className="text-sm font-medium text-slate-900">
                      Online Payment
                    </span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (STICKY) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 sticky top-32 overflow-hidden">
              <div className="p-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                  Order Summary
                </h2>

                {/* Scrollable Items List */}
                <div className="space-y-4 max-h-60 overflow-y-auto overflow-hidden mb-8 pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-4 items-center pr-10"
                    >
                      <div className="w-16 h-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          className="w-full h-full object-cover"
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="space-y-3 border-t border-slate-100 pt-6">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Shipping</span>
                    <span className="font-medium text-slate-900 italic">
                      Free
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-slate-100">
                    <span className="text-base font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      ₹{total}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutOrder}
                  className="w-full mt-8 py-5 bg-[#3D2B3D] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 hover:bg-[#D16B92] hover:shadow-lg hover:shadow-pink-100 active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <span className="tracking-[0.25em]">
                    Complete Transaction
                  </span>
                  <IoChevronForwardOutline className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest">
                  🔒 SSL Encrypted & Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Order;
