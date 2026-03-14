import express from 'express'
import { addSubscription, adminLogin, adminRegister, adminResendLoginVerifyOtp, adminUpdateProfile, checkAllow, forgotPassword, getProfile, logout, registerOtpResend, resetPassword, sendEmailToUser, verifyAdmin, verifyLoginUser } from '../controllers/adminController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';


const adminRoutes = express.Router();



//----------------------------------------- admin routes ------------------------

adminRoutes.post("/register", adminRegister);  
adminRoutes.post("/register-resend-otp",registerOtpResend );  
adminRoutes.post("/register-otp-verify", verifyAdmin); 
adminRoutes.post("/forgotpassword", forgotPassword)
adminRoutes.post("/resetpassword", resetPassword)
adminRoutes.post("/login",adminLogin );  
adminRoutes.post("/login-otp-resend", adminResendLoginVerifyOtp);  
adminRoutes.post("/login-otp-verify", verifyLoginUser);  
adminRoutes.put("/logout",logout);  
adminRoutes.get("/check-alllow",isAuthenticated,checkAllow);    
adminRoutes.post("/update-subscription",isAuthenticated,addSubscription);    

adminRoutes.get("/profile",isAuthenticated, getProfile);    
adminRoutes.put("/profile-update",isAuthenticated, adminUpdateProfile);  
adminRoutes.put("/send-mail",isAuthenticated, sendEmailToUser);  

adminRoutes.post("/create",isAuthenticated, createSubscription);
adminRoutes.get("/check/:userId",isAuthenticated, createSubscription);
adminRoutes.post("/renew",isAuthenticated, createSubscription);


export default adminRoutes;