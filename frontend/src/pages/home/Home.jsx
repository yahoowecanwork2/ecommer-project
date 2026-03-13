import React from "react";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

const Home = () => {
  return (
    <>
      <div className="font-google bg-[#FFF9FB] text-[#2D1B2D] selection:bg-[#F3E5F5] selection:text-[#7B1FA2]">
        <Header />

        {/* --- SECTION 1: HERO --- */}
        <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#FAF9F6]">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" className="w-full h-full object-cover" alt="Texture" />
          </div>
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 items-center gap-12 relative z-10 w-full">
            <div className="space-y-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="w-10 h-[1px] bg-[#D16B92]"></span>
                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#D16B92]">EST. 2026 • Summer Edit</p>
              </div>
              <h1 className="text-[12vw] lg:text-[110px] font-serif italic leading-[0.9] tracking-tighter">Effortless <br /><span className="not-italic font-light text-[#D16B92]">Grace.</span></h1>
              <p className="text-lg text-gray-500 max-w-md mx-auto lg:mx-0 font-light leading-relaxed">Curated collections that blend traditional art with modern silhouettes.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2">
                <Link to="/product" className="group relative px-12 py-4 bg-[#D16B92] text-white text-[11px] font-bold uppercase tracking-[0.2em] overflow-hidden rounded-full shadow-lg">
                  <span className="relative z-10">Shop Collection</span>
                  <div className="absolute inset-0 bg-[#A34D6F] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Link>
                <Link to="/about" className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-[#D16B92]/30 pb-1 hover:text-[#D16B92] transition-all">Our Story</Link>
              </div>
            </div>
            <div className="relative flex justify-center items-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-t-[200px] rounded-b-3xl overflow-hidden shadow-2xl border-[12px] border-white z-10">
                <img src="https://images.pexels.com/photos/10183350/pexels-photo-10183350.jpeg?auto=compress&cs=tinysrgb&w=1260" className="w-full h-full object-cover" alt="Hero" />
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: BRAND PERKS (Increases Trust & Length) --- */}
        <section className="py-16 bg-white border-y border-pink-50">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Free Shipping", sub: "On orders above ₹2999" },
              { label: "Organic Fabric", sub: "100% Breathable Cotton" },
              { label: "Handcrafted", sub: "Made with love in India" },
              { label: "Easy Returns", sub: "7-day hassle free policy" }
            ].map((perk, i) => (
              <div key={i} className="space-y-1">
                <h5 className="text-[11px] font-black uppercase tracking-widest text-[#D16B92]">{perk.label}</h5>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{perk.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: THE CRAFT --- */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative grid grid-cols-2 gap-5">
               <img src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1974" className="w-full h-[380px] object-cover rounded-[50px] shadow-xl" alt="1" />
               <img src="https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?q=80&w=2070" className="w-full h-[380px] object-cover rounded-[50px] shadow-xl mt-12" alt="2" />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#3D2B3D]">Designed for <br /><span className="not-italic text-[#D16B92]">Modern Comfort.</span></h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">Har ek dhaaga ek kahani kehta hai. Humne chuna hai duniya ka sabse behtareen organic cotton, taaki aap khush rahein.</p>
              <Link to="/about" className="inline-block px-10 py-4 border border-[#D16B92] text-[#D16B92] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#D16B92] hover:text-white transition-all">Read Our Promise</Link>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: LARGE CINEMATIC LOOKBOOK BANNER (Fills Space) --- */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
           <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" className="absolute inset-0 w-full h-full object-cover scale-110" alt="Cinematic" />
           <div className="absolute inset-0 bg-black/30"></div>
           <div className="relative text-center text-white space-y-6 px-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.8em]">The New Era of Ethnic</p>
              <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter">Minimalism meets <br /> Tradition.</h2>
              <Link to="/product" className="inline-block mt-4 px-12 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#D16B92] hover:text-white transition-all">View Lookbook</Link>
           </div>
        </section>

        {/* --- SECTION 3: TRENDING NOW --- */}
        <section className="py-24 bg-[#FFF9FB]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D16B92]">The Edit</p>
                <h2 className="text-4xl font-serif italic text-[#3D2B3D]">The Modern Muse</h2>
              </div>
              <Link to="/product" className="text-xs font-bold uppercase tracking-widest border-b border-[#D16B92] pb-1 transition-colors">Shop All Arrivals →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Sage Garden Kurti", price: "₹1,299", img: "https://images.unsplash.com/photo-1612459284970-e8f027596582" },
                { name: "Pastel Blossom Set", price: "₹1,499", img: "https://images.unsplash.com/photo-1621285853634-713b8dd6b5ee" },
                { name: "Ivory Linen Grace", price: "₹1,999", img: "https://images.unsplash.com/photo-1610030469915-9a88e479c97d" },
                { name: "Midnight Rose Silk", price: "₹1,599", img: "https://images.unsplash.com/photo-1595967734996-c1265319e825" },
              ].map((item, i) => (
                <div key={i} className="group bg-white p-4 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-700">
                  <div className="relative overflow-hidden aspect-[4/5] rounded-[2rem] mb-5">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-x-0 bottom-0 p-4 hidden md:block translate-y-full group-hover:translate-y-0 transition-all duration-500">
                      <button className="w-full py-3 bg-white/95 backdrop-blur-md text-[#D16B92] text-[10px] font-bold uppercase rounded-xl">Quick Add +</button>
                    </div>
                  </div>
                  <div className="px-2 text-center space-y-2">
                    <h4 className="text-sm font-semibold text-[#3D2B3D]">{item.name}</h4>
                    <p className="text-sm font-serif italic text-[#D16B92]">{item.price}</p>
                    <button className="w-full py-3 md:hidden bg-[#D16B92] text-white text-[10px] font-bold uppercase rounded-xl">Add to bag +</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 4: CINEMATIC TILES --- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-4 h-[550px]">
             <Link to="/product" className="relative group overflow-hidden rounded-[30px]"><img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee" className="w-full h-full object-cover group-hover:scale-110 transition-all" alt="1" /><div className="absolute inset-0 bg-pink-900/10 flex items-center justify-center"><h3 className="text-white text-3xl font-serif italic">Festive Bloom</h3></div></Link>
             <div className="grid grid-rows-2 gap-4">
                <Link to="/product" className="relative group overflow-hidden rounded-[30px]"><img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-purple-900/10 flex items-center justify-center text-white font-serif italic">Soft Office</div></Link>
                <Link to="/product" className="relative group overflow-hidden rounded-[30px]"><img src="https://images.unsplash.com/photo-1617175548998-573828c04967" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-rose-900/10 flex items-center justify-center text-white font-serif italic">Summer Daily</div></Link>
             </div>
             <Link to="/product" className="relative group overflow-hidden rounded-[30px]"><img src="https://images.unsplash.com/photo-1610030469668-93530c176cce" className="w-full h-full object-cover group-hover:scale-110 transition-all" /><div className="absolute inset-0 bg-[#4a148c]/10 flex items-center justify-center text-white text-3xl font-serif italic">Luxe Petals</div></Link>
          </div>
        </section>

        {/* --- SECTION 5: TESTIMONIALS --- */}
        <section className="py-24 bg-[#FFF5F7]">
          <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
            <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-pink-300">Voices of Grace</p>
            <p className="text-2xl md:text-3xl font-serif italic text-[#4A148C]">"The fabric feels like a soft whisper against the skin. Best boutique experience!"</p>
            <p className="text-[10px] font-black uppercase text-[#880E4F]">— Ananya Panday</p>
          </div>
        </section>

        {/* --- SECTION 6: GALLERY --- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8 space-y-12 text-center">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D16B92]">The Muse Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-4"><img src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e" className="w-full h-64 object-cover rounded-2xl shadow-sm" /><img src="https://images.unsplash.com/photo-1631215112106-96350f38b43a" className="w-full h-80 object-cover rounded-2xl shadow-sm" /></div>
              <div className="space-y-4 pt-8"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b" className="w-full h-80 object-cover rounded-2xl shadow-sm" /><img src="https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda" className="w-full h-64 object-cover rounded-2xl shadow-sm" /></div>
              <div className="space-y-4"><img src="https://images.unsplash.com/photo-1621285853634-713b8dd6b5ee" className="w-full h-64 object-cover rounded-2xl shadow-sm" /><img src="https://images.unsplash.com/photo-1544441893-675973e31985" className="w-full h-80 object-cover rounded-2xl shadow-sm" /></div>
              <div className="space-y-4 pt-8"><img src="https://images.unsplash.com/photo-1612459284970-e8f027596582" className="w-full h-80 object-cover rounded-2xl shadow-sm" /><img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03" className="w-full h-64 object-cover rounded-2xl shadow-sm" /></div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;