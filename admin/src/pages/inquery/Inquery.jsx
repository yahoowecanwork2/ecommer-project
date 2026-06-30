import React, { useState } from "react";
import Layout from "../../componets/common/Layout";
import { inquiryApis } from "../../apis/inquiry";

const Inquery = () => {
  const[inquery , setinquery] = useState([])

    const fetchInquiry = async()=>{
      try{
        const res = await inquiryApis.getAll();
        console.log("Data is", res);
      setinquery(res.inquery);
      } catch(error){
        console.log("Error is", error);
      }
    };



  return (
    <Layout>
      <div>
        <div className="flex w-full justify-between">
          {/* Title & Total user  */}
          <div className="flex flex-col w-1/2 ">
            <h1 className="text-2xl font-bold text-[#111111] uppercase ">
              Inquiry Management
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium ">
              Create, track and manage all customer inquiries from one
              place.{" "}
            </p>
          </div>

          <div className="w-1/2  flex justify-end ">
            <div className="flex flex-col w-[200px] px-3 py-2 border-2 border-gray-300  z-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#006EFF] transition-colors duration-300">
                Total Inqueries
              </span>
              <span className="text-3xl font-extrabold text-[#111111] tracking-tight mt-1 tabular-nums">
                12
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
            <button className="border border-gray-300 px-3 py-2 bg-[#006EFF] text-white font-semibold cursor-pointer  ">
              Create Inquery
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Inquery;
