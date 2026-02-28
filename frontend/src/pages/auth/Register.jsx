import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { authApi } from "../../apis/auth";
import {toast} from "react-hot-toast"


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showmodal, setShowmodal] = useState(false);
  const [userExistLoading, setUserExistLoading] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!auth) return;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {
            console.log("Recaptcha solved");
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          },
        }
      );
      window.recaptchaVerifier.render().catch(console.error);
    }

    // Cleanup on unmount
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  //  check phone no exist from backned 
   const checkUserExist = async (e) => {
    try {
      setUserExistLoading(true);
      const res = await authApi.checkUserExist(phone);
      console.log(res)
      if (res.success === false) {
        toast.success(res?.message);
        setUserExistLoading(res.success)
        navigate("/")
      } else {
    sendOtp()
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Server Error");
    }
  };





  const sendOtp = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        alert("Recaptcha not ready");
        return;
      }
      console.log("Sending OTP to:", phone);

      const result = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier
      );
       console.log("Otp send result message",result)
      setConfirmationResult(result);
      // if(result){
      //   setShowmodal(true);
      // }
      // open otp verify modal  accordin gto response 
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("OTP Error:", error);
      alert(error.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
      await window.recaptchaVerifier.render();
    } finally {
      setLoading(false);
    }
  };


  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }
    try {
      setLoading(true);
     const res =  await confirmationResult.confirm(otp);
     console.log(res.user.phoneNumber)
    //  call backend function here 
      toast("Phone number verified successfully!");
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
        onClick={checkUserExist}
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

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Register;