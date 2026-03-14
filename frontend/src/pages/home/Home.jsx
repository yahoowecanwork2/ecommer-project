import React from "react";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { Truck, Gem, Leaf, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="font-google bg-white text-[#2D1B2D] selection:bg-[#F3E5F5] selection:text-[#D16B92]">
        <Header />

        {/* --- SECTION 1: HERO (Luxurious Editorial Look) --- */}
        <section className="relative min-h-[85vh] lg:min-h-[95vh] flex items-center pt-24 lg:pt-20 pb-12 overflow-hidden bg-[#FCFBF7]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <img 
              src="https://www.transparenttextures.com/patterns/handmade-paper.png" 
              className="w-full h-full object-repeat" 
              alt="Texture" 
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-12 lg:gap-16 relative z-10 w-full">
            <div className="space-y-6 lg:space-y-10 text-center lg:text-left order-2 lg:order-1">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="w-10 lg:w-12 h-[1px] bg-[#D16B92]"></span>
                <p className="text-[10px] lg:text-[11px] tracking-[0.4em] lg:tracking-[0.5em] uppercase font-bold text-[#D16B92]">
                  The 2026 Muse Collection
                </p>
              </div>
              <h1 className="text-[12vw] lg:text-[110px] font-serif italic leading-[0.85] lg:leading-[0.8] tracking-tighter text-[#2D1B2D]">
                Poetic <br />
                <span className="not-italic font-extralight text-[#D16B92]">Lines.</span>
              </h1>
              <p className="text-base lg:text-xl text-gray-400 max-w-md mx-auto lg:mx-0 font-light leading-relaxed italic">
                “Where heritage hand-embroidery meets the effortless spirit of the modern woman.”
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 lg:gap-8 pt-4">
                <Link
                  to="/product"
                  className="w-full sm:w-auto group relative px-10 lg:px-14 py-4 lg:py-5 bg-[#2D1B2D] text-white text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.3em] overflow-hidden rounded-full shadow-2xl transition-all hover:shadow-[#D16B92]/20"
                >
                  <span className="relative z-10">Explore Edit</span>
                  <div className="absolute inset-0 bg-[#D16B92] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
                </Link>
                <Link
                  to="/about"
                  className="group text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.3em] text-[#2D1B2D] relative"
                >
                  Our Philosophy
                  <span className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-[#D16B92] origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"></span>
                </Link>
              </div>
            </div>
            
            <div className="relative flex justify-center items-center order-1 lg:order-2">
              <div className="relative w-full max-w-[320px] lg:max-w-lg aspect-[4/5] rounded-t-full rounded-b-[80px] lg:rounded-b-[100px] overflow-hidden shadow-2xl border-[10px] lg:border-[15px] border-white z-10 transform hover:scale-[1.02] transition-transform duration-700">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1974"
                  className="w-full h-full object-cover"
                  alt="Premium Fashion"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-32 h-32 lg:w-40 lg:h-40 border-[1px] border-[#D16B92]/30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE SIGNATURE EDIT --- */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 lg:space-y-8 text-center lg:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D16B92]">Luxury Essentials</p>
                <h2 className="text-4xl lg:text-6xl font-serif italic leading-tight text-[#2D1B2D]">The Signature <br className="hidden lg:block" /> Silhouette Edit</h2>
                <p className="text-gray-400 font-light text-sm lg:text-lg leading-relaxed italic">Experience the fusion of artisanal tradition and avant-garde design. Each piece is a masterpiece of slow fashion.</p>
                <div className="pt-4 lg:pt-6">
                  <Link to="/product" className="inline-block px-8 lg:px-10 py-3 lg:py-4 border border-[#D16B92] text-[#D16B92] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#D16B92] hover:text-white transition-all">View All Masterpieces</Link>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-8">
                <div className="space-y-6 lg:space-y-8 lg:mt-12">
                   <div className="group relative overflow-hidden rounded-[2rem] aspect-[3/4.5] shadow-xl hover:shadow-[#D16B92]/20 transition-all duration-700">
                      <img src="https://kuddi.net/cdn/shop/files/IMG_7564.jpg?v=1701170752&width=360" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="prod" />
                      <div className="absolute inset-0 bg-[#2D1B2D]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-6 left-6 text-white opacity-0 lg:group-hover:opacity-100 translate-y-4 lg:group-hover:translate-y-0 transition-all">
                        <p className="font-serif italic text-xl">Indigo Bloom</p>
                        <p className="text-[10px] uppercase tracking-widest">Shop Now →</p>
                      </div>
                   </div>
                   <p className="hidden lg:block text-center font-serif italic text-gray-400">“Elegance is the only beauty that never fades.”</p>
                </div>
                <div className="group relative overflow-hidden rounded-[2rem] aspect-[3/4.5] shadow-xl hover:shadow-[#D16B92]/20 transition-all duration-700">
                    <img src="https://kuddi.net/cdn/shop/files/IMG_8112.jpg?v=1701170889&width=360" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="prod" />
                    <div className="absolute inset-0 bg-[#2D1B2D]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-6 left-6 text-white opacity-0 lg:group-hover:opacity-100 translate-y-4 lg:group-hover:translate-y-0 transition-all">
                      <p className="font-serif italic text-xl">Crimson Grace</p>
                      <p className="text-[10px] uppercase tracking-widest">Shop Now →</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE MUSE GALLERY (Responsive Staggered Grid) --- */}
        <section className="py-20 lg:py-32 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col items-center mb-16 lg:mb-28 space-y-4 text-center">
               <span className="px-6 py-2 border border-[#D16B92]/30 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.5em] text-[#D16B92]">Ready to Wear</span>
               <h2 className="text-4xl lg:text-7xl font-serif italic text-[#2D1B2D] text-center">Featured Collections</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-10 gap-y-12 lg:gap-y-32">
              {[
                { name: "Royal Indigo Bandhani", price: "₹4,999", img: "https://kuddi.net/cdn/shop/files/IMG_7564.jpg?v=1701170752&width=360" },
                { name: "Crimson Square Luxe", price: "₹3,499", img: "https://kuddi.net/cdn/shop/files/IMG_8112.jpg?v=1701170889&width=360" },
                { name: "Blossom Peplum Edit", price: "₹5,200", img: "https://kuddi.net/cdn/shop/files/IMG_8543.jpg?v=1701171120&width=360" },
                { name: "Ivory Shimmer Silk", price: "₹4,299", img: "https://kuddi.net/cdn/shop/files/IMG_8821.jpg?v=1701171352&width=360" },
                { name: "Midnight Rose Silk", price: "₹6,400", img: "https://kuddi.net/cdn/shop/files/IMG_9111.jpg?v=1701171500&width=360" },
                { name: "Heritage Navy Shrug", price: "₹2,999", img: "https://kuddi.net/cdn/shop/files/IMG_9333.jpg?v=1701171700&width=360" },
                { name: "Sage Garden Kurti", price: "₹3,800", img: "https://kuddi.net/cdn/shop/files/IMG_8745.jpg?v=1701171241&width=360" },
                { name: "Pastel Grace Wrap", price: "₹4,100", img: "https://kuddi.net/cdn/shop/files/IMG_7675.jpg?v=1701170752&width=360" }
              ].map((item, i) => (
                <div key={i} className={`group cursor-pointer ${i % 2 !== 0 ? "lg:translate-y-20" : ""}`}>
                  <div className="relative aspect-[3/4.5] overflow-hidden rounded-2xl lg:rounded-[3rem] bg-gray-100 mb-4 lg:mb-8 transition-all duration-1000 group-hover:shadow-2xl">
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt={item.name} />
                    <div className="absolute top-3 right-3 lg:top-6 lg:right-6 w-8 h-8 lg:w-10 lg:h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity">
                       <span className="text-[#D16B92] font-bold text-sm lg:text-base">♡</span>
                    </div>
                    <div className="absolute inset-x-4 lg:inset-x-8 bottom-4 lg:bottom-8 translate-y-full opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500">
                       <button className="w-full py-3 lg:py-4 bg-[#2D1B2D] text-white text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl lg:rounded-2xl shadow-2xl hover:bg-[#D16B92] transition-colors">
                         Quick Add +
                       </button>
                    </div>
                  </div>
                  <div className="text-center space-y-1 lg:space-y-2 px-2">
                    <h4 className="text-sm lg:text-[15px] font-serif italic text-[#2D1B2D] tracking-wide lg:group-hover:text-[#D16B92] transition-colors">{item.name}</h4>
                    <p className="text-[12px] lg:text-[13px] text-[#D16B92] font-medium tracking-[0.1em]">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 4: SUMMER SOIRÉE --- */}
        <section className="py-20 lg:py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 lg:mb-16">
             <div className="flex justify-between items-center">
                <h2 className="text-3xl lg:text-5xl font-serif italic text-[#2D1B2D]">Summer Soirée</h2>
                <p className="text-[#D16B92] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.4em] hidden sm:block italic">Slide to Explore →</p>
             </div>
          </div>
          <div className="flex gap-6 lg:gap-10 overflow-x-auto px-6 lg:px-8 pb-12 lg:pb-20 no-scrollbar snap-x">
             {[
               { title: "The Linen Edit", price: "₹3,999", img: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1972" },
               { title: "Pastel Dreams", price: "₹4,200", img: "https://images.unsplash.com/photo-1560060141-7b9018741bed?q=80&w=1964" },
               { title: "Floral Whisper", price: "₹3,499", img: "https://images.unsplash.com/photo-1595967734996-c1265319e825?q=80&w=1964" },
               { title: "Golden Hour", price: "₹5,100", img: "https://images.unsplash.com/photo-1612459284970-e8f027596582?q=80&w=1964" },
               { title: "Breezy Boho", price: "₹2,999", img: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1965" }
             ].map((item, i) => (
               <div key={i} className="flex-shrink-0 w-72 lg:w-80 snap-center group">
                 <div className="relative aspect-[4/5] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-lg mb-6 lg:group-hover:shadow-[#D16B92]/20 transition-all duration-700">
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="soiree" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B2D]/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 text-white">
                       <p className="text-[9px] uppercase tracking-widest mb-1 opacity-80">Collection 26'</p>
                       <p className="text-xl lg:text-2xl font-serif italic">{item.title}</p>
                    </div>
                 </div>
                 <div className="flex justify-between items-center px-4">
                    <p className="text-[#2D1B2D] text-[12px] lg:text-[13px] font-medium tracking-widest">{item.price}</p>
                    <button className="text-[9px] lg:text-[10px] font-black uppercase tracking-tighter border-b border-[#D16B92] text-[#D16B92]">Add to Bag</button>
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* --- SECTION 5: THE ATELIERS (Video Section) --- */}
        <section className="relative h-[70vh] lg:h-screen w-full overflow-hidden bg-[#1A111A]">
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay loop muted playsInline 
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-110"
            >
              <source src="https://kuddi.net/cdn/shop/videos/c/vp/0c88554249a54728b1230e7681c25f46/0c88554249a54728b1230e7681c25f46.HD-1080p-7.2Mbps-21528629.mp4?v=0" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A111A] via-transparent to-[#1A111A]"></div>
          </div>
          <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 lg:px-20 flex flex-col justify-center">
            <div className="grid lg:grid-cols-12 gap-8 items-center text-center lg:text-left">
              <div className="lg:col-span-7 space-y-4 lg:space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-4 animate-pulse">
                  <div className="w-10 h-[1px] bg-[#D4AF37]"></div>
                  <p className="text-[9px] lg:text-[10px] tracking-[0.5em] lg:tracking-[0.8em] uppercase text-[#D4AF37] font-bold">The Sanctum of Craft</p>
                </div>
                <h2 className="text-5xl lg:text-[160px] font-serif italic text-[#F9F5F0] leading-[0.8] tracking-tighter">sculpted <br /> Silence.</h2>
              </div>
              <div className="lg:col-span-5 lg:mt-32 space-y-8">
                <p className="text-[#F9F5F0] text-lg lg:text-3xl font-light leading-snug italic max-w-md mx-auto lg:mx-0">“In our ateliers, we measure time in the rhythm of a heartbeat.”</p>
                <div className="flex items-center justify-center lg:justify-start gap-6 lg:gap-8">
                  <button className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A111A] transition-all duration-700">▶</button>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] lg:tracking-[0.5em] text-[#D4AF37]">Observe the craft</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 6: MUSES VOICES --- */}
        <section className="py-20 lg:py-40 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
               <div className="relative group px-4 lg:px-0">
                 <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070" className="w-full h-[450px] lg:h-[700px] object-cover rounded-[60px] lg:rounded-[120px] shadow-2xl" alt="Model" />
                 <div className="absolute -bottom-6 -right-2 lg:-bottom-10 lg:-right-10 bg-[#D16B92] text-white p-8 lg:p-14 rounded-[30px] lg:rounded-[60px] shadow-2xl">
                    <p className="text-3xl lg:text-6xl font-serif italic tracking-tighter">"Exceptional"</p>
                 </div>
               </div>
               <div className="space-y-12 lg:space-y-16">
                  <div className="space-y-4 text-center lg:text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D16B92]">Voices of Grace</p>
                    <h2 className="text-4xl lg:text-6xl font-serif italic text-[#2D1B2D]">What Our Muses Say</h2>
                  </div>
                  <div className="space-y-12">
                    {[
                      { title: "Pure Luxury", text: "The drape of this kurti is like poetry. I've never felt so comfortable yet so regal.", author: "Mira Rajput" },
                      { title: "Unmatched Craft", text: "The hand-embroidery is intricate and the finish is boutique-grade. Truly unique.", author: "Sia Kapoor" }
                    ].map((rev, i) => (
                      <div key={i} className="group space-y-4 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start gap-1 text-[#D16B92]">★★★★★</div>
                        <p className="text-lg lg:text-2xl text-gray-400 font-light italic leading-relaxed lg:group-hover:text-[#2D1B2D] transition-colors duration-500">"{rev.text}"</p>
                        <p className="text-[10px] lg:text-[11px] font-black uppercase text-gray-400 tracking-widest">— {rev.author}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 7: THE LUXE PERKS --- */}
        <section className="py-20 lg:py-28 bg-[#FCFBF7] border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 text-center">
            {[
              { label: "Bespoke Delivery", sub: "Global White-Glove Shipping", icon: <Truck strokeWidth={1} size={28} /> },
              { label: "Purest Silks", sub: "Hand-Sourced Heritage Fabrics", icon: <Gem strokeWidth={1} size={28} /> },
              { label: "Ethical Craft", sub: "Directly Supporting Artisans", icon: <Leaf strokeWidth={1} size={28} /> },
              { label: "Graceful Fit", sub: "Tailored For Modern Comfort", icon: <Sparkles strokeWidth={1} size={28} /> }
            ].map((item, i) => (
              <div key={i} className="group flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="text-[#2D1B2D] group-hover:text-[#D16B92] group-hover:-translate-y-2 transition-all duration-700">
                    {item.icon}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D16B92] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
                <div className="space-y-2">
                  <div className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.4em] lg:tracking-[0.6em] text-[#2D1B2D] group-hover:text-[#D16B92] transition-all">
                    {item.label}
                  </div>
                  <div className="w-6 lg:w-8 h-[1px] bg-gray-200 mx-auto group-hover:w-12 lg:group-hover:w-16 transition-all duration-700"></div>
                  <p className="text-[8px] lg:text-[9px] text-gray-400 uppercase tracking-[0.2em] font-medium">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}} />
    </>
  );
};

export default Home;