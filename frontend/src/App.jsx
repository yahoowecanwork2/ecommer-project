import {Routes,Route} from "react-router-dom";
// import Home from "./pages/home/Home";
import Header from "./pages/common/Header.jsx";
// import { CategorySection } from "./pages/home/CategorySection.jsx";
// import ProductSection from "./pages/home/ProductSection.jsx";
// import SpecialPackage from "./pages/home/SpecialPackage.jsx";
// import BenefitsPage from "./pages/home/BenefitsPage.jsx";
// import TestimonialPage from "./pages/home/TestimonialPage.jsx";
// import Newsletter from "./pages/home/Newsletter.jsx";
// import AboutUs from "./pages/home/AboutUs.jsx";
import PagesRoutes from "./routes/Pagesroutes.jsx";

function App() {
  return (
    <>
      {/* <ScrollToTop />
      <Pagesroutes /> */}
      <Header/>

      <PagesRoutes/>

      {/* <Home/>
      <CategorySection/>
      <ProductSection/>
      <SpecialPackage/>
      <BenefitsPage/>
      <TestimonialPage/>
      <Newsletter/> */}
      {/* <AboutUs/> */}
    </>
  );
}

export default App;
