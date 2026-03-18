import React, { useEffect, useState } from "react";
import {
  IoPersonOutline,
  IoLocationOutline,
  IoCreateOutline,
  IoCameraOutline,
  IoFingerPrintOutline,
  IoLogOutOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Logout ke liye navigate

import Header from "../common/Header";
import Footer from "../common/Footer";
import { authApi } from "../../apis/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    alternateno: "",
    address: {
      locality: "",
      city: "",
      state: "",
      pinCode: "",
    },
  });

  const getProfile = async () => {
    try {
      const res = await authApi.profile();
      if (res.success) {
        setUser(res.user);
        setFormData({
          name: res.user?.name || "",
          email: res.user?.email || "",
          phoneno: res.user?.phoneno || "",
          alternateno: res.user?.alternateno || "",
          address: {
            locality: res.user?.address?.locality || "",
            city: res.user?.address?.city || "",
            state: res.user?.address?.state || "",
            pinCode: res.user?.address?.pinCode || "",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["locality", "city", "state", "pinCode"].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await authApi.updateProfile(formData);
      if (res.success) {
        setUser(res.user);
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full bg-[#fbfbfb] min-h-screen font-sans">
      <Header />

      <main className="max-w-4xl mx-auto pt-28 md:pt-36 pb-20 px-4 sm:px-6">
        {/* --- PROFILE HEADER CARD --- */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="relative group">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                  <IoPersonOutline className="text-4xl text-gray-500" />
                </div>
                <button className="absolute bottom-1 right-1 bg-black hover:bg-gray-800 text-white p-2 rounded-full transition-colors shadow-lg">
                  <IoCameraOutline size={16} />
                </button>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1">
                  <IoMailOutline size={14} /> {user?.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all w-full md:w-auto ${
                  editMode
                    ? "bg-gray-100 text-gray-600"
                    : "bg-black text-white hover:shadow-lg active:scale-95"
                }`}
              >
                <IoCreateOutline size={18} />
                {editMode ? "Cancel Editing" : "Edit Profile"}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium border border-red-100 text-red-600 hover:bg-red-50 transition-all w-full md:w-auto"
              >
                <IoLogOutOutline size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* --- INFORMATION SECTION --- */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden transition-all">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <IoFingerPrintOutline className="text-gray-400 text-lg" />
            <h3 className="font-bold text-gray-700 uppercase tracking-wider text-sm">
              Personal Information
            </h3>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
                  Full Name
                </label>
                {editMode ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-gray-50"
                  />
                ) : (
                  <div className="p-3 bg-white border border-transparent text-gray-800 font-medium">
                    {user?.name || "—"}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
                  Email Address
                </label>
                {editMode ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-gray-50"
                  />
                ) : (
                  <div className="p-3 bg-white border border-transparent text-gray-800 font-medium">
                    {user?.email || "—"}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1 flex items-center gap-1">
                  <IoCallOutline size={12} /> Phone Number
                </label>
                {editMode ? (
                  <input
                    name="phoneno"
                    value={formData.phoneno}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-gray-50"
                  />
                ) : (
                  <div className="p-3 bg-white border border-transparent text-gray-800 font-medium">
                    {user?.phoneno || "Not Provided"}
                  </div>
                )}
              </div>

              {/* Alternate Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
                  Alternate Number
                </label>
                {editMode ? (
                  <input
                    name="alternateno"
                    value={formData.alternateno}
                    onChange={handleChange}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all bg-gray-50"
                  />
                ) : (
                  <div className="p-3 bg-white border border-transparent text-gray-800 font-medium">
                    {user?.alternateno || "—"}
                  </div>
                )}
              </div>

              {/* Address Section */}
              <div className="md:col-span-2 mt-4">
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1 flex items-center gap-1 mb-2">
                  <IoLocationOutline size={14} /> Full Address
                </label>

                {editMode ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <input
                      name="locality"
                      placeholder="Locality"
                      value={formData.address.locality}
                      onChange={handleChange}
                      className="border border-gray-200 p-3 rounded-xl outline-none focus:border-black"
                    />
                    <input
                      name="city"
                      placeholder="City"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="border border-gray-200 p-3 rounded-xl outline-none focus:border-black"
                    />
                    <input
                      name="state"
                      placeholder="State"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="border border-gray-200 p-3 rounded-xl outline-none focus:border-black"
                    />
                    <input
                      name="pinCode"
                      placeholder="Pin Code"
                      value={formData.address.pinCode}
                      onChange={handleChange}
                      className="border border-gray-200 p-3 rounded-xl outline-none focus:border-black"
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-700 leading-relaxed">
                    {user?.address?.city ? (
                      <span>
                        {user?.address?.locality}, {user?.address?.city}, <br />
                        {user?.address?.state} -{" "}
                        <span className="font-semibold">
                          {user?.address?.pinCode}
                        </span>
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">
                        No address added yet.
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons for Edit Mode */}
            {editMode && (
              <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-gray-100 mt-10">
                <button
                  onClick={handleUpdate}
                  className="bg-black text-white px-10 py-3 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95"
                >
                  Save Profile
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-white text-gray-600 border border-gray-200 px-10 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Discard Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
