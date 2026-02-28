import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { authApi } from "../../apis/auth";
import { toast } from "react-hot-toast";
import Registerotpverify from "./modal/Regisetrotpverify";
import Loginotpverifymodal from "./modal/Loginotpverifymodal";

const Register = () => {
  const [showmodal, setShowmodal] = useState(false);
  const [showLoginmodal, setShowLoginmodal] = useState(false);
  const [userExistLoading, setUserExistLoading] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // ---------------- Invisible Recaptcha Setup ----------------
  useEffect(() => {
    if (!auth) return;

    const initializeRecaptcha = () => {
      try {
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        }

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
      } catch (error) {
        console.log("Recaptcha Init Error:", error);
      }
    };

    initializeRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // ---------------- Send OTP (Common for Register & Login) ----------------
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
      toast.error(error.message);
      console.error("OTP Error:", error);
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
        toast.success(res?.message);
        sendOtp("register");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.success(error?.response?.data?.message);
        sendOtp("login"); 
      } else {
        toast.error("Server Error");
      }

    } finally {
      setUserExistLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Phone Authentication</h2>

      <input
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button
        onClick={checkUserExist}
        disabled={userExistLoading || registrationLoading}
        style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
          border: "none",
        }}
      >
        {registrationLoading
          ? "Sending..."
          : userExistLoading
          ? "Checking..."
          : "Send OTP"}
      </button>

      {/* Invisible Recaptcha */}
      <div id="recaptcha-container" style={{ display: "none" }}></div>

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