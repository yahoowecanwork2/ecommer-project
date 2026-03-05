import React, { useEffect, useState } from "react";
import { FaBox, FaUser, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { orderApi } from "../../apis/order";

const Orderdetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchOrder = async () => {
    try {
      const res = await orderApi.myOrderSingle(orderId);
      console.log("detail", res);

      if (res.success) {
        setOrder(res.order);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // status
  const cancelOrder = async () => {
    try {
      const res = await orderApi.myOrderStatus(orderId, {
        cancelStatus: "yes",
      });

      if (res.success) {
        alert("Order canceled successfully");

        setOrder(res.order);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center mt-20">Order not found</div>;
  }
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#160059] mb-6">
          Order Details
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-gray-500 text-sm">Order No</p>
            <h3 className="text-xl font-bold text-[#160059]">
              {order?.orderno}
            </h3>

            <p className="text-gray-500 text-sm">
              Date: {new Date(order?.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium
      ${
        order?.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : order?.status === "canceled"
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-700"
      }`}
            >
              {order?.status}
            </span>

            {/* Cancel Button */}
            {order?.status === "pending" && (
              <button
                onClick={cancelOrder}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#160059] rounded-lg shadow hover:bg-red-600 transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>

        <div className="border rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#160059] mb-4 flex items-center gap-2">
            <FaBox /> Items
          </h3>

          <div className="space-y-4">
            {order?.items?.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={item?.productId?.image?.[0]?.url}
                  alt={item?.productId?.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {item?.productId?.name}
                  </h4>

                  <p className="text-gray-500">Qty: {item?.quantity}</p>

                  <p className="text-[#160059] font-bold">
                    ₹{item?.productId?.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-xl p-6 mb-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-[#160059] flex items-center gap-2 mb-3">
              <FaUser /> Customer Info
            </h3>
            <p>
              <b>Name:</b> {order?.customername}
            </p>
            <p>
              <b>Phone:</b> {order?.phoneno}
            </p>
            <p>
              <b>Email:</b> {order?.emailid}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#160059] flex items-center gap-2 mb-3">
              <FaMapMarkerAlt /> Shipping Address
            </h3>
            <p>{order?.shippingaddress}</p>
            <p>Pincode: {order?.pincode}</p>
          </div>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#160059] flex items-center gap-2 mb-3">
            <FaMoneyBillWave /> Payment Info
          </h3>
          <p>
            <b>Payment Type:</b> {order?.paymentType}
          </p>
          <p>
            <b>Payment Status:</b> {order?.paymentstatus}
          </p>
          <p className="text-xl font-bold text-[#160059] mt-2">
            Total: ₹{order?.ordertotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orderdetails;
