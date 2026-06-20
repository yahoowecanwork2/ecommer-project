import Home from "./pages/home/Home";
import Header from "./pages/common/Header.jsx";
import { CategorySection } from "./pages/home/CategorySection.jsx";
import ProductSection from "./pages/home/ProductSection.jsx";
import SpecialPackage from "./pages/home/SpecialPackage.jsx";

function App() {
  return (
    <>
      {/* <ScrollToTop />
      <Pagesroutes /> */}
      <Header/>

      <Home/>
      <CategorySection/>
      <ProductSection/>
      <SpecialPackage/>
    </>
  );
}

export default App;
