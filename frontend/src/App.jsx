import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Pagesroutes from "./routes/Pagesroutes";
import ScrollToTop from "./pages/common/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Pagesroutes />
    </>
  );
}

export default App;
