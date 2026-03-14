import React, { lazy } from "react";
import { Toaster } from "react-hot-toast";
import Register from "../pages/auth/Register";
import { Route, Routes } from "react-router-dom";
import Protectedroutes from "../middleware/Protectedroutes";
import About from "../pages/static/About";
import Order from "../pages/order/Order";
import Privacy from "../pages/static/Privacy";
import Shipping from "../pages/static/Shipping";
import Return from "../pages/static/Return";
import Contact from "../pages/static/Contact";
import Profile from "../pages/profile/Profile";
const User = lazy(() => import("../pages/users/User"));
const Userdetail = lazy(() => import("../pages/users/Userdetail"));
const Product = lazy(() => import("../pages/product/Product"));
const Productdetail = lazy(() => import("../pages/product/Productdetail"));
const Orderdetails = lazy(() => import("../pages/order/Orderdetails"));
const Home = lazy(() => import("../pages/home/Home"));
const Myorders = lazy(() => import("../pages/order/Myorders"));
// const Order = lazy(() => import("../pages/users/User"));
const Whishlist = lazy(() => import("../pages/whishlist/Whishlist"));
const Cart = lazy(() => import("../pages/cart/Cart"));

const Pagesroutes = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Static Pages */}
        <Route path="/login" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/shipping-policy" element={<Shipping />} />
        <Route path="/return-policy" element={<Return />} />
        <Route path="/contact" element={<Contact />} />
        {/* private pages */}
        <Route
          path="/user"
          element={
            <Protectedroutes>
              <User />
            </Protectedroutes>
          }
        />
        <Route
          path="/user-detail/:id"
          element={
            <Protectedroutes>
              <Userdetail />
            </Protectedroutes>
          }
        />
        <Route
          path="/product"
          element={
            <Protectedroutes>
              <Product />
            </Protectedroutes>
          }
        />
        <Route
          path="/product-detail/:slug"
          element={
            <Protectedroutes>
              <Productdetail />
            </Protectedroutes>
          }
        />
        <Route
          path="/my-order"
          element={
            <Protectedroutes>
              <Myorders />
            </Protectedroutes>
          }
        />
        <Route
          path="/order-detail/:orderId"
          element={
            <Protectedroutes>
              <Orderdetails />
            </Protectedroutes>
          }
        />
        <Route
          path="/about"
          element={
            <Protectedroutes>
              <About />
            </Protectedroutes>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Protectedroutes>
              <Whishlist />
            </Protectedroutes>
          }
        />
        <Route
          path="/cart"
          element={
            <Protectedroutes>
              <Cart />
            </Protectedroutes>
          }
        />
        <Route
          path="/order"
          element={
            <Protectedroutes>
              <Order />
            </Protectedroutes>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Pagesroutes;
