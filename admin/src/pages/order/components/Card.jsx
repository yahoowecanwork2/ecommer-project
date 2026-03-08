import React from "react";
import { FaUser, FaRupeeSign, FaClock, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = ({ order }) => {
  const navigate = useNavigate();

  // Helper to style the status badge based on your data
  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "delivered") return "bg-green-50 text-green-700 border-green-100";
    if (s === "canceled") return "bg-red-50 text-red-700 border-red-100";
    if (s === "returned") return "bg-blue-50 text-blue-700 border-blue-100";
    return "bg-orange-50 text-orange-700 border-orange-100"; // Pending/Default
  };

  return (
    <tr
      onClick={() => navigate(`/order-detail/${order._id}`)}
      className="group cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
    >
      {/* ORDER NUMBER */}
      <td className="px-6 py-4">
        <p className="text-xs font-bold text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
          #{order?.orderno || "N/A"}
        </p>
      </td>

      {/* CUSTOMER NAME */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
          <FaUser className="text-gray-300 text-[10px]" />
          {order?.customername || "Guest Customer"}
        </div>
      </td>

      {/* TOTAL AMOUNT */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
          <FaRupeeSign className="text-[10px]" />
          {order?.ordertotal || 0}
        </div>
      </td>

      {/* DATE/TIME */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <FaClock className="text-gray-300 text-[10px]" />
          {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
        </div>
      </td>

      {/* STATUS BADGE */}
      <td className="px-6 py-4">
        <span className={`inline-block px-2 py-0.5 rounded-sm border text-[9px] font-bold uppercase tracking-widest ${getStatusColor(order?.status)}`}>
          {order?.status || "Pending"}
        </span>
      </td>

      {/* ACTION ICON */}
      <td className="px-6 py-4 text-right">
        <FaArrowRight 
          size={12} 
          className="inline-block text-gray-300 group-hover:text-gray-900 transition-transform group-hover:translate-x-1" 
        />
      </td>
    </tr>
  );
};

export default Card;