import { api } from ".";

export const categoriesApi = {
  create: async (data) => {
    const res = await api.post("/category/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  get: async () => {
    const res = await api.get("/category/get-all");
    return res.data;
  },
  update: async (data, categoryId) => {
    const res = await api.update(`/category/update-name/${categoryId}`, data);
    return res.data;
  },
  delete: async (categoryId) => {
    const res = await api.delete(`/category/delete/${categoryId}`);
    return res.data;
  },
  getByName: async () => {
    const res = await api.get("/category/get-name");
    return res.data;
  },
};
