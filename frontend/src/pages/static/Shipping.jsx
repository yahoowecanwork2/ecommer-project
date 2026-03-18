import React from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Shipping = () => {
  return (
    <div className="font-sans bg-white">
      <Header />

      {/* --- HERO: CLEAN & SIMPLE --- */}
      <section className="pt-44 pb-20 bg-[#fdfaf7]">
        <div className="max-w-5xl mx-auto px-8 text-center space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a07a]">Information</p>
          <h1 className="text-5xl md:text-6xl font-serif italic text-[#1a1a1a]">Shipping Policy</h1>
          <div className="w-12 h-[1px] bg-[#c9a07a] mx-auto mt-4"></div>
          <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed pt-4">
            We aim to deliver your orders safely and quickly. Below are the details regarding our logistics process.
          </p>
        </div>
      </section>

      {/* --- CONTENT: CLEAN LIST STYLE --- */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-8 space-y-20">
          
          {/* 01. Order Processing */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              01. Order Processing
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              All orders are processed within 24–48 hours after confirmation. 
              Orders placed on weekends or public holidays will be processed on the next working day.
            </p>
          </div>

          {/* 02. Delivery Timeline */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              02. Delivery Timeline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#c9a07a]">Metro Cities</p>
                <p className="text-gray-500 font-light italic">2–4 business days</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#c9a07a]">Other Cities</p>
                <p className="text-gray-500 font-light italic">3–6 business days</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[11px] text-gray-400 italic">* Remote locations may take slightly longer.</p>
              </div>
            </div>
          </div>

          {/* 03. Shipping Charges */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              03. Shipping Charges
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              We offer <span className="text-[#c9a07a] font-medium">Free Shipping</span> on all prepaid orders. 
              A small shipping fee may apply for Cash on Delivery (COD) orders depending on the location.
            </p>
          </div>

          {/* 04. Order Tracking */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              04. Order Tracking
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              Once your order is shipped, you will receive a tracking link via email or SMS so you can follow the delivery status of your package.
            </p>
          </div>

          {/* 05. Need Help? */}
          <div className="pt-12 border-t border-gray-100 text-center space-y-6">
            <h2 className="text-2xl font-serif italic text-[#1a1a1a]">Need Help?</h2>
            <p className="text-gray-500 font-light max-w-md mx-auto">
              If your order is delayed or you face any issues with delivery, please contact our support team.
            </p>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email us at</p>
              <a href="mailto:support@naviclothing.com" className="text-xl font-serif text-[#c9a07a] hover:text-[#1a1a1a] transition-colors">
                support@naviclothing.com
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shipping;