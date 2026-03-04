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
import Order from "../pages/order/Order";
import Privacy from "../pages/static/Privacy";
import Shipping from "../pages/static/Shipping";
import Return from "../pages/static/Return";
import Contact from "../pages/static/Contact";

const Pagesroutes = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Register />} />
        <Route path="/user-detail/:id" element={<Userdetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-detail/:slug" element={<Productdetail />} />
        <Route path="/my-order" element={<Myorders />} />
        <Route path="/order-detail/:id" element={<Orderdetails />} />
        {/* <Route path="/dashboard" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Whishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />

        {/* Static Pages */}
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/shipping-policy" element={<Shipping />} />
        <Route path="/return-policy" element={<Return />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default Pagesroutes;
