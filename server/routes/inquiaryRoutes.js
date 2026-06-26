import express from "express";
import {
  createInquiry,
  filterByStatus,
  getAllInquiries,
  updateInquiryStatus,
} from "../controllers/inquiryController.js";

const inquiryRoutes = express.Router();
inquiryRoutes.post("/create", createInquiry);
inquiryRoutes.get("/all", getAllInquiries);
inquiryRoutes.get("/filter", filterByStatus);
inquiryRoutes.put("/status/:id", updateInquiryStatus);

export default inquiryRoutes;
