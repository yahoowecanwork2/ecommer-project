import React, { useState } from "react";
import { MdOutlineMail, MdOutlineLock } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Forgotpassword from "./modal/Forgotpassword";
import { setLoginData } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { clearToken, setToken } from "../../apis/storage";
import { adminApi } from "../../apis/auth";
import Loginotpverify from "./modal/Loginotpverifymodal";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showmodal, setShowmodal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoginData(formData));
    clearToken();
    try {
      setLoading(true);
      const res = await adminApi.login(formData);
      if (res.success) {
        toast.success(res?.message);
        setToken(res?.token);
        setLoading(false);
        setShowmodal(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Server Error Occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="flex min-h-[90vh]">
        {/* LEFT SIDE INFO */}
        <div className="hidden md:flex w-1/2 text-blue-900 flex-col justify-center px-16">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6 text-blue-700">
            Login to manage your account and access dashboard.
          </p>

          <ul className="space-y-3 text-sm text-blue-700">
            <li>✔ Secure Login System</li>
            <li>✔ Manage Your Profile</li>
            <li>✔ Access Dashboard</li>
            <li>✔ Fast & Easy</li>
          </ul>
        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-blue-200"
          >
            <h1 className="text-2xl font-bold text-center text-blue-800">
              Admin Login
            </h1>
            <p className="text-center text-sm text-blue-600 mb-6">
              Login to continue
            </p>

            {/* EMAIL */}
            <label className="text-sm font-medium text-blue-700">Email</label>
            <div className="flex items-center w-full h-11 mb-4 bg-blue-50 border border-blue-300 px-3 rounded-md mt-1">
              <MdOutlineMail className="h-5 w-5 text-blue-500" />
              <input
                type="text"
                placeholder="admin@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-full ml-2 bg-transparent outline-none placeholder-blue-400 text-blue-800"
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
                className="w-full h-full ml-2 bg-transparent outline-none placeholder-blue-400 text-blue-800"
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

            {/* FORGOT */}
            <p
              onClick={() => setForgotPassword(true)}
              className="text-blue-600 text-right text-sm mt-2 cursor-pointer hover:text-blue-800"
            >
              Forgot Password?
            </p>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white h-11 w-full mt-6 text-lg rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="mt-4 text-center text-sm text-blue-700">
              Don’t have an account?
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 cursor-pointer ml-1 font-medium hover:text-blue-800"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>

      {forgotPassword && (
        <Forgotpassword setForgotPassword={setForgotPassword} />
      )}
      {showmodal && <Loginotpverify setShowmodal={setShowmodal} />}
    </div>
  );
};

export default Login;
