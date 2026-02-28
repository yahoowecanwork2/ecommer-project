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
        { size: "invisible" }
      );

      await window.recaptchaVerifier.render();

      const result = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        window.recaptchaVerifier
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative">

        <button
          onClick={() => setShowLoginmodal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Login OTP Verification
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
            <span
              className="text-blue-600 cursor-pointer"
              onClick={resendOtp}
            >
              Resend OTP
            </span>
          ) : (
            <span>Resend OTP in {timer}s</span>
          )}
        </div>

        {/* Invisible Recaptcha Container */}
        <div id="recaptcha-container-login"></div>

      </div>
    </div>
  );
};

export default Loginotpverifymodal;