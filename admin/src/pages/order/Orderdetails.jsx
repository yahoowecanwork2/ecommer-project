import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../componets/common/Layout";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaRupeeSign,
  FaArrowLeft,
  FaRegCalendarAlt,
  FaHashtag,
  FaCheckCircle,
  FaTag,
  FaReceipt,
} from "react-icons/fa";
import { orderApis } from "../../apis/order";

const Orderdetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSingleOrder = async () => {
    try {
      setLoading(true);
      const res = await orderApis.getSingle(id);
      console.log("order-details", res);

      if (res.order) setOrder(res.order);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const markAsDelivered = async () => {
    try {
      setLoading(true);
      await orderApis.updateStatus(id, { status: "delivered" });
      getSingleOrder();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, [id]);

  const getStatusStyle = (status) => {
    const base =
      "px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-tighter border ";
    switch (status?.toLowerCase()) {
      case "pending":
        return base + "bg-white text-zinc-800 border-zinc-800";
      case "delivered":
        return base + "bg-zinc-900 text-white border-zinc-900";
      case "cancelled":
        return base + "bg-zinc-100 text-zinc-400 border-zinc-200 line-through";
      default:
        return base + "bg-white text-zinc-500 border-zinc-200";
    }
  };

  if (loading)
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
          LOADING_ORDER_DATA...
        </div>
      </Layout>
    );

  const subtotal =
    order?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
    0;
  const discountAmount = Number(order?.discount || 0);
  return (
   <Layout>
  <div className="max-w-5xl mx-auto py-10 px-4 font-sans text-zinc-900">
    {/* TOP NAV & ACTIONS */}
    <div className="flex items-center justify-between mb-10">
      <button
        onClick={() => navigate("/order")}
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-black transition-colors"
      >
        <FaArrowLeft size={12} /> Back to Orders
      </button>

      {order?.status !== "delivered" && (
        <button
          onClick={markAsDelivered}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all"
        >
          <FaCheckCircle /> Mark as Delivered
        </button>
      )}
    </div>

    {/* HEADER SECTION */}
    <div className="mb-12">
      <div className="flex items-baseline gap-3 mb-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Order <span className="text-zinc-400 font-light">#{order?.orderno}</span>
        </h1>
        <span className={`text-[10px] px-3 py-1 font-black uppercase tracking-widest border ${getStatusStyle(order?.status)}`}>
          {order?.status}
        </span>
      </div>
      <div className="flex gap-5 text-[11px] font-medium text-zinc-500 uppercase tracking-tight">
        <span className="flex items-center gap-1.5">
          <FaRegCalendarAlt className="text-zinc-300" /> {new Date(order?.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <span className="text-zinc-200">|</span>
        <span className="flex items-center gap-1.5 font-mono">
          ID: {order?._id}
        </span>
      </div>
    </div>

    {/* INFO GRID - Clean & Minimal */}
    <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-200 mb-12">
      <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-100">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-5">Customer</h3>
        <p className="text-base font-bold text-zinc-800">{order?.customername}</p>
        <p className="text-sm text-zinc-500 mt-1">{order?.phoneno}</p>
      </div>

      <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-100 bg-zinc-50/30">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-5">Shipping Address</h3>
        <p className="text-sm leading-relaxed text-zinc-600 font-medium">
          {order?.shippingaddress}
          <span className="block mt-2 font-bold text-zinc-900 tracking-tighter">PIN: {order?.pincode}</span>
        </p>
      </div>

      <div className="p-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-5">Payment Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-medium text-zinc-500 uppercase">Method</span>
            <span className="text-[11px] font-bold">{order?.payment ? "RAZORPAY" : "COD"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-medium text-zinc-500 uppercase">Status</span>
            <span className={`text-[9px] px-2 py-0.5 font-bold border ${order?.payment ? "bg-zinc-100 border-zinc-300" : "bg-orange-50 text-orange-600 border-orange-100"}`}>
              {order?.payment ? "PAID" : "UNPAID"}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* MANIFEST & FINANCIALS */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Table Section */}
      <div className="lg:col-span-2">
        <h2 className="text-[11px] font-bold uppercase tracking-widest mb-6 text-zinc-400">Order Manifest</h2>
        <div className="border-t border-zinc-200">
          {order?.items?.map((item, i) => (
            <div key={i} className="flex items-center gap-6 py-6 border-b border-zinc-100">
              <img
                src={item?.imageurl}
                className="w-14 h-14 object-cover grayscale-[0.5] hover:grayscale-0 transition-all border border-zinc-100"
                alt=""
              />
              <div className="flex-1">
                <span className="text-sm font-bold block text-zinc-800">{item?.name}</span>
                <span className="text-[11px] text-zinc-400 uppercase font-medium">Size: {item?.size}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-zinc-400 block uppercase">Qty: {item?.quantity}</span>
                <span className="text-sm font-bold text-zinc-900">₹{(item?.price * item?.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="space-y-6">
        <div className="bg-zinc-50 p-6 border border-zinc-200">
          <h2 className="text-[11px] font-bold uppercase tracking-widest mb-6 text-zinc-400">Financial Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-medium text-zinc-800">₹{subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Discount</span>
              <span className="text-zinc-900 font-bold">-₹{discountAmount?.toLocaleString()}</span>
            </div>
            <div className="pt-4 border-t border-zinc-200 flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase text-zinc-400">Total Amount</span>
              <span className="text-2xl font-bold tracking-tight text-zinc-900">₹{order?.ordertotal?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Transaction Logs */}
        {order?.payment && (
          <div className="p-6 border border-zinc-100 rounded-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-zinc-400 flex items-center gap-2">
              <FaReceipt size={10} /> Transaction Data
            </h3>
            <div className="space-y-2 font-mono text-[9px] text-zinc-400 uppercase leading-tight">
              <p>PAY_ID: <span className="text-zinc-900">{order.payment.razorpay_payment_id}</span></p>
              <p>REF: <span className="text-zinc-900">{order.payment.razorpay_order_id}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</Layout>
  );
};

export default Orderdetails;
