import express from "express";
import { checkUserExist, forgotPassword, getProfile, logout, registerOtpResend, resetPassword, sendEmailToUser, userLogin, userRegister, userResendLoginVerifyOtp, userUpdateProfile, verifyLoginUser, verifyUser } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const userRoutes = express.Router();

//--------------------- user routes -------------------

userRoutes.post("/check-user-exist",checkUserExist);  
userRoutes.post("/register",userRegister);  
userRoutes.post("/register-resend-otp",registerOtpResend );  
userRoutes.post("/register-otp-verify", verifyUser); 
userRoutes.post("/forgotpassword", forgotPassword)
userRoutes.post("/resetpassword", resetPassword)
userRoutes.post("/login",userLogin);  
userRoutes.post("/login-otp-resend", userResendLoginVerifyOtp);  
userRoutes.post("/login-otp-verify", verifyLoginUser);  
userRoutes.put("/logout",logout);  
userRoutes.get("/profile",isAuthenticated, getProfile);    
userRoutes.put("/profile-update",isAuthenticated, );  userUpdateProfile
userRoutes.put("/send-mail",isAuthenticated, sendEmailToUser);  





// -------------------------admin routes ---------------------------
// get all users  
// user detail 
// user orders  
// user wishlist 
// send mail to user 


export default userRoutes;