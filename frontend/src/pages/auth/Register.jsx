import React, { useState } from "react";
import { MdPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [phoneno, setPhoneno] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 SEND OTP FUNCTION
  const sendOtp = async () => {
    try {
      setLoading(true);

      if (!phoneno || phoneno.length !== 10) {
        toast.error("Enter valid 10 digit phone number");
        setLoading(false);
        return;
      }

      // Initialize Recaptcha (Firebase v12 format)
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,                     // ✅ FIRST auth (v12 format)
          "recaptcha-container",    // ✅ container ID
          {
            size: "invisible",
          }
        );
      }

      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        "+91" + phoneno,
        appVerifier
      );

      setConfirmationResult(result);
      toast.success("OTP Sent Successfully ✅");
      setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP FUNCTION
  const verifyOtp = async () => {
    try {
      if (!otp || otp.length !== 6) {
        toast.error("Enter valid 6 digit OTP");
        return;
      }

      const result = await confirmationResult.confirm(otp);

      console.log("User Verified:", result.user);
      toast.success("Phone Verified Successfully 🎉");

      navigate("/dashboard"); // change route as needed

    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-blue-200">

        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Admin Register
        </h1>

        {/* PHONE INPUT */}
        <label className="text-sm font-medium text-blue-700">
          Phone Number
        </label>

        <div className="flex items-center w-full h-11 mb-4 bg-blue-50 border border-blue-300 px-3 rounded-md mt-1">
          <MdPhone className="h-5 w-5 text-blue-500" />
          <input
            type="text"
            placeholder="Enter 10 digit phone number"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            className="w-full h-full ml-2 bg-transparent outline-none"
          />
        </div>

        <button
          onClick={sendOtp}
          disabled={loading}
          className="bg-blue-600 text-white h-11 w-full rounded-md hover:bg-blue-700"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        {/* Recaptcha Container */}
        <div id="recaptcha-container" className="mt-3"></div>

        {/* OTP INPUT */}
        <label className="text-sm font-medium text-blue-700 mt-6 block">
          Enter OTP
        </label>

        <div className="flex items-center w-full h-11 mb-4 bg-blue-50 border border-blue-300 px-3 rounded-md mt-1">
          <input
            type="text"
            placeholder="Enter 6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full h-full bg-transparent outline-none"
          />
        </div>

        <button
          onClick={verifyOtp}
          className="bg-green-600 text-white h-11 w-full rounded-md hover:bg-green-700"
        >
          Verify OTP
        </button>

        <p className="mt-4 text-center text-sm text-blue-700">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer ml-1 font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;