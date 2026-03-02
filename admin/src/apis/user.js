import { api } from "./index";

export const userApi = {

  // ------------------------- cart apis -------------------------------------
   all: async () => {
    const res = await api.get("/user/get-all");
    return res.data;
  },
  

  getSingleUser: async (useId) => {
    const res = await api.get(`/user/get-single/${useId}`);
    return res.data;
  },

  userOrder: async (useId) => {
    const res = await api.put(`/user/user-order/${useId}`);
    return res.data;
  },


  userWishlist: async (data) => {
    const res = await api.put(`/user/user-wishlist/${useId}`);
    return res.data;
  },


  userCart: async () => {
    const res = await api.get(`/user/user-cart/${useId}`);
    return res.data;
  },


};
