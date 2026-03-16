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
    <div className="font-google bg-[#FFFBFB] min-h-screen">
  <HeaderHome />

  <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-32 pb-20">
    <div className="flex flex-col lg:flex-row items-start gap-12">
      
      {/* --- LEFT SIDE: THE STUDIO FORM (65%) --- */}
      <div className="lg:w-[65%] w-full space-y-10">
        <header className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D16B92]">Checkout</p>
          <h1 className="text-4xl md:text-5xl font-serif italic text-[#3D2B3D]">
            Finalize your <span className="not-italic font-light text-[#D16B92]">Order.</span>
          </h1>
        </header>

        {/* 01. SHIPPING */}
        <div className="bg-white p-8 rounded-[32px] border border-pink-50 shadow-sm shadow-pink-50/20">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black text-[#D16B92] border border-pink-100 w-6 h-6 flex items-center justify-center rounded-full">1</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-[#3D2B3D]">Shipping Address</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input name="customername" placeholder="Full Name" onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-2xl focus:outline-none border border-transparent focus:border-pink-200 transition-all text-sm" />
            <input name="phoneno" placeholder="Phone Number" onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-2xl focus:outline-none border border-transparent focus:border-pink-200 transition-all text-sm" />
            <input name="emailid" placeholder="Email Address" onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-2xl focus:outline-none border border-transparent focus:border-pink-200 transition-all text-sm" />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} className="w-full bg-[#FAF9F6] p-4 rounded-2xl focus:outline-none border border-transparent focus:border-pink-200 transition-all text-sm" />
            <textarea name="shippingaddress" placeholder="Complete Address (House No, Street, Area...)" rows="2" onChange={handleChange} className="md:col-span-2 w-full bg-[#FAF9F6] p-4 rounded-2xl focus:outline-none border border-transparent focus:border-pink-200 transition-all text-sm resize-none" />
          </div>
        </div>

        {/* 02. PAYMENT */}
        <div className="bg-white p-8 rounded-[32px] border border-pink-50 shadow-sm shadow-pink-50/20">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black text-[#D16B92] border border-pink-100 w-6 h-6 flex items-center justify-center rounded-full">2</span>
            <h2 className="text-xs font-black uppercase tracking-widest text-[#3D2B3D]">Payment Method</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${paymentType === 'cod' ? 'border-[#D16B92] bg-pink-50/30' : 'border-gray-50 bg-[#FAF9F6] hover:border-pink-100'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" value="cod" checked={paymentType === "cod"} onChange={(e) => setPaymentType(e.target.value)} className="accent-[#D16B92]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Cash on Delivery</span>
              </div>
            </label>

            <label className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all ${paymentType === 'online' ? 'border-[#D16B92] bg-pink-50/30' : 'border-gray-100 bg-[#FAF9F6] hover:border-pink-100'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" value="online" checked={paymentType === "online"} onChange={(e) => setPaymentType(e.target.value)} className="accent-[#D16B92]" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Pay Online</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: COMPACT SUMMARY WITH IMAGES (35%) --- */}
      <div className="lg:w-[35%] w-full">
        <div className="sticky top-32 bg-[#3D2B3D] text-white p-7 rounded-[40px] shadow-2xl shadow-pink-100/30 border border-white/5">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-200 mb-6 pb-4 border-b border-white/10">Your Selection</h3>
          
          {/* Item List with Small Images */}
          <div className="space-y-5 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar mb-6">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 items-center">
                <div className="w-12 h-16 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 border border-white/5">
                  <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[11px] font-serif italic text-pink-50 truncate">{item.name}</h4>
                  <p className="text-[9px] text-pink-200/50 uppercase tracking-widest">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold whitespace-nowrap">₹{item.price}</span>
              </div>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-pink-50/60 font-medium">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-emerald-400 font-medium">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-pink-200">Total</span>
              <span className="text-4xl font-serif italic tracking-tighter text-white leading-none">₹{total}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleCheckoutOrder}
            className="w-full mt-8 py-4 bg-[#D16B92] hover:bg-[#A34D6F] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-lg active:scale-95 shadow-pink-900/20"
          >
            Place Order
          </button>
          
          <p className="mt-6 text-[8px] uppercase tracking-[0.3em] text-center opacity-30 font-bold">
            Secure Boutique Checkout
          </p>
        </div>
      </div>

    </div>
  </div>
</div>
  );
};

export default Order;
