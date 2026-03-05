// order apis
import { api } from ".";

export const orderApis = {
  // stats
  // get all
  // get single
  // filter by status
  // filter by date
  // filter by return status
  // filter by cancel status
  // filter byupdaet status
  // update status
  // updaet return status

  stats: async () => {
    const res = await api.get("/order/stats");
    return res.data;
  },

  getAll: async () => {
    const res = await api.get("/order/admin/get-all");
    return res.data;
  },
  getSingle: async (orderId) => {
    // console.log(orderId)
    const res = await api.get(`/order/admin/get-single/${orderId}`);
    console.log(res);
    return res.data;
  },

  filterByStatus: async () => {
    const res = await api.get("/order/admin/filter-by-status");
    return res.data;
  },
  filterByDate: async () => {
    const res = await api.get("/order/admin/filter-by-date");
    return res.data;
  },
  filterByReturnStatus: async () => {
    const res = await api.get("/order/admin/filter-by-returnstatus");
    return res.data;
  },
  filterBYCancelStatus: async () => {
    const res = await api.get("/order/admin/filter-by-cancel-status");
    return res.data;
  },

  updateStatus: async (orderId) => {
    const res = await api.get(`/order/admin/update-status/${orderId}`);
    return res.data;
  },

  updateReturnStatus: async (orderId) => {
    const res = await api.get(`/order/admin/update-return-status/${orderId}`);
    return res.data;
  },
};
