import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/order-detail/${order._id}`)}
      className="group bg-white border border-gray-100 rounded-xl p-5 mb-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-[#c9a07a]/20 transition-all duration-500 cursor-pointer"
    >
      <div className="flex items-center justify-between gap-6">
        
        {/* LEFT: ICON + ORDER INFO */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          {/* Subtle Order Icon - Changed to Theme Gold */}
          <div className="hidden sm:flex w-12 h-12 rounded-full bg-gray-50 items-center justify-center text-[#c9a07a]/40 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all duration-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>

          <div className="space-y-1 truncate">
            <h3 className="text-[14px] font-bold text-[#1a1a1a] tracking-tight group-hover:text-[#c9a07a] transition-colors">
              Order #{order?.orderno}
            </h3>
            <p className="text-[11px] text-gray-400 font-serif italic">
              {order?.items?.map((item) => item.name).join(", ")}
            </p>
          </div>
        </div>

        {/* CENTER: DATE & STATUS (Desktop Only) */}
        <div className="hidden md:flex flex-col items-center gap-1 w-32">
           <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
            order.status === "delivered" ? "bg-emerald-50 text-emerald-600" : "bg-[#fdfaf7] text-[#c9a07a]"
          }`}>
            {order?.status}
          </span>
          <p className="text-[10px] text-gray-300 font-medium tracking-tighter">
            {new Date(order?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* RIGHT: PRICE & ARROW */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-0.5">Total</p>
            <p className="text-[15px] font-bold text-[#1a1a1a]">₹{order?.ordertotal}</p>
          </div>
          <div className="text-gray-200 group-hover:text-[#c9a07a] group-hover:translate-x-1 transition-all duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;