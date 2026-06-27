import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import { orderApis } from "../../apis/order";
import Create from "./modal/Create";
import Cards from "../product/components/Cards";
import Card from "./components/Card";

const Order = () => {
  const orders = [
    {
      orderno: "ORD1001",
      customername: "Rahul Sharma",
      phoneno: "9876543210",
      Date: "26 august 2019",
      emailid: "rahul@gmail.com",
      shippingaddress: "Sector 62, Noida",
      pincode: "201301",
      alternateno: "9876543211",
      calculatedamount: 2499,
      discount: 200,
      ordertotal: 2299,
      paymentType: "cod",
      paymentstatus: "pending",
      status: "processing",
      items: [
        {
          name: "Men's Shirt",
          imageurl:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
          quantity: 2,
          size: "M",
          price: 999,
        },
      ],
    },

    {
      orderno: "ORD1002",
      customername: "Priya Verma",
      phoneno: "9123456789",
      Date: "19 march 2026",
      emailid: "priya@gmail.com",
      shippingaddress: "Raj Nagar, Ghaziabad",
      pincode: "201002",
      calculatedamount: 1899,
      discount: 100,
      ordertotal: 1799,
      paymentType: "online",
      paymentstatus: "complete",
      status: "dispatched",
      items: [
        {
          name: "Women's Kurti",
          imageurl:
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400",
          quantity: 1,
          size: "L",
          price: 1899,
        },
      ],
    },

    {
      orderno: "ORD1003",
      customername: "Amit Singh",
      phoneno: "9988776655",
      Date: "01 january 2026",
      emailid: "amit@gmail.com",
      shippingaddress: "Indirapuram, Ghaziabad",
      pincode: "201014",
      calculatedamount: 3499,
      discount: 500,
      ordertotal: 2999,
      paymentType: "online",
      paymentstatus: "complete",
      status: "delivered",
      delivereddate: "2026-06-20",
      items: [
        {
          name: "Sneakers",
          imageurl:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
          quantity: 1,
          size: "9",
          price: 3499,
        },
      ],
    },

    {
      orderno: "ORD1004",
      customername: "Neha Joshi",
      phoneno: "9812345678",
      Date: "12 april 2026",
      emailid: "neha@gmail.com",
      shippingaddress: "Kotdwara, Uttarakhand",
      pincode: "246149",
      calculatedamount: 999,
      discount: 0,
      ordertotal: 999,
      paymentType: "cod",
      paymentstatus: "pending",
      status: "pending",
      items: [
        {
          name: "Cotton T-Shirt",
          imageurl:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
          quantity: 1,
          size: "S",
          price: 999,
        },
      ],
    },

    {
      orderno: "ORD1005",
      customername: "Rohit Kumar",
      phoneno: "9765432109",
      Date: "19 march 2025",
      emailid: "rohit@gmail.com",
      shippingaddress: "Dehradun, Uttarakhand",
      pincode: "248001",
      calculatedamount: 4200,
      discount: 300,
      ordertotal: 3900,
      paymentType: "online",
      paymentstatus: "complete",
      status: "intransit",
      items: [
        {
          name: "Denim Jacket",
          imageurl:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
          quantity: 1,
          size: "XL",
          price: 4200,
        },
      ],
    },

    {
      orderno: "ORD1006",
      customername: "Anjali Rawat",
      phoneno: "9871203456",
      Date: "10 april 2026",
      emailid: "anjali@gmail.com",
      shippingaddress: "Haridwar, Uttarakhand",
      pincode: "249401",
      calculatedamount: 1599,
      discount: 100,
      ordertotal: 1499,
      paymentType: "cod",
      paymentstatus: "pending",
      status: "canceled",
      cancelStatus: "yes",
      items: [
        {
          name: "Women's Top",
          imageurl:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
          quantity: 1,
          size: "M",
          price: 1599,
        },
      ],
    },
  ];

  const [order, setorder] = useState([]);
  const [open, setopen] = useState(false);

  const fetchorder = async () => {
    try {
      const res = await orderApis.getAll();
      console.log("Data is", res);
      setorder(res.orders);
    } catch (error) {
      console.log("Error is", error);
    }
  };

  useEffect(() => {
    fetchorder();
  }, []);

  return (
    <Layout>
      <div>
        <div className="flex w-full justify-between">
          {/* Title & Total user  */}
          <div className="flex flex-col w-1/2 ">
            <h1 className="text-2xl font-bold text-[#111111] uppercase ">
              Order Management
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium ">
              Create, track and manage all customer orders from one place.{" "}
            </p>
          </div>

          <div className="w-1/2  flex justify-end ">
            <div className="flex flex-col w-[200px] px-3 py-2 border-2 border-gray-300  z-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#006EFF] transition-colors duration-300">
                Total Orders
              </span>
              <span className="text-3xl font-extrabold text-[#111111] tracking-tight mt-1 tabular-nums">
                {orders.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex mt-5">
          <div className="flex w-1/2">
            <input
              type="text"
              className="block w-2/3 rounded-none outline-none  border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm font-medium"
              placeholder="Search orders..."
            />
            <button className="border px-2 py-1 bg-[#006EFF] text-white font-semibold">
              Search
            </button>
          </div>
          <div>
            <button
              onClick={() => setopen(true)}
              className="border border-gray-300 px-3 py-2 bg-[#006EFF] text-white font-semibold cursor-pointer  "
            >
              Create order
            </button>
          </div>
          {open && (
            <Create fetchorder={fetchorder} closemodal={() => setopen(false)} />
          )}
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-4  gap-5">
          {currentProducts?.map((product) => (
            <Cards
              key={product?._id}
              product={product}
              fetchproduct={fetchproduct}
            />
          ))}
        </div> */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2  gap-10 mt-6">
          {orders.map((order) => (
            <Card key={order.orderno} value={order} orders={orders} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
