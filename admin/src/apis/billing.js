import { api } from ".";

export const billingApi = {
  get: async () => {
    const res = await api.get("/payment/get-all");
    return res.data;
  },
  getByName: async () => {
    const res = await api.get("/category/get-name");
    return res.data;
  },
};
