import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Card = ({ value }) => {
  const navigate = useNavigate();
  const id = useParams();
  return (
    <div className="border border-gray-200 shadow-lg rounded-lg flex flex-col gap-2 px-4 py-3">
      <div className="flex justify-between mb-2">
        <div className="flex justify-start">
          <p className="font-bold text-lg">{value.orderno}</p>
        </div>
        <div className="flex justify-end py-1 ">
          <p className="font-semibold text-gray-600 text-sm">{value.Date}</p>
        </div>
      </div>

      <div className="flex justify-between mb-2">
        <div>
          <p className="font-bold text-lg  ">{value.customername}</p>
        </div>
        <div className="flex item-end">
          <span className="  rounded-full capitalize ">
            {value.status === "processing" || value.status === "pending" ? (
              <span className="bg-yellow-100 text-yellow-800 px-2 font-semibold py-1 border rounded-full ">
                {value.status}
              </span>
            ) : value.status === "dispatched" ? (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 font-semibold border rounded-full">
                {value.status}
              </span>
            ) : value.status === "delivered" ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 font-semibold border rounded-full">
                {value.status}
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 px-2 py-1 font-semibold border rounded-full">
                {value.status}
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-1/2 ">
          <img
            src={value?.items?.[0]?.imageurl}
            alt="product"
            className="w-full object-top md:h-[140px]"
          />
        </div>
        <div className="flex text-center justify-center flex-col w-1/2">
          <p className="font-semibold text-lg ">{value?.items?.length} items</p>
          <p className="text-lg font-semibold"> ₹ {value?.items?.[0].price}</p>
        </div>
      </div>

      <div className="flex justify-between my-2  ">
        <div>
          <span className="flex justify-start  bg-yellow-100 text-yellow-800  font-semibold ">
            {value.paymentType === "cod" ? (
              <span className="border px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md uppercase">
                {value.paymentType}
              </span>
            ) : (
              <span className="border rounded-md px-3 py-1 bg-green-100 text-green-800 capitalize ">
                {value.paymentType}
              </span>
            )}
          </span>
        </div>
        <div className="flex item-end">
          <button
            onClick={() =>
              navigate(`/order-detail/${value.orderno}`, {
                state: { order: value },
              })
            }
            className=" border-2 cursor-pointer px-2 py-1  border-[#006EFF] font-semibold text-[#006EFF]  "
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
