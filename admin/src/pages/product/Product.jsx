import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import { productApi } from "../../apis/product";
import Create from "./mdoal/Create";
import Cards from "./components/Cards";

const Product = () => {
  const[product , setproduct] = useState([]);
  const[open , setopen] = useState(false);
  


  const fetchproduct = async()=>{
    try{
      const res = await productApi.create();
      setproduct(res)
    } catch(error){
      console.log("Error is" , error);
    }
  }

  useEffect(()=>{
    fetchproduct()
  },[])

  return (
    <Layout>
      <div>
        <div className="flex w-full justify-between">
          {/* Title & Total user  */}
          <div className="flex flex-col w-1/2 ">
            <h1 className="text-2xl font-bold text-[#111111] uppercase ">
              Product Management
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium ">
              Create and Manage different products{" "}
            </p>
          </div>

          <div className="w-1/2  flex justify-end ">
            <div className="flex flex-col w-[200px] px-3 py-2 border-2 border-gray-300  z-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#006EFF] transition-colors duration-300">
                Total Products
              </span>
              <span className="text-3xl font-extrabold text-[#111111] tracking-tight mt-1 tabular-nums">
                {product.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex mt-5">
          <div className="flex w-1/2">
            <input
              type="text"
              className="block w-2/3 rounded-none outline-none  border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm font-medium"
              placeholder="Search products..."
            />
            <button className="border px-2 py-1 bg-[#006EFF] text-white font-semibold">
              Search
            </button>
          </div>
          <div>
            <button
            onClick={()=> Setopen(true)}
             className="border border-gray-300 px-3 py-2 bg-[#006EFF] text-white font-semibold cursor-pointer  ">
              Create product
            </button>
          </div>
          {/* {open && <Create fetchproduct={fetchproduct} closemodal={()=> Setopen(false)}  />} */}
        </div>

        
          <div className="grid grid-cols-1 md:grid-cols-4  gap-5">
              {product?.map((product) => (
                
                
                <Cards
                  key={category?._id}
                  category={category}
                  fetchcategory={fetchcategory}
                />
              ))}

              
            </div>
        
      </div>
    </Layout>
  );
};

export default Product;
