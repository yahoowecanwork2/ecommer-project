import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import { categoriesApi } from "../../apis/categories";
import CreateCategories from "./modal/CreateCategories";
import CategoryCard from "./component/CategoryCard";

const Categorie = () => {

  const[category , Setcategory] = useState([])
  const[open , Setopen] = useState(false)

  const fetchcategory = async()=>{
    try{
      const res = await categoriesApi.get();
      console.log("data is",res);
      
      Setcategory(res?.categories)
    } catch(error){
      console.log("Error is",error);
    }
  }


useEffect(()=>{
  fetchcategory();
},[])

  return (
    <Layout>
      <div>
        <div className="flex w-full justify-between">
          {/* Title & Total user  */}
          <div className="flex flex-col w-1/2 ">
            <h1 className="text-2xl font-bold text-[#111111] uppercase ">
              category Management
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium ">
              Create and Manage different categories{" "}
            </p>
          </div>

          <div className="w-1/2  flex justify-end ">
            <div className="flex flex-col w-[200px] px-3 py-2 border-2 border-gray-300  z-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#006EFF] transition-colors duration-300">
                Total categories
              </span>
              <span className="text-3xl font-extrabold text-[#111111] tracking-tight mt-1 tabular-nums">
                {category.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex mt-5">
          <div className="flex w-1/2">
            <input
              type="text"
              className="block w-2/3 rounded-none outline-none  border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm font-medium"
              placeholder="Search caegories ..."
            />
            <button className="border px-2 py-1 bg-[#006EFF] text-white font-semibold">
              Search
            </button>
          </div>
          <div>
            <button
            onClick={()=> Setopen(true)}
             className="border border-gray-300 px-3 py-2 bg-[#006EFF] text-white font-semibold cursor-pointer  ">
              Create Categories
            </button>
          </div>
          {open && <CreateCategories fetchcategory={fetchcategory} closemodal={()=> Setopen(false)}  />}
        </div>

        
          <div className="grid grid-cols-1 md:grid-cols-4  gap-5">
              {category?.map((category) => (
                
                
                <CategoryCard
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

export default Categorie;
