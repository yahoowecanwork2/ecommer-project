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

  // ---------------- Recaptcha Setup ----------------
  useEffect(() => {
    if (!auth) return;

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("Recaptcha solved");
            },
          }
        );
        window.recaptchaVerifier.render();
      }
    } catch (error) {
      console.log("Recaptcha Init Error:", error);
    }
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
        window.recaptchaVerifier
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
    } finally {
      setRegistrationLoading(false);
    }
  };

  // ---------------- Check user exist ----------------
  const checkUserExist = async () => {
    try {
      if (!phone || phone.length < 10) {
        toast.error("Enter a valid 10-digit phone number");
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
    <div className="font-sans bg-white min-h-screen selection:bg-[#c9a07a] selection:text-white flex items-center justify-center relative overflow-hidden">
      <Header />

      {/* --- BACKGROUND ACCENTS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#fdfaf7] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#fdfaf7] rounded-full blur-[100px]"></div>
      </div>

      <main className="w-full max-w-[440px] px-6 py-20 relative z-10">
        <div className="space-y-16">
          
          {/* --- BRAND HEADER --- */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tighter text-[#1a1a1a]">
              Navi <span className="italic font-light text-gray-400">Clothing</span>
            </h1>
            <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-8 bg-gray-100"></span>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a07a]">
                Member Access
              </p>
              <span className="h-[1px] w-8 bg-gray-100"></span>
            </div>
          </div>

          {/* --- FORM SECTION --- */}
          <div className="space-y-12">
            
            {/* Phone Input */}
            <div className="space-y-3 group">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-[#c9a07a] transition-colors">
                Mobile Number
              </label>
              <div className="relative flex items-center border-b border-gray-100 py-4 focus-within:border-[#1a1a1a] transition-all duration-500">
                <span className="text-sm font-bold text-[#c9a07a] pr-4 border-r border-gray-100 mr-5">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="00000 00000"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-base tracking-[0.1em] font-light placeholder:text-gray-200 text-[#1a1a1a]"
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded-none border-gray-300 accent-[#1a1a1a] cursor-pointer"
              />
              <p className="text-[11px] leading-relaxed text-gray-400 font-normal">
                I agree to the <span className="text-[#1a1a1a] underline underline-offset-4 cursor-pointer hover:text-[#c9a07a] transition-colors">Terms of Service</span> and <span className="text-[#1a1a1a] underline underline-offset-4 cursor-pointer hover:text-[#c9a07a] transition-colors">Privacy Policy</span>.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={checkUserExist}
                disabled={!agreeTerms || userExistLoading || registrationLoading}
                className={`w-full py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 rounded-sm shadow-sm ${
                  agreeTerms
                    ? "bg-[#1a1a1a] text-white hover:bg-[#c9a07a] active:scale-[0.98]"
                    : "bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100"
                }`}
              >
                {registrationLoading || userExistLoading
                  ? "Verifying Identity..."
                  : "Continue Access"}
              </button>
            </div>

            {/* Assistance Section */}
            <div className="pt-8 text-center border-t border-gray-50">
              <p className="text-[10px] font-medium text-gray-300 uppercase tracking-widest">
                Need concierge help? <a href="mailto:support@naviclothing.com" className="text-[#c9a07a] italic hover:underline">Get Support</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* --- FIREBASE & MODAL LOGIC --- */}
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