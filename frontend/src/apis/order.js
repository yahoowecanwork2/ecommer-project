// order apis 
import { api } from "./index";

export const orderApi = {
  
checkOut: async () => {
    const res = await api.post("/user/checkout");
    return res.data;
  },



  placeOrder: async () => {
    const res = await api.post("/order/send-mail");
    return res.data;
  },


  // ------------------------- cart apis -------------------------------------
   myOrders: async () => {
    const res = await api.get("/user/my-cart");
    return res.data;
  },

//   get single rder 
  


};
