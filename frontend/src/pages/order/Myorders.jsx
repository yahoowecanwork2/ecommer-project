import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { orderApi } from "../../apis/order";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderApi.myOrder();
      console.log("my-order", res);

      if (res.success) {
        setOrders(res.orders);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading Orders...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#160059] mb-8">My Orders</h2>

        <div className="space-y-6">
          {orders?.length > 0 ? (
            orders?.map((order) => <Card key={order._id} order={order} />)
          ) : (
            <div className="text-gray-500 text-center">No Orders Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myorders;
