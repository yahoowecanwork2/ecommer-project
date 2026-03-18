import React from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Return = () => {
  return (
    <div className="font-sans bg-white">
      <Header />

      {/* --- HERO: CLEAN & MINIMAL --- */}
      <section className="pt-44 pb-20 bg-[#fdfaf7]">
        <div className="max-w-5xl mx-auto px-8 text-center space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a07a]">Care & Assurance</p>
          <h1 className="text-5xl md:text-6xl font-serif italic text-[#1a1a1a]">Return & Refund</h1>
          <div className="w-12 h-[1px] bg-[#c9a07a] mx-auto mt-4"></div>
          <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed pt-4">
            We want you to love what you wear. If something isn’t quite right, our return process is designed to be as effortless as our style.
          </p>
        </div>
      </section>

      {/* --- CONTENT: EDITORIAL LIST --- */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-8 space-y-20">
          
          {/* 01. Eligibility */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              01. Return Eligibility
            </h2>
            <ul className="space-y-4 text-lg text-gray-500 font-light">
              <li className="flex gap-4">
                <span className="text-[#c9a07a] font-serif italic">—</span>
                <span>Returns must be requested within 7 days of delivery.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#c9a07a] font-serif italic">—</span>
                <span>Items must be unused, unwashed, and in their original pristine condition.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#c9a07a] font-serif italic">—</span>
                <span>All original tags and packaging must remain intact.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#c9a07a] font-serif italic">—</span>
                <span className="text-sm italic text-gray-400">Products purchased during clearance sales may not be eligible for returns.</span>
              </li>
            </ul>
          </div>

          {/* 02. Process */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              02. How to Request
            </h2>
            <div className="space-y-8 pt-2">
              {[
                { step: "01", title: "Contact Support", desc: "Reach out to our concierge team with your order number." },
                { step: "02", title: "Guidance", desc: "Our team will provide you with easy-to-follow return instructions." },
                { step: "03", title: "Inspection", desc: "Once we receive and inspect the item, your refund will be initiated." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <span className="text-2xl font-serif italic text-gray-200 group-hover:text-[#c9a07a] transition-colors">{item.step}</span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">{item.title}</h4>
                    <p className="text-gray-500 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 03. Refunds */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              03. Refunds
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              Upon successful inspection, refunds are processed within <span className="text-[#c9a07a] font-medium">5–7 business days</span>. 
              The amount will be credited back to your original payment method.
            </p>
          </div>

          {/* 04. Non-Returnable */}
          <div className="space-y-6 bg-[#fdfaf7] p-10 rounded-[40px] border border-gray-50">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">Non-Returnable Items</h2>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li>• Items marked as Final Sale</li>
              <li>• Products damaged due to misuse or wear</li>
              <li>• Items returned without original luxury packaging</li>
            </ul>
          </div>

          {/* 05. Support */}
          <div className="pt-12 border-t border-gray-100 text-center space-y-6">
            <h2 className="text-2xl font-serif italic text-[#1a1a1a]">Need Assistance?</h2>
            <p className="text-gray-500 font-light max-w-md mx-auto">
              Our support muses are available to answer any questions regarding your returns.
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

export default Return;