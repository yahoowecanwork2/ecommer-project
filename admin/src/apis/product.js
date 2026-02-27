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
  updateFields: async (productId, data) => {
    const res = await api.put(
      `/product/admin/update-fields/${productId}`,
      data,
    );
    return res.data;
  },
  updateStock: async (productId, data) => {
    const res = await api.put(`/product/admin/update-stock/${productId}`, data);
    return res.data;
  },
  updateRefund: async (productId, data) => {
    const res = await api.put(
      `/product/admin/update-refund/${productId}`,
      data,
    );
    return res.data;
  },
  updateImages: async (productId, data) => {
    const res = await api.put(
      `/product/admin/update-images/${productId}`,
      data,
    );
    return res.data;
  },
  delete: async (productId) => {
    const res = await api.delete(`/product/admin/delete/${productId}`);
    return res.data;
  },
};
