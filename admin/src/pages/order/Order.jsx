import React, { useState } from "react";
import Layout from "../../componets/common/Layout";
import {
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaUndoAlt,
  FaCalendarAlt,
  FaList,
} from "react-icons/fa";
import Card from "./components/Card";

const dummyStats = {
  totalOrders: 120,
  lastMonthOrders: 35,
  pending: 20,
  delivered: 60,
  canceled: 10,
  returned: 5,
};

const dummyOrders = [
  {
    id: 1,
    orderno: "ORD123",
    customername: "Rahul Sharma",
    status: "pending",
    ordertotal: "1499",
    createdAt: "2026-02-20",
  },
  {
    id: 2,
    orderno: "ORD124",
    customername: "Neha Yadav",
    status: "delivered",
    ordertotal: "999",
    createdAt: "2026-02-22",
  },
  {
    id: 3,
    orderno: "ORD125",
    customername: "Amit Verma",
    status: "canceled",
    ordertotal: "1999",
    createdAt: "2026-02-25",
  },
];

const Order = () => {
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <Layout>
      <div className="p-6 min-h-screen bg-white">
        <h1 className="text-3xl font-bold mb-6 text-[#160059]">
          Order Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <StatCard
            icon={<FaShoppingCart />}
            label="Total"
            value={dummyStats.totalOrders}
          />
          <StatCard
            icon={<FaTruck />}
            label="Pending"
            value={dummyStats.pending}
          />
          <StatCard
            icon={<FaCheckCircle />}
            label="Delivered"
            value={dummyStats.delivered}
          />
          <StatCard
            icon={<FaTimesCircle />}
            label="Canceled"
            value={dummyStats.canceled}
          />
          <StatCard
            icon={<FaUndoAlt />}
            label="Returned"
            value={dummyStats.returned}
          />
          <StatCard
            icon={<FaCalendarAlt />}
            label="Last Month"
            value={dummyStats.lastMonthOrders}
          />
        </div>

        <div
          className="bg-white/70 backdrop-blur-xl border border-gray-200 
        rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between mb-6 gap-4"
        >
          <div className="flex items-center gap-2 text-[#160059]">
            <FaCalendarAlt />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-[#160059] outline-none"
            />
          </div>

          <div className="flex gap-3">
            <FilterBtn
              onClick={() => setFilter("all")}
              icon={<FaList />}
              text="All"
            />
            <FilterBtn
              onClick={() => setFilter("returned")}
              icon={<FaUndoAlt />}
              text="Returned"
            />
            <FilterBtn
              onClick={() => setFilter("canceled")}
              icon={<FaTimesCircle />}
              text="Canceled"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyOrders.map((order) => (
            <Card key={order.id} order={order} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const FilterBtn = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-xl 
      bg-[#160059] text-white hover:bg-[#1f007a] transition shadow-md"
    >
      {icon} {text}
    </button>
  );
};

const StatCard = ({ icon, label, value }) => {
  return (
    <div
      className="bg-white/70 backdrop-blur-xl border border-gray-200 
    rounded-2xl p-4 shadow-lg flex flex-col items-center text-[#160059]"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="text-sm opacity-80">{label}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default Order;
