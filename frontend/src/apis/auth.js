// auth

import { api } from "./index";

export const authApi = {
  checkUserExist: async (phone) => {
    const res = await api.post("/user/check-user-exist", { phone });
    return res.data;
  },

  register: async (phone) => {
    const res = await api.post("/user/register", { phone });
    return res.data;
  },

  login: async (phone) => {
    const res = await api.post("/user/login", { phone });
    return res.data;
  },

  logout: async () => {
    const res = await api.get("/user/logout");
    localStorage.removeItem("token");
    window.location.href = "/";
  },

  profile: async () => {
    const res = await api.get("/user/profile");
    return res.data;
  },

  updateProfile: async () => {
    const res = await api.post("/user/profile-update");
    return res.data;
  },

  mailToUser: async () => {
    const res = await api.post("/user/send-mail");
    return res.data;
  },

  // ------------------------- cart apis -------------------------------------
  myCart: async () => {
    const res = await api.get("/user/my-cart");
    return res.data;
  },

  addToCart: async (data) => {
    const res = await api.put("/user/cart/add-item",data);
    return res.data;
  },

  removeItemFromCart: async (productId) => {
    const res = await api.put("/user/cart/remove-item",{productId});
    return res.data;
  },

  updateQuantity: async (data) => {
    const res = await api.put("/user/cart/update-quantity",data);
    return res.data;
  },

  clearCart: async () => {
    const res = await api.put("/user/cart/clear");
    return res.data;
  },

  //------------------------------ wishlist apis -----------------------------------
  myWishlist: async () => {
    const res = await api.get("/user/my-wishlist");
    return res.data;
  },

  addToWishlist: async (data) => {
    const res = await api.put("/user/wishlist/add-item",data);
    return res.data;
  },

  removeItemFromWishlist: async (productId) => {
    console.log(productId)
    const res = await api.put("/user/wishlist/remove-item",{productId});
    return res.data;
  },

  clearWishlist: async () => {
    const res = await api.put("/user/wishlist/clear");
    return res.data;
  },
};
