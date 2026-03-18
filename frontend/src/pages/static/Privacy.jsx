import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Privacy = () => {
  return (
    <div className="font-sans bg-white selection:bg-[#c9a07a] selection:text-white">
      <Header />

      {/* --- HERO: MINIMALIST & BOLD --- */}
      <section className="pt-44 pb-20 bg-[#fdfaf7]">
        <div className="max-w-5xl mx-auto px-8 text-center space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a07a]">Legal Archive</p>
          <h1 className="text-5xl md:text-6xl font-serif italic text-[#1a1a1a]">Privacy Policy</h1>
          <div className="w-12 h-[1px] bg-[#c9a07a] mx-auto mt-4"></div>
          <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed italic pt-4">
            "Your privacy matters to us. This policy explains how we collect,
            use, and protect your personal information when you use our website."
          </p>
        </div>
      </section>

      {/* --- CONTENT: STRUCTURED EDITORIAL LAYOUT --- */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-8 space-y-20">
          
          {/* 01. Information We Collect */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              01. Information We Collect
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              When you place an order or interact with our website, we may collect
              personal information such as your name, email address, phone number,
              shipping address, and payment details.
            </p>
          </div>

          {/* 02. How We Use Information */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              02. How We Use Information
            </h2>
            <ul className="space-y-4 text-lg text-gray-500 font-light">
              <li className="flex gap-4">
                <span className="text-[#c9a07a] font-serif italic">—</span>
                <span>To process and deliver your orders efficiently.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#c9a07a] font-serif italic">—</span>
                <span>To communicate order updates and essential information.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#c9a07a] font-serif italic">—</span>
                <span>To improve our products and elevate your website experience.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#c9a07a] font-serif italic">—</span>
                <span>To send promotional updates (only if you opt in).</span>
              </li>
            </ul>
          </div>

          {/* 03. Cookies & Tracking */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              03. Cookies & Tracking
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              Our website uses cookies to enhance user experience, analyze site
              traffic, and personalize content. You can choose to disable cookies
              through your browser settings at any time.
            </p>
          </div>

          {/* 04. Data Protection */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              04. Data Protection
            </h2>
            <div className="bg-[#fdfaf7] p-8 rounded-[30px] border border-gray-50">
              <p className="text-lg text-gray-500 font-light leading-relaxed italic">
                We implement secure technologies and procedures to protect your
                personal information from unauthorized access, misuse, or
                disclosure.
              </p>
            </div>
          </div>

          {/* 05. Third-Party Services */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              05. Third-Party Services
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              We may share limited information with trusted partners such as
              payment gateways and delivery services to complete your order and
              ensure a seamless service.
            </p>
          </div>

          {/* 06. Your Rights */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#fdfaf7] pb-2 inline-block">
              06. Your Rights
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              You have the right to access, update, or request deletion of your
              personal data. You can contact our team anytime for assistance with
              your data.
            </p>
          </div>

          {/* 07. Contact & Support */}
          <div className="pt-12 border-t border-gray-100 text-center space-y-6">
            <h2 className="text-2xl font-serif italic text-[#1a1a1a]">Contact Us</h2>
            <p className="text-gray-500 font-light max-w-md mx-auto">
              If you have any questions regarding this privacy policy, feel free
              to reach out to our legal support team.
            </p>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Official Correspondence</p>
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

export default Privacy;