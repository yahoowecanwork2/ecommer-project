import React from "react";
import { Toaster } from "react-hot-toast";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Resetpassword from "../pages/auth/Resetpassword";
import { Route, Routes } from "react-router-dom";
import Protectedroutes from "../middleware/Protectedroutes";

const User = lazy(()=> import("../pages/users/User"))
const Product = lazy(()=> import("../pages/product/Product"))
const Productdetail = lazy(()=> import("../pages/product/Productdetail"))
const Userdetail = lazy(()=> import("../pages/users/Userdetail"))
const Order = lazy(()=> import("../pages/order/Order"))
const Orderdetails = lazy(()=> import("../pages/order/Orderdetails"))
const Home = lazy(()=> import("../pages/home/Home"))
const PlansAndBilling = lazy(()=> import("../pages/plans/PlansAndBilling"))
const Billing = lazy(()=> import("../pages/billinghistory/Billing"))
const Profile = lazy(()=> import("../pages/profile/Profile"))



const Pagesroutes = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/user" element={
          <Protectedroutes>
            <User />
          </Protectedroutes>
          } />
        <Route path="/user-detail/:id" element={
          <Protectedroutes>
            <Userdetail />
          </Protectedroutes>
          } />
        <Route path="/product" element={
          <Protectedroutes>
            <Product />
          </Protectedroutes>
          } />
        <Route path="/product-detail/:id" element={
          <Protectedroutes>
            <Productdetail />
          </Protectedroutes>
          } />
        <Route path="/order" element={
          <Protectedroutes>
            <Order />
          </Protectedroutes>
          } />
        <Route path="/order-detail/:id" element={
          <Protectedroutes>
            <Orderdetails />
          </Protectedroutes>
          } />
        <Route path="/dashboard" element={
          <Protectedroutes>
            <Home />
          </Protectedroutes>
          } />
        <Route path="/plans" element={
          <Protectedroutes>
            <PlansAndBilling />
          </Protectedroutes>
          } />
        <Route path="/history" element={
          <Protectedroutes>
            <Billing />
          </Protectedroutes>
          } />
        <Route path="/profile" element={
          <Protectedroutes>
            <Profile />
          </Protectedroutes>
          } />
        {/* <Route path="/payments" element={<Payments />} /> */}
      </Routes>
    </>
  );
};

export default Pagesroutes;
