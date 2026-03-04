import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
<button
  onClick={scrollToTop}
  className={`fixed bottom-8 right-8 z-50 transition-all duration-300 flex items-center justify-center ${
    visible ? "opacity-100 translate-y-0 bounce-subtle" : "opacity-0 translate-y-6"
  } bg-black text-white w-12 h-12 rounded-full shadow-lg hover:bg-gray-800`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white size-4"
  >
    <path d="m22.586 18.148-9.879-9.879a1.02 1.02 0 0 0-1.414 0L1.42 18.142.006 16.728l9.873-9.873a3.073 3.073 0 0 1 4.243 0L24 16.734Z"></path>
  </svg>
</button>
  );
}
