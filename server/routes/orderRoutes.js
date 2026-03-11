import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  allUsersOrders,
  checkoutPayment,
  createOrder,
  filterByCancelStatus,
  filterByReturnStatus,
  filterByStatus,
  filterOrderByDate,
  getMyOrders,
  getSingleOrder,
  getUserOrderById,
  orderStats,
  updateOrderCancelStatus,
  updateOrderStatus,
  updateReturnStatus,
} from "../controllers/orderController.js";
import checkAdmin from "../middleware/checkAdmin.js";

const orderRoutes = express.Router();

// --------------------------------------- user routes -------------------------------------
orderRoutes.post("/checkout", isAuthenticated, checkoutPayment);
orderRoutes.post("/create", isAuthenticated, createOrder);
orderRoutes.get("/get-my", isAuthenticated, getMyOrders);
orderRoutes.get("/get-single/:orderId", isAuthenticated, getSingleOrder);
orderRoutes.put(
  "/user-update-status/:orderId",
  isAuthenticated,
  updateOrderCancelStatus,
);

//------------------------------------ admin routes -------------------------------------
orderRoutes.get("/stats", checkAdmin, orderStats);
orderRoutes.get("/admin/get-all", checkAdmin, allUsersOrders);
orderRoutes.get("/admin/get-single/:orderId", checkAdmin, getUserOrderById);
orderRoutes.post("/admin/filter-by-status", checkAdmin, filterByStatus);
orderRoutes.post("/admin/filter-by-date", checkAdmin, filterOrderByDate);
orderRoutes.get(
  "/admin/filter-by-returnstatus/:returnstatus",
  checkAdmin,
  filterByReturnStatus,
);
orderRoutes.get(
  "/admin/filter-by-cancel-status/:cancelstatus",
  checkAdmin,
  filterByCancelStatus,
);
orderRoutes.get("/admin/update-status/:orderId", checkAdmin, updateOrderStatus);
orderRoutes.get(
  "/admin/update-return-status/:orderId",
  checkAdmin,
  updateReturnStatus,
);

export default orderRoutes;
