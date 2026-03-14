import express from "express";
import checkAdmin from "../middleware/checkAdmin.js";
import {
  adminGetProducts,
  adminGetProductsByCategory,
  adminGetProductsByKeyword,
  adminGetSingleProduct,
  createProduct,
  deleteProduct,
  filterProduct,
  filterProductByName,
  getProductBySlug,
  updateProductFields,
  updateProductImages,
  updateProductRefund,
  updateProductStock,
  userGetProducts,
  userGetProductsByCategoy,
} from "../controllers/productController.js";
import { uploadProducts } from "../middleware/uploadProducts.js";

const productRoutes = express.Router();

//------------------- user routes -------------------------
// get all products
// filter by category
// filter by name
// get single
productRoutes.get("/all", userGetProducts);
productRoutes.get("/filter-by-cat/:categoryId", userGetProductsByCategoy);
productRoutes.get("/filter/:keyword", filterProduct);
productRoutes.get("/filter-by/:name", filterProductByName);
productRoutes.get("/get-single/:slug", getProductBySlug);

// ------------------ admin routes -------------------------
productRoutes.post("/create", checkAdmin, uploadProducts, createProduct);
productRoutes.get("/admin/get-all", checkAdmin, adminGetProducts);
productRoutes.get(
  "/admin/filter/:keyword",
  checkAdmin,
  adminGetProductsByKeyword,
);
productRoutes.get(
  "/admin/filter-by-cat/:categoryId",
  checkAdmin,
  adminGetProductsByCategory,
);
productRoutes.get(
  "/admin/get-single/:productId",
  checkAdmin,
  adminGetSingleProduct,
);
productRoutes.put(
  "/admin/update-fields/:productId",
  checkAdmin,
  updateProductFields,
);
productRoutes.put(
  "/admin/update-images/:productId",
  checkAdmin,
  uploadProducts,
  updateProductImages,
);
productRoutes.put(
  "/admin/update-stock/:productId",
  checkAdmin,
  updateProductStock,
);
productRoutes.put(
  "/admin/update-refund/:productId",
  checkAdmin,
  updateProductRefund,
);
productRoutes.delete("/admin/delete/:productId", checkAdmin, deleteProduct);

export default productRoutes;
