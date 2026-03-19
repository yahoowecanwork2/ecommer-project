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

const Orderdetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSingleOrder = async () => {
    try {
      setLoading(true);
      const res = await orderApis.getSingle(id);

      if (res.order) {
        setOrder(res.order);
      }
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
      getSingleOrder(); // refresh
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

  return (
    <Layout>
      <div className="space-y-6">
        {/* TOP NAV */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <button
            onClick={() => navigate("/order")}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900"
          >
            <FaArrowLeft size={10} /> Back to Orders
          </button>

          <button
            onClick={markAsDelivered}
            className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-green-600 text-white rounded-sm hover:bg-green-700"
          >
            Mark Delivered
          </button>
        </div>

        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col md:flex-row gap-6">
          <div className="w-16 h-16 bg-gray-900 text-white flex items-center justify-center text-xl rounded-sm">
            <FaBoxOpen />
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold">
              Order <span className="text-gray-400">#{order?.orderno}</span>
            </h1>

            <span className={getStatusStyle(order?.status)}>
              {order?.status}
            </span>

            <div className="flex gap-4 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <FaRegCalendarAlt />{" "}
                {new Date(order?.createdAt).toLocaleString("en-IN")}
              </span>

              <span className="flex items-center gap-1">
                <FaHashtag /> {order?._id}
              </span>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CUSTOMER */}
          <div className="bg-white border rounded-sm">
            <div className="p-3 border-b bg-gray-50 flex justify-between">
              <h3 className="text-xs font-bold uppercase">Customer Info</h3>
              <FaUser />
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span>Name</span>
                <span className="font-bold">{order?.customername}</span>
              </div>

              <div className="flex justify-between">
                <span>Phone</span>
                <span className="font-bold">{order?.phoneno}</span>
              </div>
            </div>
          </div>

          {/* SHIPPING */}
          <div className="bg-white border rounded-sm">
            <div className="p-3 border-b bg-gray-50 flex justify-between">
              <h3 className="text-xs font-bold uppercase">Shipping</h3>
              <FaMapMarkerAlt />
            </div>

            <div className="p-4 text-xs font-bold">
              {order?.shippingaddress}
              <br />
              PIN: {order?.pincode}
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white border rounded-sm">
            <div className="p-3 border-b bg-gray-50 flex justify-between">
              <h3 className="text-xs font-bold uppercase">Payment Info</h3>
              <FaRupeeSign />
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span>Method</span>
                <span className="font-bold">
                  {order?.payment ? "Online (Razorpay)" : "Cash on Delivery"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-bold">
                  {order?.payment ? "Paid" : "Pending"}
                </span>
              </div>

              {order?.payment && (
                <>
                  <div className="flex justify-between">
                    <span>Payment ID</span>
                    <span className="font-bold">
                      {order.payment.razorpay_payment_id}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Order ID</span>
                    <span className="font-bold">
                      {order.payment.razorpay_order_id}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Paid On</span>
                    <span className="font-bold">
                      {new Date(order.payment.createdAt).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-white border rounded-sm">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-gray-400">
                <th className="p-3 text-left">Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th className="text-right pr-4">Total</th>
              </tr>
            </thead>

            <tbody>
              {order?.items?.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3 font-bold">{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.productId?.price}</td>
                  <td className="text-right pr-4 font-bold">
                    ₹{item.productId?.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTAL */}
          <div className="p-4 flex justify-end bg-gray-50">
            <span className="text-lg font-bold">₹ {order?.ordertotal}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orderdetails;
