import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authApi } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../../redux/userSlice";
import { clearToken, setToken } from "../../../apis/storage";


const Registerotpverify = ({
  confirmationResult,
  phone,
  setShowmodal,
}) => {
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const getProfile = async () => {
    try {
      const res = await authApi.profile();
      if (res?.success) {
        dispatch(setUser(res.user));
        dispatch(setAuth(true));
        setShowmodal(false)
        navigate("/product");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const registerUser = async () => {
    console.log("register  user api call")
    try {
      clearToken();
      dispatch(setAuth(false));
      const res = await authApi.register(phone);
      if (res?.success) {
        setToken(res.token);
        toast.success(res?.message);
        setShowmodal(false);
        setTimeout(() => {
          getProfile();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------- Verify OTP ---------------------------
  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await confirmationResult.confirm(otp);
      if (res?.user) {
   console.log("Firebase user:", res.user);
   await registerUser();
   toast.success("Phone number verified successfully!");
}
    } catch (error) {
      toast.error("Invalid OTP");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-xl p-7 relative">

    {/* Close Button */}
    <button
      onClick={() => setShowmodal(false)}
      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
    >
      ✕
    </button>

    {/* Title */}
    <h2 className="text-xl font-semibold text-gray-900 text-center mb-1">
      Verify OTP
    </h2>

    <p className="text-sm text-gray-500 text-center mb-6">
      Enter the 6 digit code sent to your phone
    </p>

    {/* OTP Input */}
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      maxLength={6}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center tracking-widest text-lg focus:outline-none focus:border-pink-500 mb-5"
    />

    {/* Verify Button */}
    <button
      onClick={verifyOtp}
      disabled={loading}
      className="w-full bg-[#ff3f6c] text-white py-3 rounded-lg font-medium hover:bg-[#ff527b] transition disabled:opacity-60"
    >
      {loading ? "Verifying..." : "Verify OTP"}
    </button>

    {/* Resend */}
    <div className="text-center mt-5 text-sm">
      {canResend ? (
        <span className="text-[#ff3f6c] font-medium cursor-pointer hover:underline">
          Resend OTP
        </span>
      ) : (
        <span className="text-gray-400">
          Resend OTP in {timer}s
        </span>
      )}
    </div>

  </div>
</div>
  );
};

export default Registerotpverify;