import React from "react";
import { Toaster } from "react-hot-toast";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Product from "../pages/product/Product";
import Productdetail from "../pages/product/Productdetail";
import User from "../pages/users/User";
import Userdetail from "../pages/users/Userdetail";
import Resetpassword from "../pages/auth/Resetpassword";
import Orderdetails from "../pages/order/Orderdetails";
import Order from "../pages/order/Order";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";

const Pagesroutes = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/user" element={<User />} />
        <Route path="/user-detail/:id" element={<Userdetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-detail/:id" element={<Productdetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-detail/:id" element={<Orderdetails />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </>
  );
};

export default Pagesroutes;
