import { api } from ".";

// product api
export const productApi = {
  create: async (data) => {
    const res = await api.post("/product/create", data);
    return res.data;
  },
};
