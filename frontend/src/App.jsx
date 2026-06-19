import Home from "./pages/home/Home";
import Header from "./pages/common/Header.jsx";
import { CategorySection } from "./pages/components/categorySection.jsx";

function App() {
  return (
    <>
      {/* <ScrollToTop />
      <Pagesroutes /> */}
      <Header/>

      <Home/>
      <CategorySection/>
    </>
  );
}

export default App;
