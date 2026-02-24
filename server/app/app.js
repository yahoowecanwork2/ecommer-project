import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dbConnect from "../config/dbConfig.js";
import adminRoutes from "../routes/adminRoute.js";


dbConnect();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);



app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));




app.use("/api/v1/admin", adminRoutes);
// users 
// products
// orders 
app.use("/api/v1/user", adminRoutes);
app.use("/api/v1/product", adminRoutes);
app.use("/api/v1/order", adminRoutes);


export default app;
