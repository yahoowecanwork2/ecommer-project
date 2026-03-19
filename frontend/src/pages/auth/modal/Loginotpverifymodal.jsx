import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authApi } from "../../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../../redux/userSlice";
import { clearToken, setToken } from "../../../apis/storage";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase";
import { IoCloseOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

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
 <div className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm flex items-center justify-center z-[150] p-6">
  <div className="bg-white w-full max-w-[420px] rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] overflow-hidden relative animate-in fade-in zoom-in duration-500">
    
    {/* Close Button */}
    <button
      onClick={() => setShowmodal(false)}
      className="absolute top-6 right-6 text-gray-300 hover:text-[#c9a07a] transition-colors duration-300"
    >
      <IoCloseOutline size={24} />
    </button>

    <div className="p-10 md:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif italic text-[#1a1a1a] mb-2">Verify.</h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Enter the code sent to your phone
        </p>
      </div>

      {/* OTP Individual Boxes */}
      <div className="space-y-10">
        <div className="flex justify-between gap-2">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`w-12 h-14 md:w-14 md:h-16 flex items-center justify-center border-2 rounded-xl text-xl font-bold transition-all duration-300 ${
                otp.length === index 
                  ? "border-[#c9a07a] bg-[#fdfaf7] shadow-[0_0_15px_-5px_rgba(201,160,122,0.4)]" 
                  : "border-gray-50 bg-[#fdfaf7]/50"
              }`}
            >
              <span className="text-[#1a1a1a]">
                {otp[index] || ""}
              </span>
            </div>
          ))}
        </div>

        {/* Hidden Real Input for functionality */}
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
          className="absolute inset-0 opacity-0 cursor-default"
          autoFocus
        />

        {/* Action Button Section */}
        <div className="space-y-6">
          <button
            onClick={verifyOtp}
            disabled={loading || otp.length < 6}
            className={`w-full py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] transition-all duration-700 shadow-xl overflow-hidden relative group ${
              loading || otp.length < 6
                ? "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
                : "bg-[#1a1a1a] text-white shadow-gray-200 active:scale-95"
            }`}
          >
            <span className="relative z-10">
              {loading ? "Authenticating..." : "Validate & Entry"}
            </span>
            
            {/* Gold Slide-Up Effect */}
            {!loading && otp.length === 6 && (
              <div className="absolute inset-0 bg-[#c9a07a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            )}
          </button>

          {/* Resend Section */}
          <div className="text-center pt-2">
            {canResend ? (
              <button
                onClick={resendOtp}
                className="text-[10px] font-bold uppercase tracking-widest text-[#c9a07a] border-b border-[#c9a07a]/30 pb-1 hover:border-[#c9a07a] transition-all duration-300"
              >
                Resend Code
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a07a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a07a]"></span>
                </span>
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                  Retry in {timer}s
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shimmer CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    </div>
    <div id="recaptcha-container-register"></div>
  </div>
</div>
  );
};

export default Loginotpverifymodal;
