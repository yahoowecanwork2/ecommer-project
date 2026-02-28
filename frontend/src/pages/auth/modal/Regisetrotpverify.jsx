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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative">

        <button
          onClick={() => setShowmodal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
        Register OTP Verification
        </h2>

        <p className="text-sm text-center text-gray-500 mb-6">
          Enter OTP sent to your phone
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          {canResend ? (
            <span className="text-blue-600 cursor-pointer">
              Resend OTP
            </span>
          ) : (
            <span>Resend OTP in {timer}s</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registerotpverify;