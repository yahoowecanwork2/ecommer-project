import express from "express";
import { createUnit, deleteUnit, filterUnitBySubject, filterUnitBYSubjectName, getSingleUnit } from "../controllers/unitController.js";
import checkAdmin from "../middleware/checkAdmin.js";


const orderRoutes = express.Router();

// ------------------- user routes ----------------------
// create order 
// get my orders 
// get single order detail 
// udpaet order status (cancel)
// send email to admin regarding to oreder send order id in email 



//---------------------- admin routes ---------------------

// get all orders 
// get single order by id
// update status 
// add tracking id 
// update detail 
// filter by date 
// filter by orderno,pincode 
// filter by status 
// send mail to order owner regarding to order 



export default orderRoutes;