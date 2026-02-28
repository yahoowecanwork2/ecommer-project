// auth

import { api } from "./index";

export const authApi = {
  checkUserExist: async (phone) => {
    const res = await api.post("/user/check-user-exist",{phone});
    return res.data;
  },

  register: async (data) => {
    const res = await api.post("/user/register", data);
    return res.data;
  },

  registerOtpResend: async (data) => {
    const res = await api.post("/user/register-resend-otp", data);
    return res.data;
  },

  registerOtpVerify: async (data) => {
    const res = await api.post("/user/register-otp-verify", data);
    return res.data;
  },

  login: async (data) => {
    const res = await api.post("/user/login", data);
    return res.data;
  },

  loginOtpResend: async (data) => {
    const res = await api.post("/user/login-otp-resend", data);
    return res.data;
  },

  loginOtpVerify: async (data) => {
    const res = await api.post("/user/login-otp-verify", data);
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
