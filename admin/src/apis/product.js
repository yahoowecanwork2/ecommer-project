import { api } from ".";

// product api
export const productApi = {
  create: async (data) => {
    const res = await api.post("/product/create", data);
    return res.data;
  },
  get: async () => {
    const res = await api.get("/product/admin/get-all");
    return res.data;
  },
  getSingle: async (productId) => {
    const res = await api.get(`/product/admin/get-single/${productId}`);
    return res.data;
  },
};
