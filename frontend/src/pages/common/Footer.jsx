import React from "react";
import { Link } from "react-router-dom";
import { 
  IoLogoInstagram, 
  IoLogoPinterest, 
  IoLogoFacebook, 
  IoMailOutline,
  IoCallOutline,
  IoArrowForwardOutline 
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="w-full bg-[#FFFBFB] pt-24 pb-12 border-t border-pink-50">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        
        {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-6 space-y-8">
            <Link to="/" className="inline-block">
              <h3 className="text-3xl font-serif italic text-[#3D2B3D]">
                Navi <span className="not-italic font-light text-[#D16B92]">Clothing.</span>
              </h3>
            </Link>
            <p className="text-lg text-gray-500 font-light leading-relaxed max-w-md">
              Crafting stories in every thread. Join our journey of timeless elegance and modern grace.
            </p>
            
            {/* HIGHLIGHTED SUBSCRIBE BOX */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-[#D16B92] tracking-widest uppercase">Join the Muse</p>
              <div className="relative max-w-md flex items-center bg-white rounded-full p-1.5 shadow-sm border border-pink-50 focus-within:border-[#D16B92] transition-all">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-transparent px-6 py-2 text-sm focus:outline-none placeholder:text-gray-300 text-gray-700"
                />
                <button className="bg-[#D16B92] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#A34D6F] transition-all flex items-center gap-2 shadow-lg shadow-pink-100">
                  Subscribe <IoArrowForwardOutline className="text-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-[14px] font-black text-[#3D2B3D]">Collections</h4>
              <ul className="space-y-4">
                {['New arrivals', 'Daily wear', 'Festive edit', 'Office luxe'].map((item) => (
                  <li key={item}>
                    <Link to="/product" className="text-sm text-gray-500 hover:text-[#D16B92] transition-colors capitalize">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[14px] font-black text-[#3D2B3D]">Services</h4>
              <ul className="space-y-4">
                {['Contact us', 'Shipping policy', 'Returns', 'Privacy'].map((item) => (
                  <li key={item}>
                    <Link to="/" className="text-sm text-gray-500 hover:text-[#D16B92] transition-colors capitalize">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-[14px] font-black text-[#3D2B3D]">Contact</h4>
              <div className="space-y-4">
                <a href="mailto:support@naviclothing.com" className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#D16B92]">
                  <IoMailOutline className="text-lg" />
                  <span className="lowercase">support@naviclothing.com</span>
                </a>
                <a href="tel:+919582379974" className="flex items-center gap-3 text-sm text-gray-500 hover:text-[#D16B92]">
                  <IoCallOutline className="text-lg" />
                  <span>+91 95823 79974</span>
                </a>
                <div className="flex gap-5 pt-4">
                  <IoLogoInstagram className="text-xl text-gray-400 hover:text-[#D16B92] transition-colors cursor-pointer" />
                  <IoLogoPinterest className="text-xl text-gray-400 hover:text-[#D16B92] transition-colors cursor-pointer" />
                  <IoLogoFacebook className="text-xl text-gray-400 hover:text-[#D16B92] transition-colors cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-12 border-t border-pink-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">
            © 2026 Navi Clothing. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 tracking-widest uppercase">Crafted by</span>
            <Link 
              to="https://www.arcoders.com/" 
              className="text-[11px] font-black uppercase tracking-widest text-[#3D2B3D] hover:text-[#D16B92] transition-all relative group"
            >
              Arcoders
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D16B92] group-hover:w-full transition-all duration-500"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;