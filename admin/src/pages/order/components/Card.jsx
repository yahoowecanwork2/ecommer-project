import React from "react";
import { FaUser, FaRupeeSign, FaClock } from "react-icons/fa";

const Card = ({ order }) => {
  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-all">
      <h2 className="text-lg font-semibold mb-2">Order: {order.orderno}</h2>

      <p className="flex items-center gap-2 text-sm">
        <FaUser /> {order.customername}
      </p>

      <p className="flex items-center gap-2 text-sm">
        <FaRupeeSign /> {order.ordertotal}
      </p>

      <p className="flex items-center gap-2 text-sm">
        <FaClock /> {order.createdAt}
      </p>

      <span
        className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold
          ${order.status === "pending" && "bg-yellow-200 text-yellow-800"}
          ${order.status === "delivered" && "bg-green-200 text-green-800"}
          ${order.status === "canceled" && "bg-red-200 text-red-800"}
        `}
      >
        {order.status}
      </span>
    </div>
  );
};

export default Card;
