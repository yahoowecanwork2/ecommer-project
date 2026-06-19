import React from "react";
import { categoriesApi } from "../../../apis/categories";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const CategoryCard = ({ category, fetchcategory }) => {


    const HandleDelete = async()=>{
        try{
            const res = await categoriesApi.delete(category._id);

            toast.success(res?.message)
            fetchcategory();

        } catch(error){
            console.log(error);
            toast.error("Failed to dleete category")
        }
    }

  return (
    <div>
      <div className="border my-5 flex flex-col gap-3">
        <div>
          <img
            src={category?.image?.[0]?.url}
            alt={category?.name}
            className="w-full object-cover h-[290px] "
          />
        </div>

        <div className="flex gap-2 my-2 mx-3 ">
          <div className="w-2/3 flex gap-2">
            <h1>Category:</h1>
          <p>{category?.name}</p>
          </div>
          <div className="w-1/2 flex justify-end">
            <MdDelete
            onClick={HandleDelete} 
            className="text-red-500 text-2xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
