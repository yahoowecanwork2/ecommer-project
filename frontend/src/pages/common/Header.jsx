import React, { useState, useEffect } from "react";
import {
  IoMenuOutline,
  IoBagOutline,
  IoSearchOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll effect to change background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-lg py-3 shadow-sm" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: Menu & Search (Desktop) */}
        <div className="flex items-center gap-6 flex-1">
          <button 
            onClick={() => setMenuOpen(true)}
            className="group flex items-center gap-2 text-[#3D2B3D] hover:text-[#D16B92] transition-colors"
          >
            <IoMenuOutline className="text-2xl" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden lg:block">Menu</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-2 text-gray-400 group cursor-pointer">
            <IoSearchOutline className="text-xl group-hover:text-[#D16B92] transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-[#D16B92]">Search</span>
          </div>
        </div>

        {/* CENTER: Logo (Luxury Typography) */}
        <div className="flex-[2] text-center">
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-serif italic tracking-tighter text-[#3D2B3D]"
          >
            Navi <span className="not-italic font-light text-[#D16B92]">Clothing.</span>
          </Link>
        </div>

        {/* RIGHT: User Actions */}
        <div className="flex items-center justify-end gap-5 md:gap-8 flex-1">
          <Link to="/wishlist" className="relative group hidden sm:block">
            <IoHeartOutline className="text-2xl text-[#3D2B3D] group-hover:text-[#D16B92] transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D16B92] rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
          </Link>

          <Link to="/cart" className="relative group">
            <IoBagOutline className="text-2xl text-[#3D2B3D] group-hover:text-[#D16B92] transition-colors" />
            <span className="absolute -top-2 -right-2 bg-[#D16B92] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-lg shadow-pink-200">
              0
            </span>
          </Link>

          <Link to="/login" className="hidden lg:flex items-center gap-2 group">
            <IoPersonOutline className="text-xl text-[#3D2B3D] group-hover:text-[#D16B92]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3D2B3D] group-hover:text-[#D16B92]">Login</span>
          </Link>
        </div>
      </div>

      {/* --- MOBILE/SIDE MENU OVERLAY --- */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 z-[110] ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-[300px] h-full bg-white p-10 transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-black"
          >
            <IoCloseOutline />
          </button>

          <div className="mt-12 space-y-8">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D16B92]">Navigation</p>
            <nav className="flex flex-col gap-6">
              {["Home", "About", "Shop", "Collections", "Contact"].map((item) => (
                <Link 
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-2xl font-serif italic text-[#3D2B3D] hover:text-[#D16B92] transition-all hover:pl-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="pt-12 border-t border-pink-50">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Join our Muse</p>
              <p className="text-[11px] mt-2 text-gray-500">Subscribe for early access to summer drops.</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;