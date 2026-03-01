import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../componets/common/Layout";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaRupeeSign,
  FaArrowLeft,
} from "react-icons/fa";

const dummyOrder = {
  orderno: "ORD123",
  customername: "Neha Yadav",
  phoneno: "9876543210",
  shippingaddress: "Gurugram, Haryana",
  pincode: "122001",
  ordertotal: "1999",
  status: "delivered", // pending | delivered | cancelled
  createdAt: "2026-02-20",
  items: [
    { name: "Blue Cotton T-Shirt", quantity: 2, price: 499 },
    { name: "Black Hoodie", quantity: 1, price: 999 },
  ],
};

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "delivered":
      return "bg-green-100 text-green-700 border-green-300";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const Orderdetails = () => {
  const order = dummyOrder;
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-6 min-h-screen bg-white">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/order")}
          className="flex items-center gap-2 mb-4 text-[#160059] font-semibold hover:underline"
        >
          <FaArrowLeft /> Back to Orders
        </button>

        {/* HEADING */}
        <h1 className="text-3xl font-bold mb-6 text-[#160059]">
          Order Details (Admin)
        </h1>

        {/* TOP SUMMARY */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6 flex justify-between items-center">
          <div>
            <p className="text-[#160059] font-semibold">
              Order No: <span className="font-bold">{order.orderno}</span>
            </p>
            <p className="text-sm text-gray-500">Date: {order.createdAt}</p>
          </div>

          <span
            className={`px-4 py-1 rounded-full border text-sm font-semibold capitalize ${getStatusStyle(
              order.status,
            )}`}
          >
            {order.status}
          </span>
        </div>

        {/* CUSTOMER + ADDRESS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* CUSTOMER */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#160059] mb-4 flex items-center gap-2">
              <FaUser /> Customer Info
            </h2>

            <p className="flex items-center gap-2 text-sm text-[#160059]">
              <FaUser /> {order.customername}
            </p>
            <p className="flex items-center gap-2 text-sm text-[#160059]">
              <FaPhone /> {order.phoneno}
            </p>
          </div>

          {/* ADDRESS */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#160059] mb-4 flex items-center gap-2">
              <FaMapMarkerAlt /> Shipping Address
            </h2>

            <p className="text-sm text-[#160059]">
              {order.shippingaddress}, {order.pincode}
            </p>
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-[#160059] mb-4 flex items-center gap-2">
            <FaBoxOpen /> Order Items
          </h2>

          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b text-[#160059]">
                <th className="py-2">Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-2">{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTTOM ACTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex justify-between items-center">
          <p className="text-lg font-bold text-[#160059] flex items-center gap-2">
            <FaRupeeSign /> Grand Total: ₹{order.ordertotal}
          </p>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
              Mark Delivered
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orderdetails;
