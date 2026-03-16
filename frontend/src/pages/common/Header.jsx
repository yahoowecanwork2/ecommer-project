import React, { useState, useEffect } from "react";
import {
  IoBagOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Redux state for cart
  const { items } = useSelector((state) => state.cart);
  const cartCount = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // Scroll effect to change background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl py-3 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)]"
            : "bg-transparent py-5 lg:py-8"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 flex items-center justify-between">
          
          {/* LEFT: Menu Toggle */}
          <div className="flex items-center flex-1">
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-3 text-[#2D1B2D] relative focus:outline-none"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-start">
                <span className="w-5 h-[1.5px] bg-[#2D1B2D] group-hover:bg-[#D16B92] transition-all duration-500"></span>
                <span className="w-3 h-[1.5px] bg-[#2D1B2D] group-hover:bg-[#D16B92] group-hover:w-5 transition-all duration-500"></span>
                <span className="w-5 h-[1.5px] bg-[#2D1B2D] group-hover:bg-[#D16B92] transition-all duration-500"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden lg:block group-hover:text-[#D16B92] transition-colors duration-500">
                Menu
              </span>
            </button>
          </div>

          {/* CENTER: Logo (Responsive Text Size) */}
          <div className="flex-[1.5] lg:flex-[2] text-center">
            <Link
              to="/"
              className={`transition-all duration-500 font-serif italic tracking-tighter ${
                scrolled ? "text-lg md:text-2xl" : "text-xl md:text-3xl"
              } text-[#3D2B3D]`}
            >
              Navi <span className="not-italic font-light text-[#D16B92]">Clothing.</span>
            </Link>
          </div>

          {/* RIGHT: User Actions (Visible on Small Screens) */}
          <div className="flex items-center justify-end gap-4 md:gap-8 flex-1">
            
            {/* Wishlist Icon - Now visible on mobile */}
            <Link to="/wishlist" className="relative group block">
              <IoHeartOutline className="text-[22px] md:text-2xl text-[#3D2B3D] group-hover:text-[#D16B92] transition-colors" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#D16B92] rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <IoBagOutline className="text-[22px] md:text-2xl text-[#3D2B3D] group-hover:text-[#D16B92] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D16B92] text-white text-[7px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login Icon - Now visible on mobile, text hidden on mobile */}
            <Link to="/login" className="flex items-center gap-2 group">
              <IoPersonOutline className="text-[20px] md:text-xl text-[#3D2B3D] group-hover:text-[#D16B92]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D2B3D] group-hover:text-[#D16B92] hidden md:block">
                Login
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* --- SIDE MENU PANEL --- */}
      <div
        className={`fixed inset-0 z-[120] transition-all duration-700 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#2D1B2D]/40 backdrop-blur-sm transition-opacity duration-700 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 w-full max-w-[320px] md:max-w-[400px] h-full bg-[#FCFBF7] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col p-8 md:p-12">
            <div className="flex justify-between items-center mb-12 lg:mb-16">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#D16B92]">
                Explore Edit
              </p>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-100 hover:rotate-90 transition-all duration-500"
              >
                <IoCloseOutline className="text-xl text-gray-400" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 lg:space-y-8">
              {[
                { name: "Home", sub: "Start Fresh" },
                { name: "Product", sub: "The Summer 26'" },
                { name: "About", sub: "Our Heritage" },
                
                { name: "Contact-Us", sub: "Get in Touch" },
                 { name: "Profile", sub: "view details" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="group flex flex-col"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <span className="text-2xl md:text-4xl font-serif italic text-[#3D2B3D] group-hover:text-[#D16B92] transition-colors">
                      {item.name}
                    </span>
                    <span className="h-[1px] w-0 bg-[#D16B92] group-hover:w-8 lg:group-hover:w-12 transition-all"></span>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400 opacity-0 group-hover:opacity-100 transition-all">
                    {item.sub}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-gray-100 space-y-6">
              <div className="space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#D16B92]">
                  Boutique Studio
                </p>
                <p className="text-[11px] text-gray-500 font-light italic leading-relaxed">
                  Heritage Lane, Jaipur, IN
                </p>
              </div>
              <div className="flex gap-5">
                {["IG", "FB", "PT"].map((social) => (
                  <span
                    key={social}
                    className="text-[9px] font-black tracking-widest text-[#3D2B3D] cursor-pointer hover:text-[#D16B92]"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;