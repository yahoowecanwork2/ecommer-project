import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="font-sans bg-white selection:bg-[#c9a07a] selection:text-white">
      <Header />
      
      {/* --- HERO SECTION --- */}
      <section className="w-full bg-[#fdfaf7] py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#c9a07a] mb-6">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-7xl font-serif italic text-[#1a1a1a] leading-tight">
            We’d love to hear <br /> from you.
          </h1>

          <p className="mt-8 text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Whether it’s a question about sizing, orders, or styling — our concierge 
            team is here to assist your journey.
          </p>
        </div>
      </section>

      {/* --- FORM & DETAILS --- */}
      <section className="w-full bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          {/* Form */}
          <div className="space-y-10">
            <div className="space-y-2">
                <h2 className="text-3xl font-serif italic text-[#1a1a1a]">
                Send a Message
                </h2>
                <div className="w-12 h-[1px] bg-[#c9a07a]"></div>
            </div>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#c9a07a] bg-[#fdfaf7]/30 transition-all"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#c9a07a] bg-[#fdfaf7]/30 transition-all"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-6 py-4 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#c9a07a] bg-[#fdfaf7]/30 resize-none transition-all"
              ></textarea>

              <button
                type="submit"
                className="group relative px-12 py-5 bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden shadow-xl transition-all active:scale-95"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-[#c9a07a] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-12 bg-[#fdfaf7] p-10 lg:p-16 rounded-[40px] border border-gray-50">
            <h2 className="text-3xl font-serif italic text-[#1a1a1a]">Get in Touch</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-10 text-sm">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a07a]">Email</p>
                <p className="text-gray-600 text-lg font-light">support@naviclothing.com</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a07a]">Phone</p>
                <p className="text-gray-600 text-lg font-light">+91 98765 43210</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a07a]">Working Hours</p>
                <p className="text-gray-600 font-light italic">Monday – Saturday</p>
                <p className="text-gray-600 font-light">10:00 AM – 7:00 PM</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a07a]">Studio Address</p>
                <p className="text-gray-600 font-light leading-relaxed">
                  Navi Clothing Studio, <br />
                  Fashion District, New Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="w-full bg-[#fdfaf7] py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-serif italic text-[#1a1a1a] text-center mb-16">
            Frequently Asked <span className="text-[#c9a07a]">Questions</span>
          </h2>

          <div className="space-y-10">
            {[
              { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy on eligible items." },
              { q: "How do I choose the right size?", a: "Please refer to our size guide available on each product page." },
              { q: "How long does shipping take?", a: "Orders are usually delivered within 3–5 business days." }
            ].map((faq, i) => (
              <div key={i} className="group border-b border-gray-100 pb-6 transition-all">
                <h3 className="text-lg font-serif text-[#1a1a1a] mb-2 group-hover:text-[#c9a07a] transition-colors">
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed italic">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SHOP CTA --- */}
      <section className="w-full bg-white py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a] mb-12">
          Explore Our Latest <span className="not-italic text-gray-300">Collection</span>
        </h2>

        <Link
          to="/product"
          className="group relative inline-block px-14 py-5 bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden rounded-full shadow-2xl transition-all active:scale-95"
        >
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-[#c9a07a] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;