import React from "react";
import { FaBox, FaUser, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

const dummyOrder = {
  orderno: "ORD789456",
  createdAt: "28 Feb 2026",
  status: "Delivered",
  paymentType: "cod",
  paymentstatus: "complete",
  customername: "Neha Yadav",
  phoneno: "9311836217",
  emailid: "neha@gmail.com",
  shippingaddress: "Sector 14, Gurugram, Haryana",
  pincode: "122001",
  ordertotal: "2499",
  items: [
    {
      name: "Blue Cotton T-Shirt",
      quantity: 2,
      price: 799,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Black Shoes",
      quantity: 1,
      price: 899,
      image: "https://via.placeholder.com/150",
    },
  ],
};

const Orderdetails = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#160059] mb-6">
          Order Details
        </h2>

        <div className="border rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <p className="text-gray-500 text-sm">Order No</p>
              <h3 className="text-xl font-bold text-[#160059]">
                {dummyOrder.orderno}
              </h3>
              <p className="text-gray-500">Date: {dummyOrder.createdAt}</p>
            </div>

            <div>
              <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                {dummyOrder.status}
              </span>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#160059] mb-4 flex items-center gap-2">
            <FaBox /> Items
          </h3>

          <div className="space-y-4">
            {dummyOrder.items.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-[#160059] font-bold">₹{item.price}</p>
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
              <b>Name:</b> {dummyOrder.customername}
            </p>
            <p>
              <b>Phone:</b> {dummyOrder.phoneno}
            </p>
            <p>
              <b>Email:</b> {dummyOrder.emailid}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#160059] flex items-center gap-2 mb-3">
              <FaMapMarkerAlt /> Shipping Address
            </h3>
            <p>{dummyOrder.shippingaddress}</p>
            <p>Pincode: {dummyOrder.pincode}</p>
          </div>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#160059] flex items-center gap-2 mb-3">
            <FaMoneyBillWave /> Payment Info
          </h3>
          <p>
            <b>Payment Type:</b> {dummyOrder.paymentType}
          </p>
          <p>
            <b>Payment Status:</b> {dummyOrder.paymentstatus}
          </p>
          <p className="text-xl font-bold text-[#160059] mt-2">
            Total: ₹{dummyOrder.ordertotal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orderdetails;
