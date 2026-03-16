import React, { useEffect, useState } from "react";
import {
  IoPersonOutline,
  IoLocationOutline,
  IoCreateOutline,
  IoCameraOutline,
  IoFingerPrintOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { authApi } from "../../apis/auth";

const Profile = () => {
  const [user, setUser] = useState(null);

  const getProfile = async () => {
    try {
      const res = await authApi.profile();
      if (res.success) {
        setUser(res.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // helper function
  const showValue = (value) => {
    if (!value || value === "") return "Not Available";
    return value;
  };

  if (!user) {
    return <div className="pt-40 text-center">Loading Profile...</div>;
  }

  return (
    <div className="w-full bg-[#FCFBF9] min-h-screen font-google text-[#2D1B2D]">
      <Header />

      <main className="max-w-[1100px] mx-auto px-6 pt-36 lg:pt-52 pb-24">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10 mb-16 px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#D16B92]/20 p-1.5 bg-white shadow-sm">
                <div className="w-full h-full rounded-full bg-[#FAF9F6] flex items-center justify-center">
                  <IoPersonOutline className="text-4xl text-[#D16B92]/20" />
                </div>
              </div>

              <button className="absolute bottom-1 right-1 bg-[#2D1B2D] text-white p-2 rounded-full">
                <IoCameraOutline size={16} />
              </button>
            </div>

            {/* Name */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-serif italic">
                {showValue(user?.name)}
              </h1>
            </div>
          </div>

          <button className="flex items-center gap-2 border-b text-xs font-bold uppercase">
            <IoCreateOutline size={16} /> Edit Profile
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white shadow-lg border rounded-lg overflow-hidden">
          <div className="px-10 py-8 bg-[#FAF9F6] border-b flex items-center gap-3">
            <IoFingerPrintOutline />
            <h3 className="text-xs font-bold uppercase">
              Personal Information
            </h3>
          </div>

          <div className="divide-y">
            {/* NAME */}
            <div className="p-8 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Full Name</p>
                <p className="text-lg">{showValue(user?.name)}</p>
              </div>

              {!user?.name && (
                <button className="text-xs text-pink-500">Update</button>
              )}
            </div>

            {/* EMAIL */}
            <div className="p-8 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p>{showValue(user?.email)}</p>
              </div>

              {!user?.email && (
                <button className="text-xs text-pink-500">Update</button>
              )}
            </div>

            {/* PHONE */}
            <div className="p-8 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p>{showValue(user?.phoneno)}</p>
              </div>

              {!user?.phoneno && (
                <button className="text-xs text-pink-500">Update</button>
              )}
            </div>

            {/* ADDRESS */}
            <div className="p-8 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <IoLocationOutline /> Address
                </p>

                <p>
                  {user?.address?.city
                    ? `${user.address.locality}, ${user.address.city}, ${user.address.state} - ${user.address.pinCode}`
                    : "Not Available"}
                </p>
              </div>

              {!user?.address?.city && (
                <button className="text-xs text-pink-500">Add Address</button>
              )}
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="mt-12">
          <button className="flex items-center gap-3 text-gray-400 hover:text-red-400">
            <IoLogOutOutline />
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
