import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import { useLocation, useParams } from "react-router-dom";
import { userApi } from "../../apis/user";

const Userdetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const user = location.state?.user;

  const[users,Setusers] = useState(null)


  const fetchSingleUser = async()=>{
   try{
     const res = await userApi.getSingleUser(id)

    console.log("API Response:", res);
    console.log("Response Data:", res.data);

    Setusers(res.data)
   }  catch(error){
    console.log("Error is",error);
   }
  }

  useEffect(() => {
    console.log("user is " ,users);
    
    
      fetchSingleUser();
  
  }, [id]);

  return (
    <Layout>
      <div>
        <div className="flex w-full justify-between">
          {/* Title & Total user  */}
          <div className="flex flex-col w-1/2 ">
            <h1 className="text-2xl font-bold text-[#111111] uppercase ">
              Users Detail
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium "> </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-gray-100 mb-4 bg-gray-50/40 p-5 rounded-lg border border-gray-100">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative">
              <span className="text-lg font-bold text-gray-500 uppercase tracking-wider"></span>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight"></h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit mx-auto sm:mx-0">
                  {users?.status}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500 select-all">
                {users?.email}
              </p>
              <p className="text-xs text-gray-400 font-medium pt-0.5">
                Registration Date:{users?.joinedAt}{" "}
                <span className="text-gray-600 font-semibold"></span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-50/70 px-6 py-3 border-b border-gray-200/70">
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Identity & Metric Ledger</h3>
    </div>
    
    <div className="divide-y divide-gray-100">
      {/* Row item: Name */}
      <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 items-center hover:bg-gray-50/30 transition-colors">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full User Name</span>
        <span className="sm:col-span-2 text-sm font-semibold text-gray-900 uppercase mt-1 sm:mt-0">{users?.name} </span>
      </div>

      {/* Row item: Email */}
      <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 items-center hover:bg-gray-50/30 transition-colors">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</span>
        <span className="sm:col-span-2 text-sm font-semibold text-gray-900 mt-1 sm:mt-0 select-all tracking-wide">{users?.email}</span>
      </div>

      {/* Row item: Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 items-center hover:bg-gray-50/30 transition-colors">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Line</span>
        <span className="sm:col-span-2 text-sm font-semibold text-gray-900 tracking-wider mt-1 sm:mt-0">{users?.phone || "—"}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 items-center hover:bg-gray-50/30 transition-colors">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
        <span className="sm:col-span-2 text-sm font-semibold text-gray-900 tracking-wider mt-1 sm:mt-0">{users?.status}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 items-center hover:bg-gray-50/30 transition-colors">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</span>
        <span className="sm:col-span-2 text-sm font-semibold text-gray-900 tracking-wider mt-1 sm:mt-0">{users?.totalOrders}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 items-center hover:bg-gray-50/30 transition-colors">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Spent</span>
        <span className="sm:col-span-2 text-sm font-semibold text-gray-900 tracking-wider mt-1 sm:mt-0">₹{users?.totalSpent}</span>
      </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Userdetail;
