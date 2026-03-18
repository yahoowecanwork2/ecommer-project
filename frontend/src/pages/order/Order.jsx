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
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("cod");
  const [form, setForm] = useState({
    customername: "",
    phoneno: "",
    alternateno: "",
    emailid: "",
    shippingaddress: "",
    pincode: "",
  });

  const discount = 0;
  const total = subtotal - discount;

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
          res.cart.forEach((item) => dispatch(addOrIncrementInCart(item)));
        }
      } catch (err) {
        console.error("Cart error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [dispatch, items.length]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createCodOrder = async () => {
    try {
      setLoading(true);
      const res = await orderApi.placeOrder({ items, ...form, calculatedamount: subtotal, discount, ordertotal: total, paymentType: "cod" });
      if (res.success) {
        toast.success("Order Placed");
        await authApi.clearCart();
        dispatch(clearCart());
        navigate("/my-order");
      }
    } catch (error) {
      toast.error("Order Failed");
    } finally {
      setLoading(false);
    }
  };

  const createOnlineOrder = async () => {
    try {
      setLoading(true);
      const { data } = await orderApi.checkOut({ amount: total });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "Navi Clothing",
        order_id: data.id,
        handler: async (res) => {
          await orderApi.placeOrder({ items, ...form, calculatedamount: subtotal, discount, ordertotal: total, paymentType: "online", razorpay_order_id: res.razorpay_order_id, razorpay_payment_id: res.razorpay_payment_id, razorpay_signature: res.razorpay_signature });
          dispatch(clearCart());
          navigate("/my-order");
        },
        theme: { color: "#3D2B3D" },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      toast.error("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutOrder = () => {
    if (!form.customername || !form.phoneno || !form.shippingaddress) return toast.error("Please fill details");
    paymentType === "cod" ? createCodOrder() : createOnlineOrder();
  };

  if (!loading && items.length === 0) return <div className="h-screen flex items-center justify-center font-serif italic text-2xl">Bag is empty.</div>;

  return (
    <div className="bg-white min-h-screen text-[#3D2B3D] font-sans">
      <HeaderHome />
      
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-serif italic mb-20">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-24">
          
          {/* LEFT: MINIMAL FORM */}
          <div className="space-y-16">
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-10">01. Delivery</h2>
              <div className="space-y-8">
                <input name="customername" value={form.customername} placeholder="Recipient Name" onChange={handleChange} className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#3D2B3D] transition-all text-sm placeholder:text-gray-300" />
                <div className="grid grid-cols-2 gap-8">
                  <input name="phoneno" value={form.phoneno} placeholder="Phone" onChange={handleChange} className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#3D2B3D] transition-all text-sm placeholder:text-gray-300" />
                  <input name="emailid" value={form.emailid} placeholder="Email" onChange={handleChange} className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#3D2B3D] transition-all text-sm placeholder:text-gray-300" />
                </div>
                <input name="shippingaddress" value={form.shippingaddress} placeholder="Shipping Address" onChange={handleChange} className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#3D2B3D] transition-all text-sm placeholder:text-gray-300" />
                <input name="pincode" value={form.pincode} placeholder="Pincode" onChange={handleChange} className="w-full border-b border-gray-100 py-3 outline-none focus:border-[#3D2B3D] transition-all text-sm placeholder:text-gray-300" />
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-8">02. Method</h2>
              <div className="flex gap-12">
                {["cod", "online"].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" value={type} checked={paymentType === type} onChange={(e) => setPaymentType(e.target.value)} className="accent-[#3D2B3D] w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{type === "cod" ? "Cash" : "Online"}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:pl-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-10">03. Review</h2>
            <div className="space-y-6 mb-12">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center text-sm border-b border-gray-50 pb-4">
                  <span className="font-serif italic text-gray-600">{item.name} <span className="text-[10px] font-sans not-italic text-gray-300 ml-2">x{item.quantity}</span></span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-black uppercase tracking-widest">Total Payable</span>
                <span className="text-xl italic">₹{total}</span>
              </div>
             <button 
  onClick={handleCheckoutOrder} 
  disabled={loading}
  className="w-full mt-10 py-5 bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-[#c9a07a] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-200/50"
>
  {loading ? "Processing..." : "Complete Transaction"}
</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Order;