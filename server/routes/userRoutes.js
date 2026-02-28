import express from "express";
import { checkUserExist, getProfile, loginUser, logout, registerUser, sendEmailToUser, userUpdateProfile} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";



const userRoutes = express.Router();



//-------------------------------- user routes -------------------------------------------
userRoutes.post("/check-user-exist",checkUserExist);    
userRoutes.post("/register",registerUser);   
userRoutes.post("/login",loginUser);  
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