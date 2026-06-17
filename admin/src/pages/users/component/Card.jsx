import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ user , id }) => {
  const navigate = useNavigate();
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors duration-150">
      {/* 1. User ID Column */}
      <td className="px-6 py-4 whitespace-nowrap align-middle">
        <span className="text-[14px] text-[#4A4A4A] font-normal font-popp">
          #{user.id}
        </span>
      </td>

      {/* 2. Full Name Column */}
      <td className="px-6 py-4 whitespace-nowrap align-middle">
        <div className="flex flex-col">
          <h1 className="text-[14px] font-medium text-[#111111] font-popp">
            {user.name}
          </h1>
        </div>
      </td>

      {/* 3. Email Column */}
      <td className="px-6 py-4 whitespace-nowrap align-middle">
        <span className="text-[14px] text-[#4A4A4A] font-normal font-popp">
          {user.email}
        </span>
      </td>

      {/* 4. Phone Number Column */}
      <td className="px-6 py-4 whitespace-nowrap align-middle">
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#4A4A4A] font-normal font-popp tracking-tight">
            {user.phone}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap align-middle">
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#4A4A4A] font-normal font-popp tracking-tight">
            {user.status}
          </span>
        </div>
      </td>

      {/* 5. Date Created Column */}
      <td className="px-6 py-4 whitespace-nowrap align-middle">
        <span className="text-[14px] text-[#4A4A4A] font-normal font-popp">
          {user.joinedAt}
        </span>
      </td>

      {/* 7. Action Column */}
      <td className="px-6 py-4 whitespace-nowrap text-center align-middle">
        <div className="flex justify-center">
          
          <button
            // to={`/user-detail/${user.id}`}
            onClick={() => {
              console.log("Sending:", user);
              console.log("Sending ID:", user._id);
              navigate(`/user-detail/${user._id}`, {
                state: { user , id:user._id },
              });
            }}
            className="inline-flex items-center justify-center px-4 py-1.5 border border-[#006EFF] text-[#006EFF] hover:bg-[#006EFF] hover:text-white text-xs font-medium rounded transition-all duration-150 shadow-sm font-popp"
          >
            View Details
          </button>
          {/* <button className="cursor-pointer border px-2 py-1">action</button> */}
        </div>
      </td>
    </tr>
  );
};

export default Card;
