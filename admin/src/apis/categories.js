import { api } from ".";

export const categoriesApi = {
  create: async (data) => {
    const res = await api.post("/category/create", data);
    return res.data;
  },
  get: async () => {
    const res = await api.get("/category/get-all");
    return res.data;
  },
  getByName: async () => {
    const res = await api.get("/category/get-name");
    return res.data;
  },
};
