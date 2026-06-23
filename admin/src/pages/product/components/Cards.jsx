import React from "react";
import { MdDelete } from "react-icons/md";
import { productApi } from "../../../apis/product";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cards = ({ id, product, fetchproduct }) => {
  const navigate = useNavigate();  
  const handleDelete = async () => {
    try {
      const res = await productApi.delete(product._id);

      toast.success(res?.message);
      fetchproduct();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div>
      <div
       className="border my-5 flex flex-col gap-3">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full object-cover md:h-[290px] "
          />
          {/* <span>
            {product.insale =="yes" ? 
            <span className="bg-green-400 rounded-full text-white font-semibold  px-4 py-1">Sale</span> 
            : <span className="bg-red-400 rounded-full px-3 py-2">NotForSale</span>}
          </span> */}
        </div>

        <div className="flex flex-col gap-2 my-2 mx-3 ">
          <div className="w- flex gap-2">
            <h1 className="text-sm">Product Name :</h1>
            <p className="text-sm">{product?.name}</p>
          </div>

          <div className="w- flex text-sm gap-2">
            <h1>Price :</h1>
            <p>₹ {product?.price}</p>
          </div>

          <div className="w- flex text-sm gap-2">
            <h1>Stock :</h1>
            <p> {product?.stock}</p>
          </div>

          <div className="flex gap-10">
            <div>
              <button
              onClick={()=> navigate(`/product-detail/${product._id}`)} 
               className="border px-2 bg-[#006EFF] text-white cursor-pointer font-semibold py-1">View Details</button>
            </div>

            <div>
              <button
              onClick={handleDelete}
               className="px-2 py-1 font-semibold cursor-pointer text-white border bg-[#006EFF]">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
