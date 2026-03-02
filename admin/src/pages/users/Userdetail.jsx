import React, { useEffect, useState } from "react";
import Layout from "../../componets/common/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { userApi } from "../../apis/user";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaShoppingCart,
  FaHeart,
  FaBoxOpen,
  FaEnvelope,
} from "react-icons/fa";

const Userdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await userApi.getSingleUser(id);
      console.log("detail", res);

      setUser(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <Layout>
      <div className="p-6 min-h-screen bg-white">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/user")}
          className="flex items-center gap-2 mb-4 text-[#160059] font-semibold hover:underline"
        >
          <FaArrowLeft /> Back to Users
        </button>

        <h1 className="text-3xl font-bold mb-6 text-[#160059]">
          User Details (Admin)
        </h1>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6 flex justify-between items-center">
          <div>
            <p className="text-[#160059] font-semibold">
              User Name: <span className="font-bold">{user.name || "N/A"}</span>
            </p>
            <p className="text-sm text-gray-500">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span className="px-4 py-1 rounded-full border text-sm font-semibold bg-blue-100 text-blue-700 border-blue-300">
            Active User
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#160059] mb-4 flex items-center gap-2">
              <FaUser /> User Info
            </h2>

            <p className="flex items-center gap-2 text-sm text-[#160059]">
              <FaUser /> {user.name || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-sm text-[#160059]">
              <FaEnvelope /> {user.email || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-sm text-[#160059]">
              <FaPhone /> {user.phoneno}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#160059] mb-4 flex items-center gap-2">
              <FaMapMarkerAlt /> Address
            </h2>

            <p className="text-sm text-[#160059]">
              {user?.address?.locality || "Locality"},{" "}
              {user?.address?.city || "City"} -{" "}
              {user?.address?.pinCode || "000000"},{" "}
              {user?.address?.state || "State"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#160059] mb-2 flex items-center gap-2">
              <FaShoppingCart /> Cart
            </h2>
            <p className="text-2xl font-bold text-[#160059]">
              {user.cart?.length || 0}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#160059] mb-2 flex items-center gap-2">
              <FaHeart /> Wishlist
            </h2>
            <p className="text-2xl font-bold text-[#160059]">
              {user.wishlist?.length || 0}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#160059] mb-2 flex items-center gap-2">
              <FaBoxOpen /> Orders
            </h2>
            <p className="text-2xl font-bold text-[#160059]">
              {user.orders?.length || 0}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
            Block User
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Edit User
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Userdetail;
