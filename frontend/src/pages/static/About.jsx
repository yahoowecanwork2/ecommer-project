import React from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="font-sans bg-white selection:bg-[#c9a07a] selection:text-white">
      <Header />

      {/* --- SECTION 1: HERO --- */}
      <section className="relative w-full bg-[#fdfaf7] pt-44 pb-24 overflow-hidden">
        {/* Changed Pink blur to Gold/Cream blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a07a] rounded-full blur-[150px] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#c9a07a] mb-8">Established 2026</p>
          <h1 className="text-6xl md:text-8xl font-serif italic text-[#1a1a1a] leading-[1.1] tracking-tighter">
            Where tradition <br />
            <span className="not-italic font-light text-gray-400">meets modern soul.</span>
          </h1>
          <p className="mt-10 text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Navi Clothing is more than a brand; it’s a celebration of the modern woman who values her roots while embracing the future.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: THE STORY --- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-[40px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070"
                alt="Our Story"
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Decorative element color change */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#fdfaf7] rounded-full -z-0"></div>
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl font-serif italic text-[#1a1a1a]">Our Humble Beginnings</h2>
            <div className="space-y-6 text-lg text-gray-500 font-light leading-relaxed">
              <p>Every design began with a dream—a vision where every woman could wear her culture with unparalleled comfort and sophistication.</p>
              <p>We collaborated with master artisans who have preserved this heritage for generations. Their craftsmanship, combined with our modern vision, defines Navi Clothing.</p>
              <p>Today, we stand for quality over quantity. We don't believe in fleeting trends; we believe in "Timeless Fashion" that lasts a lifetime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: THE GREEN THREAD (SUSTAINABILITY) --- */}
      <section className="py-32 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a07a]">Our Responsibility</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a]">The Green Thread</h2>
            </div>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              We understand the environmental impact of fashion. That’s why at Navi Clothing, we utilize **Zero-Waste Cutting** techniques and **Natural Dyes**. Our mission isn't just to make you look beautiful, but to ensure our planet remains vibrant for generations to come.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
               <div className="space-y-2">
                  <h4 className="font-serif italic text-xl text-[#c9a07a]">Organic Soul</h4>
                  <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest">Pesticide-free cotton ethically harvested by local farmers.</p>
               </div>
               <div className="space-y-2">
                  <h4 className="font-serif italic text-xl text-[#c9a07a]">Eco-Dyes</h4>
                  <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest">Vibrant colors extracted from petals and seeds, 100% toxin-free.</p>
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1974" 
              className="w-full h-[500px] object-cover rounded-[100px_40px_100px_40px] shadow-xl" 
              alt="Sustainable Fabric" 
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: THE CRAFT PROCESS --- */}
      <section className="py-32 bg-[#fdfaf7]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-serif italic text-[#1a1a1a]">From Seed to Stitch</h2>
            <div className="w-20 h-[1px] bg-[#c9a07a] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Ethical Sourcing", desc: "We exclusively select fabrics that are environmentally friendly and feel like a gentle whisper against the skin." },
              { step: "02", title: "Artisan Craft", desc: "Our designs are hand-finished by expert artisans, ensuring that every piece remains a unique work of art." },
              { step: "03", title: "Quality Check", desc: "Before delivery, every garment undergoes a rigorous 5-level quality inspection to ensure absolute perfection." }
            ].map((item, i) => (
              <div key={i} className="space-y-6 group">
                <span className="text-6xl font-serif italic text-gray-100 group-hover:text-[#c9a07a]/20 transition-colors">{item.step}</span>
                <h4 className="text-xl font-serif text-[#1a1a1a]">{item.title}</h4>
                <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: BEYOND BORDERS (GLOBAL VISION) --- */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-8 text-center space-y-12">
           <h2 className="text-5xl font-serif italic text-[#1a1a1a]">Beyond Borders</h2>
           <p className="text-xl text-gray-500 font-light leading-relaxed">
             Navi Clothing has evolved from an Indian boutique into a **Global Movement**. We bring our refined designs to confident, elegant women across the world. From London to New York, our collections have become a global symbol of effortless grace.
           </p>
           <div className="flex flex-wrap justify-center gap-12 pt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all text-[#1a1a1a]">
              <span className="text-2xl font-serif italic">New Delhi</span>
              <span className="text-2xl font-serif italic">Dubai</span>
              <span className="text-2xl font-serif italic">Singapore</span>
              <span className="text-2xl font-serif italic">Sydney</span>
           </div>
        </div>
      </section>

      {/* --- SECTION 4: STATS (COUNTABLE) --- */}
      <section ref={ref} className="py-24 bg-[#fdfaf7]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { num: 10, suffix: "k+", label: "Happy Muses" },
            { num: 50, suffix: "+", label: "Master Artisans" },
            { num: 100, suffix: "%", label: "Organic Cotton" },
            { num: 24, suffix: "/7", label: "Care Support" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
               <p className="text-4xl md:text-5xl font-serif text-[#c9a07a]">
                {inView ? <CountUp start={0} end={stat.num} duration={3} /> : 0}
                <span>{stat.suffix}</span>
               </p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section className="py-40 bg-white text-center">
        <div className="max-w-3xl mx-auto px-8 space-y-12">
          <h2 className="text-5xl md:text-6xl font-serif italic text-[#1a1a1a]">Be a part of our <span className="not-italic font-light text-gray-400">Story.</span></h2>
          <div className="pt-6">
            <Link
              to="/product"
              className="group relative inline-block px-14 py-5 bg-[#1a1a1a] text-white text-[11px] font-bold uppercase tracking-[0.3em] overflow-hidden rounded-full shadow-2xl shadow-gray-200"
            >
              <span className="relative z-10">Shop the Collection</span>
              {/* Gold transition on hover */}
              <div className="absolute inset-0 bg-[#c9a07a] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;