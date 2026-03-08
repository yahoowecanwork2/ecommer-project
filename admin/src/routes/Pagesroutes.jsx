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
import PlansAndBilling from "../pages/plans/PlansAndBilling";
import Billing from "../pages/billinghistory/Billing";
import Profile from "../pages/profile/Profile";

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
        <Route path="/plans" element={<PlansAndBilling />} />
        <Route path="/history" element={<Billing />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/payments" element={<Payments />} /> */}
      </Routes>
    </>
  );
};

export default Pagesroutes;
