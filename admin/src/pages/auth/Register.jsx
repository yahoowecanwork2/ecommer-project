import React, { useState } from "react";
import {
  MdOutlineMail,
  MdOutlineLock,
  MdOutlinePerson,
  MdPhone,
} from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearRegisterData,
  setAuth,
  setRegisterData,
} from "../../redux/userSlice";
import { clearToken, setToken } from "../../apis/storage";
import toast from "react-hot-toast";
import Userheader from "../../components/common/Userheader";
import { adminApi } from "../../apis/admin";
import Registerotpverify from "./modal/Registerotpverify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showmodal, setShowmodal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setAuth(false));
    dispatch(setRegisterData(formData));
    clearToken();
    try {
      setLoading(true);
      const res = await adminApi.register(formData);
      if (res?.status === "success") {
        toast.success(res?.message);
        setToken(res?.token);
        setLoading(false);
        setShowmodal(true)
      }
    } catch (error) {
      setLoading(false);
      clearToken();
      dispatch(clearRegisterData());
      dispatch(setAuth(false));
      toast.error(error?.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E3A8A]">
      <Userheader />

      <div className="flex min-h-[90vh]">
        {/* LEFT INFO */}
        <div className="hidden md:flex w-1/2 text-blue-100 flex-col justify-center px-16">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Study Materials Portal
          </h1>
          <p className="text-lg mb-6 text-blue-200">
            Create your admin account to manage learning resources.
          </p>

          <ul className="space-y-3 text-sm text-blue-200">
            <li>✔ Upload & Manage Notes</li>
            <li>✔ Subject-wise Materials</li>
            <li>✔ PDF & Video Resources</li>
            <li>✔ Easy Access for Students</li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 mt-5 flex justify-center items-center px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0F172A]/90 w-full max-w-md rounded-2xl shadow-2xl p-8 border border-blue-800"
          >
            <h1 className="text-2xl font-bold text-center text-white">
              Admin Register
            </h1>
            <p className="text-center text-sm text-blue-300 mb-6">
              Study Materials Management
            </p>

            {/* NAME */}
            <label className="text-sm font-medium text-blue-200">
              Full Name
            </label>
            <div className="flex items-center w-full h-11 mb-4 bg-[#1E3A8A] border border-blue-700 px-3 rounded-md mt-1">
              <MdOutlinePerson className="h-5 w-5 text-blue-300" />
              <input
                type="text"
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none text-white placeholder-blue-300"
              />
            </div>

            {/* EMAIL */}
            <label className="text-sm font-medium text-blue-200">Email</label>
            <div className="flex items-center w-full h-11 mb-4 bg-[#1E3A8A] border border-blue-700 px-3 rounded-md mt-1">
              <MdOutlineMail className="h-5 w-5 text-blue-300" />
              <input
                type="email"
                placeholder="admin@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none text-white placeholder-blue-300"
              />
            </div>

            {/* PHONE */}
            <label className="text-sm font-medium text-blue-200">
              Phone Number
            </label>
            <div className="flex items-center w-full h-11 mb-4 bg-[#1E3A8A] border border-blue-700 px-3 rounded-md mt-1">
              <MdPhone className="h-5 w-5 text-blue-300" />
              <input
                type="text"
                placeholder="Enter phone number"
                name="phoneno"
                value={formData.phoneno}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none text-white placeholder-blue-300"
              />
            </div>

            {/* PASSWORD */}
            <label className="text-sm font-medium text-blue-200">
              Password
            </label>
            <div className="flex items-center w-full h-11 bg-[#1E3A8A] border border-blue-700 px-3 rounded-md mt-1">
              <MdOutlineLock className="h-5 w-5 text-blue-300" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none text-white placeholder-blue-300"
              />
              {showPassword ? (
                <IoEyeOffOutline
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="h-5 w-5 text-blue-300 cursor-pointer"
                />
              ) : (
                <IoEyeOutline
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="h-5 w-5 text-blue-300 cursor-pointer"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white h-11 w-full mt-6 text-lg rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              onClick={() => setShowmodal(true)}
              className="bg-blue-600 text-white h-11 w-full mt-6 text-lg rounded-md hover:bg-blue-700 transition"
            >
              otpverification
            </button>

            <p className="mt-4 text-center text-sm text-blue-200">
              Already have an account?
              <span
                onClick={() => navigate("/")}
                className="text-blue-400 cursor-pointer ml-1 font-medium hover:text-white"
              >
                Login
              </span>
            </p>
            {showmodal && <Registerotpverify setShowmodal={setShowmodal} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
