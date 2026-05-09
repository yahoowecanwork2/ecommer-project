import React from "react";
import { Link } from "react-router-dom";
import {
  IoLogoInstagram,
  IoLogoPinterest,
  IoLogoFacebook,
  IoMailOutline,
  IoCallOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-20 lg:pt-28 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="inline-block">
              <h3 className="text-3xl font-serif italic text-[#1a1a1a]">
                Navi{" "}
                <span className="not-italic font-light text-[#c9a07a]">
                  Clothing.
                </span>
              </h3>
            </Link>
            <p className="text-gray-500 font-light leading-relaxed max-w-sm">
              Redefining everyday fashion with handcrafted elegance. Join our
              community of bold and confident women who value timeless grace.
            </p>

            {/* SUBSCRIBE BOX */}
            <div className="space-y-4 pt-4">
              <p className="text-[10px] font-bold text-[#c9a07a] tracking-[0.3em] uppercase">
                Join the Muse
              </p>
              <div className="relative max-w-md flex items-center border-b border-gray-200 focus-within:border-[#c9a07a] transition-all pb-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent py-2 text-sm focus:outline-none placeholder:text-gray-300 text-gray-700"
                />
                <button className="text-[#1a1a1a] hover:text-[#c9a07a] transition-colors p-2">
                  <IoArrowForwardOutline className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* QUICK LINKS SECTION */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            {/* Collections */}
            <div className="space-y-6">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                Collections
              </h4>
              <ul className="space-y-4">
                {["Anarkali", "Straight Cut", "ChikanKari", "Short Kurtis"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="/shop"
                        className="text-[13px] text-gray-500 hover:text-[#c9a07a] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Assistance */}
            <div className="space-y-6">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                Assistance
              </h4>
              <ul className="space-y-4">
                {[
                  "Shipping Policy",
                  "Return Policy",
                  "Privacy Policy",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-[13px] text-gray-500 hover:text-[#c9a07a] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                Connect
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:support@naviclothing.com"
                  className="flex items-center gap-3 text-[13px] text-gray-500 hover:text-[#c9a07a] transition-colors"
                >
                  <IoMailOutline className="text-lg flex-shrink-0" />
                  <span className="break-all">support@naviclothing.com</span>
                </a>
                <a
                  href="tel:+918178499959"
                  className="flex items-center gap-3 text-[13px] text-gray-500 hover:text-[#c9a07a] transition-colors"
                >
                  <IoCallOutline className="text-lg flex-shrink-0" />
                  <span>+91 8178499959</span>
                </a>
                <div className="flex gap-6 pt-4">
                  <IoLogoInstagram className="text-xl text-gray-400 hover:text-[#c9a07a] transition-all cursor-pointer hover:-translate-y-1" />
                  <IoLogoPinterest className="text-xl text-gray-400 hover:text-[#c9a07a] transition-all cursor-pointer hover:-translate-y-1" />
                  <IoLogoFacebook className="text-xl text-gray-400 hover:text-[#c9a07a] transition-all cursor-pointer hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">
            © 2026 Navi Clothing. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 tracking-widest uppercase italic font-light">
              Crafted by
            </span>
            <a
              href="https://www.arcoders.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a] hover:text-[#c9a07a] transition-all"
            >
              Arcoders
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
