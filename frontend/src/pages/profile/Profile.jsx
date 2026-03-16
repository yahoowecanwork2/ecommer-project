import React, { useEffect, useState } from "react";
import {
  IoPersonOutline,
  IoLocationOutline,
  IoCreateOutline,
  IoCameraOutline,
  IoFingerPrintOutline,
} from "react-icons/io5";

import Header from "../common/Header";
import Footer from "../common/Footer";
import { authApi } from "../../apis/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

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
          name: res.user.name || "",
          email: res.user.email || "",
          phoneno: res.user.phoneno || "",
          alternateno: res.user.alternateno || "",
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
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
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

  if (!user) {
    return <div className="pt-40 text-center">Loading...</div>;
  }

  return (
    <div className="w-full bg-[#f8f8f8] min-h-screen">
      <Header />

      <main className="max-w-[900px] mx-auto pt-36 pb-20 px-6">
        {/* PROFILE HEADER */}
        <div className="bg-white shadow-md rounded-xl p-8 flex justify-between items-center mb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                <IoPersonOutline className="text-4xl text-gray-400" />
              </div>

              <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full">
                <IoCameraOutline size={14} />
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
          >
            <IoCreateOutline />
            Edit Profile
          </button>
        </div>

        {/* PROFILE INFO */}
        <div className="bg-white shadow-md rounded-xl">
          <div className="p-6 border-b flex items-center gap-2">
            <IoFingerPrintOutline />
            <h3 className="font-semibold">Personal Information</h3>
          </div>

          <div className="p-8 space-y-6">
            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500">Full Name</label>

              {editMode ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-3 rounded w-full mt-1"
                />
              ) : (
                <p className="mt-1">{user.name || "Not Available"}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500">Email</label>

              {editMode ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-3 rounded w-full mt-1"
                />
              ) : (
                <p className="mt-1">{user.email || "Not Available"}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-500">Phone</label>

              {editMode ? (
                <input
                  name="phoneno"
                  value={formData.phoneno}
                  onChange={handleChange}
                  className="border p-3 rounded w-full mt-1"
                />
              ) : (
                <p className="mt-1">{user.phoneno || "Not Available"}</p>
              )}
            </div>

            {/* ALTERNATE */}
            <div>
              <label className="text-sm text-gray-500">Alternate Number</label>

              {editMode ? (
                <input
                  name="alternateno"
                  value={formData.alternateno}
                  onChange={handleChange}
                  className="border p-3 rounded w-full mt-1"
                />
              ) : (
                <p className="mt-1">{user.alternateno || "Not Available"}</p>
              )}
            </div>

            {/* ADDRESS */}
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-2">
                <IoLocationOutline /> Address
              </label>

              {editMode ? (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input
                    name="locality"
                    placeholder="Locality"
                    value={formData.address.locality}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    name="city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    name="state"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    name="pinCode"
                    placeholder="Pin Code"
                    value={formData.address.pinCode}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />
                </div>
              ) : (
                <p className="mt-1">
                  {user?.address?.city
                    ? `${user.address.locality}, ${user.address.city}, ${user.address.state} - ${user.address.pinCode}`
                    : "Not Available"}
                </p>
              )}
            </div>

            {/* BUTTONS */}
            {editMode && (
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-black text-white px-6 py-2 rounded-lg"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="border px-6 py-2 rounded-lg"
                >
                  Cancel
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
