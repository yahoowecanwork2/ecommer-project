import React from "react";
import { FaUser, FaRupeeSign, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/order-detail/${order._id}`)}
      className="bg-white/70 backdrop-blur-xl border border-gray-200 
    rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-all text-[#160059]"
    >
      <h2 className="text-lg font-semibold mb-2">Order: {order.orderno}</h2>

      <p className="flex items-center gap-2 text-sm">
        <FaUser className="text-[#160059]" /> {order.customername}
      </p>

      <p className="flex items-center gap-2 text-sm">
        <FaRupeeSign className="text-[#160059]" /> {order.ordertotal}
      </p>

      <p className="flex items-center gap-2 text-sm">
        <FaClock className="text-[#160059]" /> {order.createdAt}
      </p>

      <span
        className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold 
      bg-[#160059]/10 text-[#160059]"
      >
        {order.status}
      </span>
    </div>
  );
};

export default Card;
