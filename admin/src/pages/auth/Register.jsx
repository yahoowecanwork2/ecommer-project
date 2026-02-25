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
// import Userheader from "../../components/common/Userheader";
import { adminApi } from "../../apis/auth";
import Registerotpverify from "./modal/Regisetrotpverify";

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
        setShowmodal(true);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="flex min-h-[90vh]">
        {/* LEFT INFO */}
        <div className="hidden md:flex w-1/2 text-blue-900 flex-col justify-center px-16">
          <h1 className="text-4xl font-bold mb-4">Create Account</h1>
          <p className="text-lg mb-6 text-blue-700">
            Register to access your dashboard and manage your account.
          </p>

          <ul className="space-y-3 text-sm text-blue-700">
            <li>✔ Secure Registration</li>
            <li>✔ Personal Dashboard</li>
            <li>✔ Easy Profile Management</li>
            <li>✔ Fast & Simple</li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 mt-5 flex justify-center items-center px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-blue-200"
          >
            <h1 className="text-2xl font-bold text-center text-blue-800">
              Admin Register
            </h1>
            <p className="text-center text-sm text-blue-600 mb-6">
              Create your account
            </p>

            {/* NAME */}
            <label className="text-sm font-medium text-blue-700">
              Full Name
            </label>
            <div className="flex items-center w-full h-11 mb-4 bg-blue-50 border border-blue-300 px-3 rounded-md mt-1">
              <MdOutlinePerson className="h-5 w-5 text-blue-500" />
              <input
                type="text"
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none text-blue-800 placeholder-blue-400"
              />
            </div>

            {/* EMAIL */}
            <label className="text-sm font-medium text-blue-700">Email</label>
            <div className="flex items-center w-full h-11 mb-4 bg-blue-50 border border-blue-300 px-3 rounded-md mt-1">
              <MdOutlineMail className="h-5 w-5 text-blue-500" />
              <input
                type="email"
                placeholder="admin@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none text-blue-800 placeholder-blue-400"
              />
            </div>

            {/* PHONE */}
            <label className="text-sm font-medium text-blue-700">
              Phone Number
            </label>
            <div className="flex items-center w-full h-11 mb-4 bg-blue-50 border border-blue-300 px-3 rounded-md mt-1">
              <MdPhone className="h-5 w-5 text-blue-500" />
              <input
                type="text"
                placeholder="Enter phone number"
                name="phoneno"
                value={formData.phoneno}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none text-blue-800 placeholder-blue-400"
              />
            </div>

            {/* PASSWORD */}
            <label className="text-sm font-medium text-blue-700">
              Password
            </label>
            <div className="flex items-center w-full h-11 bg-blue-50 border border-blue-300 px-3 rounded-md mt-1">
              <MdOutlineLock className="h-5 w-5 text-blue-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none text-blue-800 placeholder-blue-400"
              />
              {showPassword ? (
                <IoEyeOffOutline
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="h-5 w-5 text-blue-500 cursor-pointer"
                />
              ) : (
                <IoEyeOutline
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="h-5 w-5 text-blue-500 cursor-pointer"
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
              className="bg-blue-500 text-white h-11 w-full mt-4 text-lg rounded-md hover:bg-blue-600 transition"
            >
              OTP Verification
            </button>

            <p className="mt-4 text-center text-sm text-blue-700">
              Already have an account?
              <span
                onClick={() => navigate("/")}
                className="text-blue-600 cursor-pointer ml-1 font-medium hover:text-blue-800"
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
