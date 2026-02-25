import express from "express";
import { allPayments, filterPayment } from "../controllers/paymentController.js";



const paymentRoutes = express.Router();


//---------------------- admin routes ---------------------
paymentRoutes.get("/get-all",allPayments)
paymentRoutes.get("/filter/:search",filterPayment)




export default paymentRoutes;