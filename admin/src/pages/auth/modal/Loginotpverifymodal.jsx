import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../../apis/admin";
import toast from "react-hot-toast";
import { clearLoginData, setAuth, setUser } from "../../../redux/userSlice";
import { clearToken, setToken } from "../../../apis/storage";

const Loginotpverify = ({ setShowmodal }) => {
    const [timer, setTimer] = useState(30);
    const [userLoading, setUserLoading] = useState(false);
      const [canResend, setCanResend] = useState(false);
      const [resendLoading, setresendLoading] = useState(false);
      const [loading, setLoading] = useState(false);
      const [otp, setOtp] = useState(["", "", "", "", "", ""]);
      const inputsRef = useRef([]);
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const loginData = useSelector((state) => state.user.loginData);
      console.log(loginData);
    
       
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
    
      const handleChange = (e, i) => {
        const value = e.target.value.replace(/\D/, "");
        if (!value) return;
        const newOtp = [...otp];
        newOtp[i] = value;
        setOtp(newOtp);
        if (i < otp.length - 1 && value) {
          inputsRef.current[i + 1]?.focus();
        }
      };
    
      const handleKeyDown = (e, i) => {
        if (e.key === "Backspace") {
          const newOtp = [...otp];
          if (!otp[i] && i > 0) {
            newOtp[i - 1] = "";
            setOtp(newOtp);
            inputsRef.current[i - 1]?.focus();
          } else {
            newOtp[i] = "";
            setOtp(newOtp);
          }
        }
      };
    
      const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        const newOtp = [...otp];
        pastedData.forEach((digit, idx) => (newOtp[idx] = digit));
        setOtp(newOtp);
        const lastIndex = pastedData.length - 1;
        inputsRef.current[lastIndex]?.focus();
      };

    // get user profile function 
    const getProfile = async () => {
    try {
      setUserLoading(true);
      const res = await adminApi.profile();
      if (res?.success) {
        setUserLoading(false)
        dispatch(setUser(res.user));
        dispatch(setAuth(true));
        navigate("/dashboard");
      }
    } catch (error) {
      setUserLoading(false)
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };
     
    
      const handleVerification = async (e) => {
        const token = getToken();
        console.log({ otp: e, activationToken: token });
        try {
          setLoading(true);
          const res = await adminApi.loginOtpVerify({ otp: e, activationToken: token });
          console.log(res);
          if (res?.success) {
            setToken(res.token)
            setLoading(false);
            toast.success(res?.message);
            dispatch(clearLoginData());
            setShowmodal(false)
        setTimeout(() => {
          getProfile();
        }, 500);
          }
        } catch (error) {
          setLoading(false);    
          console.log(error);
        }
      };
    
    
       const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        console.log(enteredOtp);
        if (enteredOtp.length < 6) {
          return toast.error("Please enter a valid 6-digit OTP");
        }
        handleVerification(enteredOtp);
      };
    
      const resendOtp = async () => {
        if (!canResend) return;
        setCanResend(false);
        setTimer(30); 
        console.log();
        try {
          setresendLoading(true)
          clearToken();
          console.log(loginData.email, loginData.password);
          const res = await authAPI.resendOtp({
            email: loginData.email,
            password: loginData.password,
          });
          console.log(res);
          if (res.success) {
            setToken(res?.token);
            setresendLoading(false)
            toast.success(res?.message || "OTP resent successfully!");
          } else {
            setresendLoading(false)
            toast.error(res?.message || "Something went wrong");
            navigate("/");
          }
        } catch (error) {
          setresendLoading(false)
          toast.error(error?.response?.data?.message || "Server Error Ocurred");
          console.log(error);
        }
        console.log("Resending OTP...");
      };

  if(userLoading) return <div> please wait fetching user detail ....... </div>
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowmodal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
         Login OTP Verification
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter the 6 digit OTP sent to your email or phone
        </p>

         <form className="flex flex-col items-center space-y-6 w-full">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-12 text-center text-lg font-semibold rounded-lg 
            border border-gray-300 bg-[#F5F5F5] text-gray-800 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-all"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading || resendLoading}
            onClick={handleSubmit}
            className="w-full h-11 bg-blue-600 text-white font-semibold text-sm rounded-lg  hover:bg-blue-700 active:scale-95 transition-all duration-200"
          >
            {resendLoading || loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn't receive OTP?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={resendOtp}
              className="text-blue-600 cursor-pointer font-semibold hover:text-indigo-600 transition"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-400 font-semibold">
              Resend in {timer}s
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Loginotpverify;
