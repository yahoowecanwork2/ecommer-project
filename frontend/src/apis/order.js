// order apis
import { api } from "./index";

export const orderApi = {
  checkOut: async (amount) => {
    const res = await api.post("/order/checkout", amount);
    return res.data;
  },

  // create order
  placeOrder: async (data) => {
    const res = await api.post("/order/create", data);
    return res.data;
  },
  // get myorder

  myOrder: async () => {
    const res = await api.get("/order/get-my");
    return res.data;
  },
  // single order
  myOrderSingle: async (orderId) => {
    const res = await api.get(`/order/get-single/${orderId}`);
    return res.data;
  },
  myOrderStatus: async (orderId, data) => {
    const res = await api.put(`/order/user-update-status/${orderId}`, data);
    return res.data;
  },

  // ------------------------- cart apis -------------------------------------
  myOrders: async () => {
    const res = await api.get("/order/my-cart");
    return res.data;
  },

  //   get single order
  mySingleOrder: async () => {
    const res = await api.get(`/order/get-single/${orderId}`);
    return res.data;
  },
};
