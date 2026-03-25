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
      <div className="max-w-6xl mx-auto pb-20 font-sans text-zinc-900">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-5">
          <button
            onClick={() => navigate("/order")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
          >
            <FaArrowLeft size={10} /> Back to Archive
          </button>

          {order?.status !== "delivered" && (
            <button
              onClick={markAsDelivered}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-95"
            >
              <FaCheckCircle /> Mark as Delivered
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-black tracking-tighter italic uppercase">
                Order <span className="text-zinc-300">#{order?.orderno}</span>
              </h1>
              <span className={getStatusStyle(order?.status)}>
                {order?.status}
              </span>
            </div>
            <div className="flex gap-6 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <FaRegCalendarAlt />{" "}
                {new Date(order?.createdAt).toLocaleString("en-IN")}
              </span>
              <span className="flex items-center gap-2">
                <FaHashtag /> SystemID: {order?._id}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 mb-10 shadow-2xl">
          <div className="bg-white p-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
              <FaUser size={10} /> Customer Information
            </h3>
            <p className="text-lg font-black leading-none mb-2">
              {order?.customername}
            </p>
            <p className="text-sm font-medium text-zinc-500 tracking-tight italic">
              {order?.phoneno}
            </p>
          </div>

          <div className="bg-white p-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
              <FaMapMarkerAlt size={10} /> Shipping Destination
            </h3>
            <p className="text-xs font-bold leading-relaxed uppercase tracking-tight text-zinc-700">
              {order?.shippingaddress}
              <span className="block mt-4 pt-4 border-t border-zinc-50 text-black">
                PINCODE: {order?.pincode}
              </span>
            </p>
          </div>

          <div className="bg-white p-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
              <FaReceipt size={10} /> Payment Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-zinc-50 pb-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">
                  Method
                </span>
                <span className="text-xs font-black">
                  {order?.payment ? "RAZORPAY_ONLINE" : "CASH_ON_DELIVERY"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">
                  Status
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 font-black border ${order?.payment ? "bg-black text-white border-black" : "bg-white text-zinc-400 border-zinc-200"}`}
                >
                  {order?.payment ? "PAID_VERIFIED" : "PENDING_COLLECTION"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 border-l-4 border-black pl-3">
              Manifest
            </h2>
            <div className="border border-zinc-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-black uppercase text-zinc-400">
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4 text-right">Price</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100">
                  {order?.items?.map((item, i) => (
                    <tr key={i} className="bg-white">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={item?.imageurl}
                            alt={item?.name}
                            className="w-16 h-20 object-cover rounded border"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/80x100?text=No+Image";
                            }}
                          />

                          <div>
                            <span className="text-sm font-black block">
                              {item?.name}
                            </span>

                            <span className="text-[12px] text-zinc-900 uppercase">
                              Size: {item?.size}
                            </span>

                            <span className="block text-[9px] text-zinc-300">
                              ID: {item?.productId?._id?.slice(-8)}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center text-sm font-bold">
                        x{item?.quantity}
                      </td>

                      <td className="px-6 py-5 text-right text-sm font-black">
                        ₹{(item?.price * item?.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 border-l-4 border-black pl-3">
              Financials
            </h2>
            <div className="bg-black text-white p-8 shadow-xl">
              <div className="space-y-3 border-b border-zinc-800 pb-6 mb-6">
                <div className="flex justify-between text-[11px] font-bold text-zinc-400 uppercase">
                  <span>Gross Subtotal</span>
                  <span>₹{subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-zinc-400 uppercase">
                  <span className="flex items-center gap-1">
                    <FaTag size={10} /> Savings / Discount
                  </span>
                  <span className="text-white">
                    - ₹{discountAmount?.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest">
                  Net Total
                </span>
                <span className="text-3xl font-black italic tracking-tighter">
                  ₹{order?.ordertotal?.toLocaleString()}
                </span>
              </div>
            </div>

            {order?.payment && (
              <div className="bg-white border border-zinc-200 p-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FaCheckCircle size={10} /> Transaction Logs
                </h3>
                <div className="space-y-3 font-mono text-[10px] text-zinc-500 uppercase">
                  <div className="flex justify-between">
                    <span>Pay_ID:</span>
                    <span className="text-black font-bold">
                      {order.payment.razorpay_payment_id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order_Ref:</span>
                    <span className="text-black font-bold">
                      {order.payment.razorpay_order_id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logged_At:</span>
                    <span className="text-black font-bold">
                      {new Date(order.payment.createdAt).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
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
