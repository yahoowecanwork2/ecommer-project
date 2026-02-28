// auth

import { api } from "./index";

export const authApi = {
  checkUserExist: async (phone) => {
    const res = await api.post("/user/check-user-exist",{phone});
    return res.data;
  },

  register: async (phone) => {
    const res = await api.post("/user/register", {phone});
    return res.data;
  },


  login: async (phone) => {
    const res = await api.post("/user/login",{phone});
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
};
