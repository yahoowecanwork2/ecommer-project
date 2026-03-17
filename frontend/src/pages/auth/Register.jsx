import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authApi } from "../../apis/auth";
import { toast } from "react-hot-toast";
import Registerotpverify from "./modal/Regisetrotpverify";
import Loginotpverifymodal from "./modal/Loginotpverifymodal";
import Header from "../common/Header";

const Register = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [showLoginmodal, setShowLoginmodal] = useState(false);
  const [userExistLoading, setUserExistLoading] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // ---------------- Recaptcha Setup -------------------------------------------------
  useEffect(() => {
    // window.location.reload();
    if (!auth) return;

    // if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("Recaptcha solved");
            },
          },
        );

        window.recaptchaVerifier.render();
      } catch (error) {
        console.log("Recaptcha Init Error:", error);
      }
    // }
  }, []);

  // ---------------- Send OTP ----------------
  const sendOtp = async (type) => {
    try {
      if (!window.recaptchaVerifier) {
        toast.error("Recaptcha not ready. Refresh page.");
        return;
      }

      setRegistrationLoading(true);

      const result = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        window.recaptchaVerifier,
      );

      if (result) {
        setConfirmationResult(result);

        if (type === "register") {
          setShowmodal(true);
        } else {
          setShowLoginmodal(true);
        }

        toast.success("OTP sent successfully!");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error(error.message);
      // window.location.reload();
    } finally {
      setRegistrationLoading(false);
    }
  };

  // ---------------- Check user exist ----------------
  const checkUserExist = async () => {
    try {
      if (!phone) {
        toast.error("Enter phone number");
        return;
      }

      setUserExistLoading(true);

      const res = await authApi.checkUserExist(phone);

      if (res?.success) {
        // toast.success(res?.message);
        sendOtp("register");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        // toast.success(error?.response?.data?.message);
        sendOtp("login");
      } else {
        toast.error("Server Error");
      }
    } finally {
      setUserExistLoading(false);
    }
  };

  return (
    <div className="font-google bg-[#fdecec] min-h-screen">
      <Header />

      <div className="flex justify-center items-center py-16 mt-16 mx-6">
        <div className="bg-white w-[400px] shadow-sm">
          {/* Banner */}
          {/* <img src="/login-banner.png" alt="Offer" className="w-full" /> */}

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Login <span className="text-gray-500">or</span> Signup
            </h2>

            {/* Phone Input */}
            <div className="border border-gray-300 flex items-center px-3 py-3 mb-4">
              <span className="text-gray-500 mr-2">+91</span>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="outline-none flex-1 text-sm"
              />
            </div>

            {/* Terms */}
            <div className="text-xs text-gray-500 mb-4 flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <p>
                By continuing, I agree to the{" "}
                <span className="text-pink-500 font-medium">Terms of Use</span>{" "}
                &{" "}
                <span className="text-pink-500 font-medium">
                  Privacy Policy
                </span>{" "}
                and I am above 18 years old.
              </p>
            </div>

            {/* Continue Button */}
            <button
              onClick={checkUserExist}
              disabled={!agreeTerms || userExistLoading || registrationLoading}
              className={`w-full py-3 font-semibold transition ${
                agreeTerms
                  ? "bg-[#ff3f6c] text-white"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              {registrationLoading
                ? "Sending..."
                : userExistLoading
                  ? "Checking..."
                  : "CONTINUE"}
            </button>

            {/* Help */}
            <p className="text-xs text-gray-500 mt-6 text-center">
              Have trouble logging in?{" "}
              <span className="text-pink-500 font-medium cursor-pointer">
                Get help
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Recaptcha container */}
      <div id="recaptcha-container"></div>

      {/* Register OTP Modal */}
      {showmodal && confirmationResult && (
        <Registerotpverify
          confirmationResult={confirmationResult}
          phone={phone}
          setShowmodal={setShowmodal}
        />
      )}

      {/* Login OTP Modal */}
      {showLoginmodal && confirmationResult && (
        <Loginotpverifymodal
          confirmationResult={confirmationResult}
          phone={phone}
          setShowLoginmodal={setShowLoginmodal}
        />
      )}
    </div>
  );
};

export default Register;
