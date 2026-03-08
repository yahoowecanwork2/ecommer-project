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
  FaRegCalendarAlt,
} from "react-icons/fa";
import { HiOutlineShieldCheck, HiOutlineDotsVertical } from "react-icons/hi";

const Userdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await userApi.getSingleUser(id);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) return <Layout><div className="p-8 text-xs font-bold uppercase tracking-widest text-gray-400">Loading profile...</div></Layout>;
  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-6">
        {/* TOP NAVIGATION & ACTIONS */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <button
            onClick={() => navigate("/user")}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft size={10} /> Back to Directory
          </button>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest border border-gray-200 rounded-sm hover:bg-gray-50 transition-all">
              Edit Profile
            </button>
            <button className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-red-600 text-white rounded-sm hover:bg-red-700 transition-all">
              Block User
            </button>
          </div>
        </div>

        {/* PROFILE SUMMARY HEADER */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-20 h-20 bg-gray-900 text-white flex items-center justify-center text-3xl font-bold rounded-sm shadow-sm">
            {user.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">{user.name}</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-green-50 border border-green-100 text-[10px] font-bold uppercase text-green-700 w-fit mx-auto md:mx-0">
                Verified Account
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><FaEnvelope className="text-gray-300" /> {user.email}</span>
              <span className="flex items-center gap-1.5"><FaRegCalendarAlt className="text-gray-300" /> Member since {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* QUICK STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-sm overflow-hidden">
          <div className="bg-white p-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Shopping Cart</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 text-gray-900 rounded-sm"><FaShoppingCart /></div>
              <span className="text-2xl font-bold text-gray-900">{user.cart?.length || 0} <span className="text-xs font-normal text-gray-400">items</span></span>
            </div>
          </div>
          <div className="bg-white p-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Saved Items</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 text-gray-900 rounded-sm"><FaHeart /></div>
              <span className="text-2xl font-bold text-gray-900">{user.wishlist?.length || 0} <span className="text-xs font-normal text-gray-400">items</span></span>
            </div>
          </div>
          <div className="bg-white p-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Total Orders</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 text-gray-900 rounded-sm"><FaBoxOpen /></div>
              <span className="text-2xl font-bold text-gray-900">{user.orders?.length || 0} <span className="text-xs font-normal text-gray-400">orders</span></span>
            </div>
          </div>
        </div>

        {/* DETAILED INFO BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details */}
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Contact Details</h3>
              <FaUser className="text-gray-300 text-xs" />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">Full Name</span>
                <span className="text-gray-900 font-bold">{user.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">Email Address</span>
                <span className="text-gray-900 font-bold underline decoration-gray-200">{user.email}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">Phone Number</span>
                <span className="text-gray-900 font-bold">{user.phoneno || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Primary Address</h3>
              <FaMapMarkerAlt className="text-gray-300 text-xs" />
            </div>
            <div className="p-4">
              <p className="text-xs font-bold text-gray-900 leading-relaxed">
                {user?.address?.locality || "Address Not Provided"}
                <br />
                {user?.address?.city}, {user?.address?.state}
                <br />
                {user?.address?.pinCode}
              </p>
              <button className="mt-4 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">
                View on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Userdetail;