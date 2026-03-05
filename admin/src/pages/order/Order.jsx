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
} from "react-icons/fa";
import Card from "./components/Card";
import { orderApis } from "../../apis/order";
import toast from "react-hot-toast"

const Order = () => {
  const [date, setDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");

  // ------------------ STATS ------------------
  const getStats = async () => {
    try {
      const res = await orderApis.stats();
      if (res.success) {
        toast.success(res.message)
        setStats(res.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ ALL ORDERS ------------------
  const getAllOrders = async () => {
    try {
      setOrders([]); // clear old orders

      const res = await orderApis.getAll();

      if (res.success) {
        toast.success(res.message)       
        setOrders(res.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ FILTER STATUS ------------------
  const filterByStatus = async () => {
    try {
      setOrders([]);
      const res = await orderApis.filterByStatus();
      if (res.success) {
        toast.success(res.message)
        setOrders(res.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ FILTER RETURN ------------------
  const filterByReturnStatus = async () => {
    try {
      setOrders([]);
      const res = await orderApis.filterByReturnStatus();
      if (res.success) {
        toast.success(res.message)
        setOrders(res.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ FILTER CANCEL ------------------
  const filterBYCancelStatus = async () => {
    try {
      setOrders([]);
      const res = await orderApis.filterBYCancelStatus();
      if (res.success) {
        toast.success(res.message)
        setOrders(res.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ FILTER DATE ------------------
  const filterByDate = async (selectedDate) => {
    try {
      setOrders([]);
      const res = await orderApis.filterByDate(selectedDate);
      if (res.success) {
        toast.success(res.message)
        setOrders(res.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------ DATE CHANGE ------------------
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    if (selectedDate) {
      filterByDate(selectedDate);
    }
  };

  // ------------------ FILTER HANDLER ------------------
  const handleFilter = (type) => {
    setFilter(type);

    if (type === "all") {
      getAllOrders();
    }

    if (type === "returned") {
      filterByReturnStatus();
    }

    if (type === "canceled") {
      filterBYCancelStatus();
    }
  };

  useEffect(() => {
    getStats();
    getAllOrders();
  }, []);

  return (
    <Layout>
      <div className="p-6 min-h-screen bg-white">
        <h1 className="text-3xl font-bold mb-6 text-[#160059]">
          Order Dashboard
        </h1>

        {/* ---------------- STATS ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <StatCard
            icon={<FaShoppingCart />}
            label="Total"
            value={stats?.totalOrders}
          />

          <StatCard
            icon={<FaTruck />}
            label="Pending"
            value={stats?.pending}
          />

          <StatCard
            icon={<FaCheckCircle />}
            label="Delivered"
            value={stats?.delivered}
          />

          <StatCard
            icon={<FaTimesCircle />}
            label="Canceled"
            value={stats?.canceled}
          />

          <StatCard
            icon={<FaUndoAlt />}
            label="Returned"
            value={stats?.returned}
          />

          <StatCard
            icon={<FaCalendarAlt />}
            label="Last Month"
            value={stats?.lastMonthOrders}
          />
        </div>

        {/* ---------------- FILTER BAR ---------------- */}
        <div
          className="bg-white/70 backdrop-blur-xl border border-gray-200 
        rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between mb-6 gap-4"
        >
          <div className="flex items-center gap-2 text-[#160059]">
            <FaCalendarAlt />

            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-[#160059] outline-none"
            />
          </div>

          <div className="flex gap-3">
            <FilterBtn
              onClick={() => handleFilter("all")}
              icon={<FaList />}
              text="All"
            />

            <FilterBtn
              onClick={() => handleFilter("returned")}
              icon={<FaUndoAlt />}
              text="Returned"
            />

            <FilterBtn
              onClick={() => handleFilter("canceled")}
              icon={<FaTimesCircle />}
              text="Canceled"
            />
          </div>
        </div>

        {/* ---------------- ORDERS ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <Card key={order._id} order={order} />
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