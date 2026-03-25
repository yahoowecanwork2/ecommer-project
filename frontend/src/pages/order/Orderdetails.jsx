import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderApi } from "../../apis/order";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Orderdetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await orderApi.myOrderSingle(orderId);
      console.log("order-detail", res);

      if (res.success) setOrder(res.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async () => {
    if (!window.confirm("Cancel this curation?")) return;
    try {
      const res = await orderApi.myOrderStatus(orderId, {
        cancelStatus: "yes",
      });
      if (res.success) setOrder(res.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">
        Loading...
      </div>
    );
  if (!order)
    return (
      <div className="h-screen flex items-center justify-center text-sm">
        Order not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-[#3D2B3D]">
      <Header />

      <main className="max-w-4xl mx-auto pt-28 pb-10 px-6">
        {/* HEADER: No extra padding */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
          <div className="space-y-0.5">
            <h1 className="text-xl font-serif italic text-[#3D2B3D]">
              Order #{order?.orderno}
            </h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
              {new Date(order?.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4 font-sans">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1">
              {order?.status}
            </span>
            {order?.status === "pending" && (
              <button
                onClick={cancelOrder}
                className="text-[9px] font-bold uppercase tracking-widest text-gray-300 hover:text-[#3D2B3D] transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* INFO GRID: Tight 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 py-2">
          <div className="space-y-1">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-gray-300">
              Shipping
            </h2>
            <div className="text-[12px] text-gray-600 leading-snug">
              <p className="font-bold text-[#3D2B3D]">{order?.customername}</p>
              <p className="truncate">{order?.shippingaddress}</p>
              <p>Pin: {order?.pincode}</p>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-gray-300">
              Contact
            </h2>
            <div className="text-[12px] text-gray-600 leading-snug">
              <p>{order?.phoneno}</p>
              <p className="text-gray-400">{order?.emailid}</p>
            </div>
          </div>

          <div className="space-y-1 md:text-right">
            <h2 className="text-[9px] font-black uppercase tracking-widest text-gray-300">
              Payment
            </h2>
            <div className="text-[12px] text-gray-600 space-y-0.5">
              <p className="capitalize font-medium">{order?.paymentType}</p>
              <p className="text-[10px] font-bold uppercase text-gray-400">
                {order?.paymentstatus}
              </p>
            </div>
          </div>
        </div>

        {/* ITEMS: Compact List View */}
        <div className="mb-8">
          <h2 className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-4 border-b border-gray-50 pb-1">
            Line Items
          </h2>
          {order?.items?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item?.imageurl}
                  className="w-10 h-14 object-cover bg-gray-50"
                  alt={item?.name}
                />
                <div className="space-y-0.5">
                  <p className="text-[12px] font-bold text-[#3D2B3D] tracking-tight">
                    {item?.name}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase">
                    Qty: {item?.quantity} | Size: {item?.size}
                  </p>
                </div>
              </div>
              <p className="text-[13px] font-bold text-[#3D2B3D]">
                ₹{item?.price}
              </p>
            </div>
          ))}
        </div>

        {/* TOTAL: Simple & Right-aligned */}
        <div className="flex justify-end pt-4 border-t border-[#3D2B3D]/10">
          <div className="w-48 space-y-1">
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>Subtotal</span>
              <span>₹{order?.ordertotal}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-gray-50">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#3D2B3D]">
                Total
              </span>
              <span className="text-xl text-[#3D2B3D]">
                ₹{order?.ordertotal}
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orderdetails;
