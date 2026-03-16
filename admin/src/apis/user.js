import { api } from "./index";

export const userApi = {
  // ------------------------- cart apis -------------------------------------

  all: async (query = "") => {
    const res = await api.get(`/user/get-all${query}`);
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
  allStats: async () => {
    const res = await api.get(`/user/stats`);
    return res.data;
  },

  userWishlist: async (data, userId) => {
    const res = await api.put(`/user/user-wishlist/${userId}`, data);
    return res.data;
  },

  userCart: async (userId, data) => {
    const res = await api.get(`/user/user-cart/${userId}`, data);
    return res.data;
  },
  searchUser: async (query, data) => {
    const res = await api.get(
      `/user/search?q=${query}`,
      {
        validateStatus: (status) => status < 500,
      },
      data,
    );
    return res.data;
  },
};
