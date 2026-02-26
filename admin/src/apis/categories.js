import { api } from ".";

export const categoriesApi = {
  create: async (data) => {
    const res = await api.post("/categorys/create", data);
    return res.data;
  },
  get: async () => {
    const res = await api.get("/categorys/get-all");
    return res.data;
  },
};
