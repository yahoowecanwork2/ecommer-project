import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Initialize Recaptcha (Correct v9+ syntax)
  useEffect(() => {
    if (!auth) {
      console.error("Auth not initialized");
      return;
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, // ✅ auth FIRST (important)
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha solved");
          },
        }
      );
    }
  }, []);

  // 📩 Send OTP
  const sendOtp = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    try {
      setLoading(true);

      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        "+91" + phone,
        appVerifier
      );

      setConfirmationResult(result);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("OTP Error:", error);
      alert(error.message);

      // Reset recaptcha on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      alert("Phone number verified successfully!");
    } catch (error) {
      console.error("Verify Error:", error);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
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
        onClick={sendOtp}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
          border: "none",
        }}
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
              marginBottom: "10px",
            }}
          />

          <button
            onClick={verifyOtp}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              background: "blue",
              color: "white",
              border: "none",
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {/* 🔥 Required for Recaptcha */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Register;