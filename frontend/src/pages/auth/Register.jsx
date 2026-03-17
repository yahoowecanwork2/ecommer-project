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

  // ---------------- Recaptcha Setup --------------------
  useEffect(() => {
    if (!auth) return;

    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container", // ✅ container first
          {
            size: "invisible",
            callback: () => {
              console.log("Recaptcha solved");
            },
          },
          auth, // ✅ auth last
        );

        window.recaptchaVerifier.render();
      } catch (error) {
        console.log("Recaptcha Init Error:", error);
      }
    }
  }, []);

  // ---------------- Send OTP ----------------
  const sendOtp = async (type) => {
    try {
      if (!window.recaptchaVerifier) {
        toast.error("Recaptcha not ready. Refresh page.");
        return;
      }

      if (!phone || phone.length < 10) {
        toast.error("Enter valid phone number");
        return;
      }

      setRegistrationLoading(true);

      const formattedPhone = `+91${phone.replace(/\D/g, "")}`;

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
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

      // 🔥 IMPORTANT: reset recaptcha on failure
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      toast.error(error.message || "Failed to send OTP");
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
        sendOtp("register");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        sendOtp("login");
      } else {
        toast.error("Server Error");
      }
    } finally {
      setUserExistLoading(false);
    }
  };

  return (
    <div className="font-google bg-[#FCFBF9] min-h-screen selection:bg-[#D16B92] selection:text-white overflow-hidden">
      <Header />

      <div className="flex min-h-screen pt-20">
        {/* --- LEFT SIDE: THE ARTISTIC CANVAS (Deep Plum Theme) --- */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#2D1B2D] relative items-center justify-center overflow-hidden">
          {/* Aesthetic Background Detail */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#D16B92] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E8A5C0] rounded-full blur-[100px] opacity-30"></div>
          </div>

          <div className="relative z-10 text-center space-y-6 px-20">
            <h2 className="text-6xl xl:text-8xl font-serif italic text-white tracking-tighter leading-[0.8]">
              The Muse <br /> <span className="text-[#D16B92]">Archive.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#D16B92]/80">
              Navi Clothing Heritage
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: PURE SIMPLE LOGIN FORM --- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 md:px-24 py-12">
          <div className="w-full max-w-[400px]">
            {/* Minimalist Heading */}
            <div className="mb-16 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#2D1B2D] mb-3 leading-tight tracking-tighter">
                Welcome to Navi
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="h-[1px] w-5 bg-gray-100"></span>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                  Login or Signup
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {/* Phone Input: Sharp & Underline Style */}
              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-[#D16B92] transition-colors">
                  Registry Terminal
                </label>
                <div className="flex items-center border-b-2 border-gray-100 py-3.5 group-focus-within:border-[#D16B92] transition-all duration-500">
                  <span className="text-sm font-bold text-[#D16B92] mr-4">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-base tracking-[0.2em] font-medium placeholder:text-gray-200"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 px-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#D16B92] cursor-pointer"
                />
                <p className="text-[10px] leading-relaxed text-gray-400 font-medium">
                  By continuing, I confirm that I agree to the{" "}
                  <span className="text-[#D16B92] cursor-pointer hover:underline font-bold">
                    Terms
                  </span>{" "}
                  &{" "}
                  <span className="text-[#D16B92] cursor-pointer hover:underline font-bold">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={checkUserExist}
                  disabled={
                    !agreeTerms || userExistLoading || registrationLoading
                  }
                  className={`w-full py-5 rounded-full font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-700 shadow-xl overflow-hidden relative group ${
                    agreeTerms
                      ? "bg-[#D16B92] text-white shadow-[#D16B92]/20 active:scale-95"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
                  }`}
                >
                  <span className="relative z-10">
                    {registrationLoading
                      ? "Submitting..."
                      : userExistLoading
                        ? "Searching Records..."
                        : "Continue To Collection"}
                  </span>

                  {/* Animated Shine Effect on Hover (Sirf tab dikhega jab agreeTerms true ho) */}
                  {agreeTerms && !registrationLoading && !userExistLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  )}
                </button>

                {/* CSS for Shimmer - Agar pehle se add nahi kiya hai */}
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `,
                  }}
                />
              </div>

              {/* Help / Support Link */}
              <div className="mt-12 text-center">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-loose">
                  Have trouble logging in? <br />
                  <span className="text-[#D16B92] cursor-pointer hover:scale-105 transition-transform italic ml-1 font-black">
                    Get help
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Tool Containers */}
      <div id="recaptcha-container"></div>
      {showmodal && confirmationResult && (
        <Registerotpverify
          confirmationResult={confirmationResult}
          phone={phone}
          setShowmodal={setShowmodal}
        />
      )}
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
