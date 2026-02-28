import React from "react";
import { Toaster } from "react-hot-toast";
import Register from "../pages/auth/Register";
import Product from "../pages/product/Product";
import Productdetail from "../pages/product/Productdetail";
import User from "../pages/users/User";
import Userdetail from "../pages/users/Userdetail";
import Orderdetails from "../pages/order/Orderdetails";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Myorders from "../pages/order/Myorders";
import About from "../pages/static/About";
import Whishlist from "../pages/whishlist/Whishlist";
import Cart from "../pages/cart/Cart";

const Pagesroutes = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/user-detail/:id" element={<Userdetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-detail/:slug" element={<Productdetail />} />
        <Route path="/my-order" element={<Myorders />} />
        <Route path="/order-detail/:id" element={<Orderdetails />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/whishlist" element={<Whishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default Pagesroutes;
