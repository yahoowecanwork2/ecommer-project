import { api } from ".";

export const inquiryApis = {
    getAll: async () => {
    const res = await api.get("/inquiry/all");
    return res.data;
  },
}