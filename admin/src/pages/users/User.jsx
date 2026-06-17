import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import Card from "./component/Card";
import { userApi } from "../../apis/user";

const User = () => {
  const[users , setUsers] = useState([])
  // const users = [
  //   {
  //     id: 1,
  //     name: "Rahul Sharma",
  //     email: "rahul@gmail.com",
  //     phone: "+91 9876543210",
  //     image: "https://i.pravatar.cc/150?img=1",
  //     status: "Active",
  //     totalOrders: 12,
  //     totalSpent: 25999,
  //     joinedAt: "2025-01-12",
  //   },
  //   {
  //     id: 2,
  //     name: "Priya Verma",
  //     email: "priya@gmail.com",
  //     phone: "+91 9876543211",
  //     image: "https://i.pravatar.cc/150?img=2",
  //     status: "Active",
  //     totalOrders: 5,
  //     totalSpent: 8999,
  //     joinedAt: "2025-02-20",
  //   },
  //   {
  //     id: 3,
  //     name: "Amit Kumar",
  //     email: "amit@gmail.com",
  //     phone: "+91 9876543212",
  //     image: "https://i.pravatar.cc/150?img=3",
  //     status: "Blocked",
  //     totalOrders: 2,
  //     totalSpent: 1999,
  //     joinedAt: "2025-03-15",
  //   },
  //   {
  //     id: 4,
  //     name: "Sneha Gupta",
  //     email: "sneha@gmail.com",
  //     phone: "+91 9876543213",
  //     image: "https://i.pravatar.cc/150?img=4",
  //     status: "Active",
  //     totalOrders: 18,
  //     totalSpent: 45999,
  //     joinedAt: "2025-04-01",
  //   },
  //   {
  //     id: 5,
  //     name: "Karan Singh",
  //     email: "karan@gmail.com",
  //     phone: "+91 9876543214",
  //     image: "https://i.pravatar.cc/150?img=5",
  //     status: "Inactive",
  //     totalOrders: 3,
  //     totalSpent: 4999,
  //     joinedAt: "2025-04-25",
  //   },
  //   {
  //     id: 6,
  //     name: "Neha Joshi",
  //     email: "neha@gmail.com",
  //     phone: "+91 9876543215",
  //     image: "https://i.pravatar.cc/150?img=6",
  //     status: "Active",
  //     totalOrders: 9,
  //     totalSpent: 17999,
  //     joinedAt: "2025-05-10",
  //   },
  //   {
  //     id: 7,
  //     name: "Arjun Mehta",
  //     email: "arjun@gmail.com",
  //     phone: "+91 9876543216",
  //     image: "https://i.pravatar.cc/150?img=7",
  //     status: "Active",
  //     totalOrders: 15,
  //     totalSpent: 32999,
  //     joinedAt: "2025-05-18",
  //   },
  //   {
  //     id: 8,
  //     name: "Pooja Sharma",
  //     email: "pooja@gmail.com",
  //     phone: "+91 9876543217",
  //     image: "https://i.pravatar.cc/150?img=8",
  //     status: "Blocked",
  //     totalOrders: 1,
  //     totalSpent: 999,
  //     joinedAt: "2025-05-22",
  //   },
  //   {
  //     id: 9,
  //     name: "Rohit Yadav",
  //     email: "rohit@gmail.com",
  //     phone: "+91 9876543218",
  //     image: "https://i.pravatar.cc/150?img=9",
  //     status: "Active",
  //     totalOrders: 7,
  //     totalSpent: 12999,
  //     joinedAt: "2025-06-01",
  //   },
  //   {
  //     id: 10,
  //     name: "Anjali Mishra",
  //     email: "anjali@gmail.com",
  //     phone: "+91 9876543219",
  //     image: "https://i.pravatar.cc/150?img=10",
  //     status: "Active",
  //     totalOrders: 11,
  //     totalSpent: 21999,
  //     joinedAt: "2025-06-05",
  //   },
  //   {
  //     id: 11,
  //     name: "Vikas Chauhan",
  //     email: "vikas@gmail.com",
  //     phone: "+91 9876543220",
  //     image: "https://i.pravatar.cc/150?img=11",
  //     status: "Inactive",
  //     totalOrders: 4,
  //     totalSpent: 6999,
  //     joinedAt: "2025-06-08",
  //   },
  //   {
  //     id: 12,
  //     name: "Simran Kaur",
  //     email: "simran@gmail.com",
  //     phone: "+91 9876543221",
  //     image: "https://i.pravatar.cc/150?img=12",
  //     status: "Active",
  //     totalOrders: 20,
  //     totalSpent: 55999,
  //     joinedAt: "2025-06-10",
  //   },
  //   {
  //     id: 13,
  //     name: "Mohit Agarwal",
  //     email: "mohit@gmail.com",
  //     phone: "+91 9876543222",
  //     image: "https://i.pravatar.cc/150?img=13",
  //     status: "Active",
  //     totalOrders: 8,
  //     totalSpent: 14999,
  //     joinedAt: "2025-06-11",
  //   },
  //   {
  //     id: 14,
  //     name: "Riya Saxena",
  //     email: "riya@gmail.com",
  //     phone: "+91 9876543223",
  //     image: "https://i.pravatar.cc/150?img=14",
  //     status: "Blocked",
  //     totalOrders: 0,
  //     totalSpent: 0,
  //     joinedAt: "2025-06-12",
  //   },
  //   {
  //     id: 15,
  //     name: "Aditya Verma",
  //     email: "aditya@gmail.com",
  //     phone: "+91 9876543224",
  //     image: "https://i.pravatar.cc/150?img=15",
  //     status: "Active",
  //     totalOrders: 14,
  //     totalSpent: 28999,
  //     joinedAt: "2025-06-13",
  //   },
  // ];

  const fetchUser = async()=>{
    try{
      const res = await userApi.all();
      console.log("all users", res);
      
        setUsers(res.data)
    } catch(error){
      console.log("Error is ",error);
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <Layout>
      <div className="flex flex-col gap-5 mx-2 ">
        <div className="flex w-full justify-between">
          {/* Title & Total user  */}
          <div className="flex flex-col w-1/2 ">
            <h1 className="text-2xl font-bold text-[#111111] uppercase ">Users Management</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium " >Manage,search , and connect with your registered users </p>
          </div>

          <div className="w-1/2  flex justify-end ">
            <div className="flex flex-col w-[200px] px-3 py-2 border-2 border-gray-300  z-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#006EFF] transition-colors duration-300">
                  Total Users
                </span>
                <span className="text-3xl font-extrabold text-[#111111] tracking-tight mt-1 tabular-nums">
                  45
                </span>
              </div>
          </div> 
        </div>
        {/* Search bar and Buttons */}
        <div className="flex mt-5">
          <div className="flex w-1/2">
            <input
            type="text"
            className="block w-2/3 rounded-none outline-none  border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm font-medium"
            placeholder="Search User..."
          />
          <button className="border px-2 py-1 bg-[#006EFF] text-white font-semibold" >Search</button>
          </div>
          <div>
            <button className="border px-3 py-2">Recent</button>
          </div>
        </div>
        {/* User Cards */}
        <div className="mt-3">
           <div className="h-full w-full">
                <table className=" h-full w-full border-collapse bg-white table-auto">
                  {/* Table Header Row: Renders exactly 1 time */}
                  <thead className="bg-gray-300 border-b border-gray-200">
                    <tr className="text-sm font-semibold text-[#333333]">
                      <th className="px-3 py-3 text-center font-semibold tracking-tight">
                        User ID
                      </th>
                      <th className="px-3 py-3 text-start font-semibold tracking-tight">
                        Full Name
                      </th>
                      <th className="px-3 py-3 text-center font-semibold tracking-tight">
                        Email
                      </th>
                      <th className="px-3 py-3 text-center font-semibold tracking-tight">
                        Phone Number
                      </th>
                      <th className="px-3 py-3 text-center font-semibold tracking-tight">
                        Status
                      </th>
                      <th className="px-3 py-3 text-center font-semibold tracking-tight">
                        Date Created
                      </th>
                      {/* <th className="px-3 py-3 text-center font-semibold tracking-tight">
                        Status
                      </th> */}
                      <th className="px-3 py-3 text-center font-semibold tracking-tight">
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body rows mapping cleanly */}
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <Card key={user._id} user={user} id={user._id} />
                    ))}
                  </tbody>
                </table>
              </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
