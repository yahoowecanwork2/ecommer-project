import React from "react";
import { FaTruck, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/order-detail/${order?._id}`)}
      className="bg-white rounded-2xl shadow-md p-6 border border-[#160059]/20 hover:shadow-xl transition cursor-pointer"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#160059]">
            Order ID: {order?.orderno}
          </h3>

          <p className="text-gray-500 text-sm">
            Order Date: {new Date(order?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {order.status === "delivered" ? (
            <FaCheckCircle className="text-green-600" />
          ) : (
            <FaTruck className="text-blue-600" />
          )}

          <span className="font-semibold text-gray-700 capitalize">
            {order?.status}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-[#160059] mb-2">Items</h4>

        <ul className="space-y-1">
          {order?.items?.map((item, index) => (
            <li key={index} className="flex justify-between text-gray-600">
              <span>{item?.name}</span>
              <span>Qty: {item?.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <p className="text-gray-600">
          <span className="font-semibold">Delivery Address:</span>{" "}
          {order?.shippingaddress} - {order?.pincode}
        </p>

        <p className="text-lg font-bold text-[#160059]">₹{order?.ordertotal}</p>
      </div>

      <div className="mt-5 flex gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/order-detail/${order?._id}`);
          }}
          className="px-5 py-2 bg-[#160059] text-white rounded-lg hover:opacity-90 transition"
        >
          View Details
        </button>

        <button
          onClick={(e) => e.stopPropagation()}
          className="px-5 py-2 border border-[#160059] text-[#160059] rounded-lg hover:bg-[#160059] hover:text-white transition"
        >
          Track Order
        </button>
      </div>
    </div>
  );
};

export default Card;
