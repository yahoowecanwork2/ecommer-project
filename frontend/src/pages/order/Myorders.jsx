import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { orderApi } from "../../apis/order";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderApi.myOrder();
      if (res.success) setOrders(res.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-sm text-gray-400">
        Loading Orders...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-[#3D2B3D]">
      <Header />

      <main className="max-w-5xl mx-auto pt-26 pb-20 px-6">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-serif italic">My Orders</h1>
            <p className="text-xs text-gray-400 mt-1">
              View and track all your purchases
            </p>
          </div>

          <span className="text-xs bg-white border px-4 py-2 rounded-full text-gray-500">
            {orders.length} Orders
          </span>
        </div>

        {/* Orders List */}
        {orders?.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className=" p-"
              >
                <Card order={order} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-xl border border-gray-100">
            <p className="text-gray-400 text-sm italic">
              You haven't placed any orders yet.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Myorders;