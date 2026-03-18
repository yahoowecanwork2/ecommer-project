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
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user, auth } = useSelector((state) => state.user);
  const cartCount = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount =
    wishlistItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
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
            ? "bg-white/90 backdrop-blur-xl py-3 shadow-sm"
            : "bg-transparent py-5 lg:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* LEFT: Menu Toggle */}
          <div className="flex items-center flex-1">
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-3 text-[#1a1a1a] relative focus:outline-none"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-start">
                <span className="w-5 h-[1.2px] bg-[#1a1a1a] group-hover:bg-[#c9a07a] transition-all duration-500"></span>
                <span className="w-3 h-[1.2px] bg-[#1a1a1a] group-hover:bg-[#c9a07a] group-hover:w-5 transition-all duration-500"></span>
                <span className="w-5 h-[1.2px] bg-[#1a1a1a] group-hover:bg-[#c9a07a] transition-all duration-500"></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] hidden lg:block group-hover:text-[#c9a07a] transition-colors duration-500">
                Menu
              </span>
            </button>
          </div>

          {/* CENTER: Logo */}
          <div className="flex-[1.5] lg:flex-[2] text-center">
            <Link
              to="/"
              className={`transition-all duration-500 font-serif italic tracking-tighter ${
                scrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
              } text-[#1a1a1a]`}
            >
              Navi{" "}
              <span className="not-italic font-light text-[#c9a07a]">
                Clothing.
              </span>
            </Link>
          </div>

          {/* RIGHT: User Actions */}
          <div className="flex items-center justify-end gap-4 md:gap-8 flex-1">
            <Link to="/wishlist" className="relative group flex items-center">
              <IoHeartOutline
                className={`text-[22px] md:text-[24px] transition-colors ${
                  wishlistCount > 0
                    ? "text-[#c9a07a]" // active color
                    : "text-[#1a1a1a]"
                } group-hover:text-[#c9a07a]`}
              />

              {/* Badge */}
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#c9a07a] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative group flex items-center">
              <IoBagOutline className="text-[22px] md:text-[24px] text-[#1a1a1a] group-hover:text-[#c9a07a] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#c9a07a] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/profile" className="flex items-center gap-2 group">
              <IoPersonOutline className="text-[20px] md:text-[22px] text-[#1a1a1a] group-hover:text-[#c9a07a]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a] group-hover:text-[#c9a07a] hidden md:block">
                {auth && user?.name ? user.name : "Account"}
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
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-700 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 w-full max-w-[320px] md:max-w-[380px] h-full bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col p-10 md:p-14">
            <div className="flex justify-between items-center mb-16">
              <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#c9a07a]">
                The Navi Edit
              </p>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-100 hover:rotate-90 transition-all duration-500"
              >
                <IoCloseOutline className="text-xl text-gray-400" />
              </button>
            </div>

            <nav className="flex flex-col space-y-8">
              {[
                { name: "Home", sub: "Back to start", path: "/" },
                { name: "Shop", sub: "Explore Collections", path: "/product" },
                {
                  name: "Size Guide",
                  sub: "Find your fit",
                  path: "/Size",
                },
                {
                  name: "Customer Care",
                  sub: "How can we help?",
                  path: "/contact-us",
                },
                {
                  name: "Profile",
                  sub: "Your account details",
                  path: "/profile",
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="group flex flex-col"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl md:text-4xl font-serif italic text-[#1a1a1a] group-hover:text-[#c9a07a] transition-colors">
                      {item.name}
                    </span>
                    <span className="h-[1px] w-0 bg-[#c9a07a] group-hover:w-8 transition-all"></span>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400 opacity-0 group-hover:opacity-100 transition-all mt-1">
                    {item.sub}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <div className="space-y-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#c9a07a]">
                  Follow Us
                </p>
                <div className="flex gap-6">
                  {["Instagram", "Pinterest", "Facebook"].map((social) => (
                    <span
                      key={social}
                      className="text-[10px] font-medium tracking-widest text-[#1a1a1a] cursor-pointer hover:text-[#c9a07a] uppercase"
                    >
                      {social.substring(0, 2)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
