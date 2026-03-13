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
} from "react-icons/fa";
import { orderApis } from "../../apis/order";
import toast from "react-hot-toast";

const Orderdetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- Logic remains identical ---
  const getSingleOrder = async () => {
    try {
      setLoading(true);
      const res = await orderApis.getSingle(id);
      console.log("single order", res);

      if (res.order) {
        setOrder(res.order);
      }
      setLoading(false);
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
      "px-2 py-0.5 rounded-sm border text-[10px] font-bold uppercase tracking-tight ";
    switch (status?.toLowerCase()) {
      case "pending":
        return base + "bg-orange-50 text-orange-700 border-orange-200";
      case "delivered":
        return base + "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return base + "bg-red-50 text-red-700 border-red-200";
      default:
        return base + "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading)
    return (
      <Layout>
        <div className="p-8 text-[11px] font-bold uppercase tracking-widest text-gray-400 animate-pulse">
          Loading Order Data...
        </div>
      </Layout>
    );
  // if (!order) return null;

  return (
    <Layout>
      <div className="space-y-6">
        {/* TOP NAVIGATION & ACTIONS */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <button
            onClick={() => navigate("/order")}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft size={10} /> Back to Orders
          </button>

          <div className="flex gap-2">
            <button className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-red-600 text-white rounded-sm hover:bg-red-700 transition-all">
              Cancel Order
            </button>
            <button className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-green-600 text-white rounded-sm hover:bg-green-700 transition-all">
              Mark Delivered
            </button>
          </div>
        </div>

        {/* ORDER SUMMARY HEADER */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-16 h-16 bg-gray-900 text-white flex items-center justify-center text-xl font-bold rounded-sm shadow-sm">
            <FaBoxOpen />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                Order <span className="text-gray-400">#{order?.orderno}</span>
              </h1>
              <span className={getStatusStyle(order?.status)}>
                {order?.status}
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <FaRegCalendarAlt className="text-gray-300" /> Placed on{" "}
                {new Date(order?.createdAt).toLocaleString("en-IN")}{" "}
              </span>
              <span className="flex items-center gap-1.5">
                <FaHashtag className="text-gray-300" /> ID: {order?._id}
              </span>
            </div>
          </div>
        </div>

        {/* CUSTOMER & SHIPPING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Details */}
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                Customer Information
              </h3>
              <FaUser className="text-gray-300 text-xs" />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">Full Name</span>
                <span className="text-gray-900 font-bold">
                  {order?.customername}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">Phone Number</span>
                <span className="text-gray-900 font-bold">
                  {order?.phoneno}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                Shipping Address
              </h3>
              <FaMapMarkerAlt className="text-gray-300 text-xs" />
            </div>
            <div className="p-4">
              <p className="text-xs font-bold text-gray-900 leading-relaxed uppercase tracking-tight">
                {order?.shippingaddress}
                <br />
                PIN: {order?.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
              Order Manifest
            </h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                <th className="px-6 py-4">Item Description</th>
                <th className="px-6 py-4">Qty</th>
                <th className="px-6 py-4">Unit Price</th>
                <th className="px-6 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {order?.items?.map((item, index) => (
                <tr key={index} className="text-xs text-gray-700">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 font-medium">{item?.quantity}</td>
                  <td className="px-6 py-4 font-medium">₹{item?.price}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    ₹₹{item?.productId?.price * item?.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTAL FOOTER */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Grand Total
              </span>
              <span className="text-xl font-black text-gray-900 flex items-center">
                <FaRupeeSign size={14} className="mt-1" /> {order?.ordertotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orderdetails;
