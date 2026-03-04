import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authApi } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../../redux/userSlice";
import { clearToken, setToken } from "../../../apis/storage";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase";

const Loginotpverifymodal = ({
  confirmationResult,
  phone,
  setShowLoginmodal,
}) => {
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [currentConfirmation, setCurrentConfirmation] =
    useState(confirmationResult);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---------------- Timer ----------------
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

  // ---------------- Get Profile ----------------
  const getProfile = async () => {
    try {
      const res = await authApi.profile();
      if (res?.success) {
        dispatch(setUser(res.user));
        dispatch(setAuth(true));
        setShowLoginmodal(false);
        navigate("/product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- Login API ----------------
  const loginUser = async () => {
    try {
      clearToken();
      dispatch(setAuth(false));

      const res = await authApi.login(phone);

      if (res?.success) {
        setToken(res.token);
        toast.success(res?.message);
        setTimeout(() => {
          getProfile();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- Verify OTP ----------------
  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await currentConfirmation.confirm(otp);

      if (res?.user) {
        toast.success("Phone number verified successfully!");
        await loginUser();
      }
    } catch (error) {
      toast.error("Invalid OTP");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Resend OTP ----------------
  const resendOtp = async () => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container-login",
        { size: "invisible" },
      );

      await window.recaptchaVerifier.render();

      const result = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        window.recaptchaVerifier,
      );

      setCurrentConfirmation(result);
      toast.success("OTP Resent Successfully!");

      setTimer(30);
      setCanResend(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white w-[90%] max-w-sm shadow-2xl p-7 relative animate-popup">
        {/* Close Button */}
        <button
          onClick={() => setShowLoginmodal(false)}
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
          className="w-full border border-gray-300 px-4 py-3 text-center tracking-widest text-lg focus:outline-none focus:border-pink-500 mb-5"
        />

        {/* Verify Button */}
        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-[#ff3f6c] text-white py-3 font-medium hover:bg-[#ff527b] transition disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <div className="text-center mt-5 text-sm">
          {canResend ? (
            <span
              className="text-[#ff3f6c] font-medium cursor-pointer hover:underline"
              onClick={resendOtp}
            >
              Resend OTP
            </span>
          ) : (
            <span className="text-gray-400">Resend OTP in {timer}s</span>
          )}
        </div>

        <div id="recaptcha-container-login"></div>
      </div>
    </div>
  );
};

export default Loginotpverifymodal;
