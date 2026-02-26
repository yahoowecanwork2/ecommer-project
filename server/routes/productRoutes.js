import express from "express";
import checkAdmin from "../middleware/checkAdmin.js";
import { createProduct, getProductBySlug, userGetProducts, userGetProductsByCategoy } from "../controllers/productController.js";



const productRoutes = express.Router();


//------------------- user routes -------------------------
// get all products 
// filter by category 
// filter by name 
// get single 
productRoutes.get("/all",userGetProducts)
productRoutes.get("/filter-by-cat/:categoryId",userGetProductsByCategoy)
productRoutes.get("/get-single/:slug",getProductBySlug)


// ------------------ admin routes -------------------------
// create 
// get all 
// get single 
// update all fileds 
// update limited fileds 
// delete product 

// filter by category 
// filter by name 
// filter by availabel status 
// filter by stock count 
productRoutes.post("/create",checkAdmin,createProduct)
productRoutes.post("/create",checkAdmin,)
productRoutes.post("/create",checkAdmin,)
productRoutes.post("/create",checkAdmin,)



export default productRoutes;

