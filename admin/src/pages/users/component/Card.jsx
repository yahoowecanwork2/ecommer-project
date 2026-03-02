import React from "react";
import { FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/user-detail/${user._id}`)}
      className="cursor-pointer bg-white/30 backdrop-blur-xl 
                 border border-white/40 rounded-2xl p-4 
                 shadow-xl hover:scale-105 transition"
    >
      <div className="flex justify-center mb-3">
        {user?.image ? (
          <img
            src={user.image}
            alt=""
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-[#160059] text-6xl" />
        )}
      </div>

      <h3 className="text-center font-bold text-[#160059]">
        {user?.name || "No Name"}
      </h3>

      <p className="flex items-center justify-center gap-2 text-sm text-[#160059] mt-2">
        <FaEnvelope /> {user?.email || "N/A"}
      </p>

      <p className="flex items-center justify-center gap-2 text-sm text-[#160059]">
        <FaPhone /> {user?.phoneno}
      </p>
    </div>
  );
};

export default UserCard;
