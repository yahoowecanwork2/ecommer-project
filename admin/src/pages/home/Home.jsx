import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from "react-icons/hi2";
import {
  BsCartCheck,
  BsCurrencyDollar,
  BsPeople,
  BsBoxSeam,
} from "react-icons/bs";
import Layout from "../../componets/common/Layout";
import { motion } from "framer-motion";
import { Lock, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react"; // Using Lucide as a standard
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userApi } from "../../apis/user";

const Home = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);
  const stats = [
    {
      id: 1,
      name: "Total Revenue",
      value: `₹${statsData?.revenueStats?.[0]?.totalRevenue || 0}`,
      change: "+12.5%",
      trendingUp: true,
      icon: BsCurrencyDollar,
    },
    {
      id: 2,
      name: "Orders",
      value: statsData?.revenueStats?.[0]?.totalOrders || 0,
      change: "+8.2%",
      trendingUp: true,
      icon: BsCartCheck,
    },
    {
      id: 3,
      name: "Active Customers",
      value: statsData?.activeUsers?.[0]?.activeUsers || 0,
      change: "-2.4%",
      trendingUp: false,
      icon: BsPeople,
    },
    {
      id: 4,
      name: "Products Sold",
      value: statsData?.productStats?.[0]?.totalProducts || 0,
      change: "+14.1%",
      trendingUp: true,
      icon: BsBoxSeam,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-7732",
      customer: "Liam Johnson",
      status: "Paid",
      amount: "$125.00",
      date: "2 mins ago",
    },
    {
      id: "#ORD-7731",
      customer: "Olivia Smith",
      status: "Pending",
      amount: "$84.20",
      date: "15 mins ago",
    },
    {
      id: "#ORD-7730",
      customer: "Noah Williams",
      status: "Paid",
      amount: "$210.00",
      date: "1 hour ago",
    },
    {
      id: "#ORD-7729",
      customer: "Emma Brown",
      status: "Shipped",
      amount: "$45.00",
      date: "3 hours ago",
    },
  ];
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await userApi.allStats();
        console.log("total stats", stats);

        setStatsData(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);
  return (
    <Layout>
      {/*This section is visible when subscription ends*/}
      <motion.div className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs z-30 flex items-center justify-center font-google">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200 max-w-sm w-full rounded-sm shadow-2xl relative overflow-hidden"
        >
          {/* CONTENT */}
          <div className="p-10 text-center relative">
            {/* Precision Loading Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-50 overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1/2 h-full bg-slate-900"
              />
            </div>

            {/* Subscription Status with Icon */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
              <p className="text-[11px] uppercase font-bold text-red-500 tracking-widest">
                SUBSCRIPTION ENDED
              </p>
            </div>

            <h1 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">
              Access <span className="font-semibold text-black">Paused</span>
            </h1>

            <p className="text-xs text-slate-500 mb-8 leading-relaxed px-2">
              Your subscription has ended, Renew now to keep accessing your
              dashboard and features.
            </p>

            {/* Button with Arrow Icon */}
            <motion.button
              onClick={() => navigate("/plans")}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="group w-full bg-slate-900 text-white rounded-sm text-xs uppercase tracking-widest font-bold py-5 flex items-center justify-center gap-2 transition-colors hover:bg-black"
            >
              <span>Renew Subscription</span>
              <motion.div
                variants={{
                  hover: { x: 5 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>

            {/* Subtle Activity Indicator */}
            <div className="flex justify-center items-center mt-8 gap-3">
              <div className="flex items-center gap-1.5 opacity-40">
                <ShieldCheck className="w-3 h-3 text-slate-900" />
                <p className="text-[9px] uppercase tracking-widest font-bold text-slate-600">
                  Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      {/*Ends here*/}

      <div className="space-y-6 relative z-10">
        {/* SECTION HEADER */}
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">Executive Summary</h2>
          <p className="text-xs text-gray-500">
            Real-time performance metrics for your store.
          </p>
        </div>

        {/* 1. STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-sm overflow-hidden">
          {stats.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                  {item.name}
                </p>
                <item.icon className="text-gray-300" size={18} />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  {item.value}
                </h3>
                <div
                  className={`mt-1 inline-flex items-center text-xs font-medium ${item.trendingUp ? "text-green-600" : "text-red-600"}`}
                >
                  {item.trendingUp ? (
                    <HiOutlineArrowTrendingUp className="mr-1" />
                  ) : (
                    <HiOutlineArrowTrendingDown className="mr-1" />
                  )}
                  {item.change}
                  <span className="text-gray-400 ml-1 font-normal text-[10px]">
                    vs last month
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-full gap-6">
          {/* 2. ANALYTICS CHART BOX */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-sm">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Revenue Forecast
              </h3>
              <select className="text-[11px] font-semibold border border-gray-200 rounded-sm bg-gray-50 px-2 py-1 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="p-4">
              <div className="h-48 w-full bg-gray-50 flex items-end justify-between px-2 pb-1 gap-1">
                {[30, 50, 40, 80, 55, 70, 90, 60, 85, 40, 75, 95].map(
                  (height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className="w-full bg-gray-900 opacity-10 hover:opacity-100 transition-opacity"
                    />
                  ),
                )}
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[10px] text-gray-400 font-medium">
                  01 Mar
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  12 Mar
                </span>
              </div>
            </div>
          </div>

          {/* 3. RECENT ORDERS TABLE */}
          {/* <div className="bg-white border border-gray-200 rounded-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Recent Transactions</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-gray-900">{order.customer}</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                      {order.id} • {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">{order.amount}</p>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm border ${
                      order.status === "Paid" ? "bg-green-50 border-green-200 text-green-700" : 
                      order.status === "Pending" ? "bg-orange-50 border-orange-200 text-orange-700" : 
                      "bg-blue-50 border-blue-200 text-blue-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 text-[11px] font-bold text-gray-400 hover:text-gray-900 border-t border-gray-100 uppercase tracking-widest transition">
              View Activity Log
            </button>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
