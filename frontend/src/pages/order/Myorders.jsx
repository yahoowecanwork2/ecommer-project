import React from "react";
import Card from "./components/Card";

const dummyOrders = [
  {
    id: "ORD12345",
    date: "20 Feb 2026",
    status: "Delivered",
    total: 2499,
    items: [
      { name: "Blue Cotton T-Shirt", qty: 2 },
      { name: "Black Shoes", qty: 1 },
    ],
    address: "Gurugram, Haryana - 122001",
  },
  {
    id: "ORD12346",
    date: "25 Feb 2026",
    status: "In Transit",
    total: 1599,
    items: [{ name: "Wireless Headphones", qty: 1 }],
    address: "Delhi - 110045",
  },
];

const Myorders = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#160059] mb-8">My Orders</h2>

        <div className="space-y-6">
          {dummyOrders.map((order) => (
            <Card key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Myorders;
