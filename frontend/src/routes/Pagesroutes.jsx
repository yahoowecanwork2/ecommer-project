// import React, { lazy } from "react";
// import { Toaster } from "react-hot-toast";
// import Register from "../pages/auth/Register";
// import { Route, Routes } from "react-router-dom";
// import Protectedroutes from "../middleware/Protectedroutes";
// import About from "../pages/static/About";
// import Order from "../pages/order/Order";
// import Privacy from "../pages/static/Privacy";
// import Shipping from "../pages/static/Shipping";
// import Return from "../pages/static/Return";
// import Contact from "../pages/static/Contact";
// import Profile from "../pages/profile/Profile";
// import Size from "../pages/size/Size";
// const User = lazy(() => import("../pages/users/User"));
// const Userdetail = lazy(() => import("../pages/users/Userdetail"));
// const Product = lazy(() => import("../pages/product/Product"));
// const Productdetail = lazy(() => import("../pages/product/Productdetail"));
// const Orderdetails = lazy(() => import("../pages/order/Orderdetails"));
// const Home = lazy(() => import("../pages/home/Home"));
// const Myorders = lazy(() => import("../pages/order/Myorders"));
// // const Order = lazy(() => import("../pages/users/User"));
// const Whishlist = lazy(() => import("../pages/whishlist/Whishlist"));
// const Cart = lazy(() => import("../pages/cart/Cart"));

// const Pagesroutes = () => {
//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <Routes>
//         {/* Static Pages */}
//         <Route path="/login" element={<Register />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/privacy-policy" element={<Privacy />} />
//         <Route path="/shipping-policy" element={<Shipping />} />
//         <Route path="/return-policy" element={<Return />} />
//         <Route path="/contact-us" element={<Contact />} />
//         {/* private pages */}
//         <Route
//           path="/user"
//           element={
//             <Protectedroutes>
//               <User />
//             </Protectedroutes>
//           }
//         />
//         <Route
//           path="/user-detail/:id"
//           element={
//             <Protectedroutes>
//               <Userdetail />
//             </Protectedroutes>
//           }
//         />
//         <Route
//           path="/product"
//           element={
//             // <Protectedroutes>
//             <Product />
//             // </Protectedroutes>
//           }
//         />
//         <Route
//           path="/product-detail/:slug"
//           element={
//             // <Protectedroutes>
//             <Productdetail />
//             // </Protectedroutes>
//           }
//         />
//         <Route
//           path="/my-order"
//           element={
//             <Protectedroutes>
//               <Myorders />
//             </Protectedroutes>
//           }
//         />
//         <Route
//           path="/order-detail/:orderId"
//           element={
//             <Protectedroutes>
//               <Orderdetails />
//             </Protectedroutes>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <Protectedroutes>
//               <About />
//             </Protectedroutes>
//           }
//         />
//         <Route
//           path="/wishlist"
//           element={
//             <Protectedroutes>
//               <Whishlist />
//             </Protectedroutes>
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <Protectedroutes>
//               <Cart />
//             </Protectedroutes>
//           }
//         />
//         <Route
//           path="/order"
//           element={
//             <Protectedroutes>
//               <Order />
//             </Protectedroutes>
//           }
//         />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/Size" element={<Size />} />
//       </Routes>
//     </>
//   );
// };

// export default Pagesroutes;

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import AboutUs from "../pages/Home/AboutUs";
import { CategorySection } from "../pages/Home/CategorySection";
import ProductSection from "../pages/Home/ProductSection";
import SpecialPackage from "../pages/Home/SpecialPackage";
import BenefitsPage from "../pages/Home/BenefitsPage";
import TestimonialPage from "../pages/Home/TestimonialPage";
import Newsletter from "../pages/Home/Newsletter";
import Contact from "../pages/home/Contact";
import CategoryPage from "../pages/home/CategoryPage";
import ProductPage from "../pages/home/ProductPage";
import Register from "../pages/auth/Register";
import InqueryForm from "../pages/inquery/InqueryForm";

export default function PagesRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
            <CategorySection />
            <ProductSection />
            <SpecialPackage />
            <BenefitsPage />
            <TestimonialPage />
            <Newsletter />
          </>
        }
      />
      <Route path="/login" element={<Register />} />
      <Route path="/about" element={<AboutUs />} />
      {/* <Route path="/products" element={<Products />} />
     <Route path="/categories" element={<Categories />} /> */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/inquiry" element={<InqueryForm />} />
    </Routes>
  );
}

// <Route path="/" element={<Home />} />
//       <Route path="/about" element={<AboutUs />} />
//
