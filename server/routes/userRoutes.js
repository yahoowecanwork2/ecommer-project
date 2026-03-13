import express from "express";
import {
  addItemToCart,
  addItemToWishlist,
  checkUserExist,
  clearCart,
  clearWishlist,
  getAllUsers,
  getMyCartItems,
  getMyWishlistItems,
  getProfile,
  getSingleUser,
  getSingleUserOrders,
  getUserCartItems,
  getUserWishlistItems,
  loginUser,
  logout,
  registerUser,
  removeFromCart,
  removeFromWishlist,
  SearchUser,
  sendEmailToUser,
  updateCartQuantity,
  userUpdateProfile,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import checkAdmin from "../middleware/checkAdmin.js";

const userRoutes = express.Router();

//-------------------------------- user routes -------------------------------------------
userRoutes.post("/check-user-exist", checkUserExist);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.put("/logout", logout);
userRoutes.get("/profile", isAuthenticated, getProfile);
userRoutes.put("/profile-update", isAuthenticated);
userUpdateProfile;
userRoutes.put("/send-mail", isAuthenticated, sendEmailToUser);

// cart
userRoutes.get("/my-cart", isAuthenticated, getMyCartItems);
userRoutes.put("/cart/add-item", isAuthenticated, addItemToCart);
userRoutes.put("/cart/remove-item", isAuthenticated, removeFromCart);
userRoutes.put("/cart/update-quantity", isAuthenticated, updateCartQuantity);
userRoutes.put("/cart/clear", isAuthenticated, clearCart);
// wistlist
userRoutes.get("/my-wishlist", isAuthenticated, getMyWishlistItems);
userRoutes.put("/wishlist/add-item", isAuthenticated, addItemToWishlist);
userRoutes.put("/wishlist/remove-item", isAuthenticated, removeFromWishlist);
userRoutes.put("/wishlist/clear", isAuthenticated, clearWishlist);

// -------------------------admin routes ---------------------------

userRoutes.get("/get-all", checkAdmin, getAllUsers);
userRoutes.get("/get-single/:userId", checkAdmin, getSingleUser);
userRoutes.get("/user-order/:userId", checkAdmin, getSingleUserOrders);
userRoutes.get("/user-cart/:userId", checkAdmin, getUserCartItems);
userRoutes.get("/user-wishlist/:userId", checkAdmin, getUserWishlistItems);
userRoutes.get("/search", checkAdmin, SearchUser);

export default userRoutes;
