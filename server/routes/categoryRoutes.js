import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryNames,
  updateCategory,
} from "../controllers/categoryController.js";
import checkAdmin from "../middleware/checkAdmin.js";
import { uploadProducts } from "../middleware/uploadProducts.js";

const categoryRoutes = express.Router();

// ------------------- user routes ----------------------
// get all
categoryRoutes.get("/get-name", getCategoryNames);
categoryRoutes.get("/get-all", getCategories);

//---------------------- admin routes ---------------------
// create
// get category names and slug
categoryRoutes.post(
  "/create",
  checkAdmin,
  uploadProducts, // 👈 ADD THIS
  createCategory,
);
categoryRoutes.put("/update-name/:categoryId", checkAdmin, updateCategory);

export default categoryRoutes;
