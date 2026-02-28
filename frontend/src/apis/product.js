// product api
import { api } from ".";

export const productApi = {
  get: async (startIndex = 0, limit = 10) => {
    const res = await api.get(
      `/product/all?startIndex=${startIndex}&limit=${limit}`,
    );
    return res.data;
  },
  getCategories: async () => {
    const res = await api.get(`/category/get-all`);
    return res.data;
  },
  filterByCategories: async (categoryId, page = 1, limit = 4) => {
    const res = await api.get(
      `/product/filter-by-cat/${categoryId}?page=${page}&limit=${limit}`,
    );
    return res.data;
  },
  filterByKeyword: async (keyword) => {
    const res = await api.get(`/product/filter/${keyword}`);
    return res.data;
  },
  getSingle: async (slug) => {
    const res = await api.get(`/product/get-single/${slug}`);
    return res.data;
  },
};
