import React, { useState, useEffect } from "react";
import Layout from "../../componets/common/Layout";
import {
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaUndoAlt,
  FaCalendarAlt,
  FaList,
  FaEye,
} from "react-icons/fa";
import Card from "./components/Card";
import { orderApis } from "../../apis/order";
import toast from "react-hot-toast";

const Order = () => {
  const [date, setDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");

  // --- Logic remains exactly as provided ---
  const getStats = async () => {
    try {
      const res = await orderApis.stats();
      if (res.success) {
        toast.success(res.message);
        setStats(res.stats);
      }
    } catch (error) { console.log(error); }
  };

  const getAllOrders = async () => {
    try {
      setOrders([]);
      const res = await orderApis.getAll();
      if (res.success) {
        toast.success(res.message);
        setOrders(res.orders);
      }
    } catch (error) { console.log(error); }
  };

  const filterByStatus = async () => {
    try {
      setOrders([]);
      const res = await orderApis.filterByStatus();
      if (res.success) {
        toast.success(res.message);
        setOrders(res.orders);
      }
    } catch (error) { console.log(error); }
  };

  const filterByReturnStatus = async () => {
    try {
      setOrders([]);
      const res = await orderApis.filterByReturnStatus();
      if (res.success) {
        toast.success(res.message);
        setOrders(res.orders);
      }
    } catch (error) { console.log(error); }
  };

  const filterBYCancelStatus = async () => {
    try {
      setOrders([]);
      const res = await orderApis.filterBYCancelStatus();
      if (res.success) {
        toast.success(res.message);
        setOrders(res.orders);
      }
    } catch (error) { console.log(error); }
  };

  const filterByDate = async (selectedDate) => {
    try {
      setOrders([]);
      const res = await orderApis.filterByDate(selectedDate);
      if (res.success) {
        toast.success(res.message);
        setOrders(res.orders);
      }
    } catch (error) { console.log(error); }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (selectedDate) filterByDate(selectedDate);
  };

  const handleFilter = (type) => {
    setFilter(type);
    if (type === "all") getAllOrders();
    if (type === "returned") filterByReturnStatus();
    if (type === "canceled") filterBYCancelStatus();
  };

  useEffect(() => {
    getStats();
    getAllOrders();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Order Dashboard
          </h1>
          <p className="text-[11px] text-gray-500 font-medium uppercase tracking-widest mt-1">
            Manage transactions and fulfillment
          </p>
        </div>

        {/* ---------------- STATS GRID (Revamped) ---------------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-200 border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <StatCard icon={<FaShoppingCart />} label="Total" value={stats?.totalOrders} />
          <StatCard icon={<FaTruck />} label="Pending" value={stats?.pending} />
          <StatCard icon={<FaCheckCircle />} label="Delivered" value={stats?.delivered} />
          <StatCard icon={<FaTimesCircle />} label="Canceled" value={stats?.canceled} />
          <StatCard icon={<FaUndoAlt />} label="Returned" value={stats?.returned} />
          <StatCard icon={<FaCalendarAlt />} label="Last Month" value={stats?.lastMonthOrders} />
        </div>

        {/* ---------------- FILTER BAR (Revamped) ---------------- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-sm bg-gray-50 focus:bg-white outline-none font-bold text-gray-700"
              />
            </div>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-sm gap-1">
            <FilterBtn active={filter === "all"} onClick={() => handleFilter("all")} icon={<FaList />} text="All" />
            <FilterBtn active={filter === "returned"} onClick={() => handleFilter("returned")} icon={<FaUndoAlt />} text="Returned" />
            <FilterBtn active={filter === "canceled"} onClick={() => handleFilter("canceled")} icon={<FaTimesCircle />} text="Canceled" />
          </div>
        </div>

        {/* ---------------- ORDERS TABLE (The Revamp) ---------------- */}
        <div className="border border-gray-200 rounded-sm bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <Card key={order._id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// --- Updated Sub-components ---

const FilterBtn = ({ icon, text, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm ${
      active 
        ? "bg-white text-gray-900 shadow-sm" 
        : "text-gray-500 hover:text-gray-900"
    }`}
  >
    {icon} {text}
  </button>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 flex flex-col items-center text-center group">
    <div className="text-gray-400 text-lg mb-1 group-hover:text-gray-900 transition-colors">
      {icon}
    </div>
    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
      {label}
    </h3>
    <p className="text-lg font-black text-gray-900 leading-none">
      {value || 0}
    </p>
  </div>
);

export default Order;