import { api } from ".";

// product api
export const productApi = {
  create: async (data) => {
    const res = await api.post("/product/creates", data);
    return res.data;
  },
  get: async (startIndex = 0, limit = 10) => {
    const res = await api.get(
      `/product/admin/get-all?startIndex=${startIndex}&limit=${limit}`,
    );
    return res.data;
  },
  filterByCategories: async (categoryId, page = 1, limit = 4) => {
    const res = await api.get(
      `/product/admin/filter-by-cat/${categoryId}?page=${page}&limit=${limit}`,
    );
    return res.data;
  },
  filterByKeyword: async (keyword) => {
    const res = await api.get(`/product/filter/${keyword}`);
    return res.data;
  },
  filterByName: async (name) => {
    const res = await api.get(`/product/admin/filterbyName/${name}`);
    return res.data;
  },
  getSingle: async (productId) => {
    const res = await api.get(`/product/admin/get-single/${productId}`);
    return res.data;
  },
  getStats: async () => {
    const res = await api.get(`/product/stats`);
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
