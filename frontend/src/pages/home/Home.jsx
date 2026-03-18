import React from "react";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";
import video1 from "/src/assets/videos/video1.mp4"
import video2 from "/src/assets/videos/video2.mp4"
import video3 from "/src/assets/videos/video3.mp4"
import video4 from "/src/assets/videos/video4.mp4"
import video5 from "/src/assets/videos/video5.mp4"
import {
  IoStar,
  IoPlayCircleOutline,
  IoRocketOutline,
  IoHeartOutline,
  IoTimeOutline,
  IoShieldCheckmarkOutline,
  IoArrowForwardOutline,
  IoLogoInstagram,
} from "react-icons/io5";

const Home = () => {
  const categories = [
    {
      name: "Anarkali",
      img: "https://images.unsplash.com/photo-1610030469915-9a08eb7250a2?q=80&w=300",
    },
    {
      name: "Straight Cut",
      img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=300",
    },
    {
      name: "ChikanKari",
      img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=300",
    },
    {
      name: "Short Kurti",
      img: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=300",
    },
  ];

  const products = [
    {
      name: "Summer Pastel Floral Kurti",
      price: "1,899",
      img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600",
    },
    {
      name: "Midnight Blue Silk Anarkali",
      price: "4,500",
      img: "https://images.unsplash.com/photo-1610030469915-9a08eb7250a2?q=80&w=600",
    },
    {
      name: "Ivory Cotton Chikankari",
      price: "2,200",
      img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600",
    },
    {
      name: "Earthy Maroon Straight Fit",
      price: "1,499",
      img: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600",
    },
  ];

  const reviews = [
    {
      name: "Ananya Sharma",
      text: "The fabric is so breathable and the fit is just perfect. Truly handcrafted elegance!",
      initial: "A",
    },
    {
      name: "Priya Singh",
      text: "I wore the Chikankari kurti for a family function and got so many compliments. Love Kuddi!",
      initial: "P",
    },
    {
      name: "Megha Rao",
      text: "Fast delivery and premium packaging. The quality exceeded my expectations.",
      initial: "M",
    },
  ];

  const videoReviews = [
    {
      id: 1,
      url: video1,
      user: "@style_by_me",
    },
    {
      id: 2,
      url: video2,
      user: "@ethnic_vibe",
    },
    {
      id: 3,
      url: video4,
      user: "@desi_lookbook",
    },
    {
      id: 4,
      url: video5,
      user: "@kuddi_diaries",
    },
  ];

  return (
    <div className="bg-white text-[#1a1a1a] font-sans selection:bg-[#c9a07a] selection:text-white">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative h-[140vh] md:h-[120vh] flex items-center overflow-hidden bg-[#fdfaf7]">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 items-center gap-12">
          <div className="z-10 order-2 lg:order-1">
            <span className="text-[12px] tracking-[0.4em] uppercase font-semibold text-[#c9a07a] mb-4 block">
              New Arrival 2026
            </span>
            <h1 className="text-5xl lg:text-[80px] font-serif leading-[1.1] mb-8">
              Timeless <br />{" "}
              <span className="italic font-light text-gray-400">Elegance.</span>
            </h1>
            <p className="text-gray-500 max-w-md mb-10 leading-relaxed text-lg">
              Handcrafted kurtis designed for the modern woman who cherishes her
              roots.
            </p>
            <Link
              to="/product"
              className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-[#c9a07a] transition-all group"
            >
              Shop Collection{" "}
              <IoArrowForwardOutline className="text-lg group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="relative h-[60vh] lg:h-[80vh] order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=2070"
              className="w-full h-full object-cover rounded-t-[200px] shadow-2xl animate-slow-zoom"
              alt="Fashion Hero"
            />
          </div>
        </div>
      </section>

      {/* 2. BRAND STORY SECTION (NEW) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[#c9a07a] text-[12px] font-bold uppercase tracking-[0.5em] mb-8">
            #StyleThatSpeaksYou
          </h2>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-gray-800">
            "Founded with a passion for redefining everyday fashion,{" "}
            <span className="text-[#c9a07a]">Kuddi</span> is your go-to
            destination for short kurtis that make a bold, confident statement.
            We believe that fashion should not only look good but should be
            affordable too."
          </p>
          <div className="mt-8 h-1 w-12 bg-gray-200 mx-auto"></div>
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-serif italic mb-10 text-center">
          Shop by Style
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <Link key={idx} to="/shop" className="group text-center">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-gray-100 rounded-sm group-hover:shadow-xl transition-all duration-700">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <p className="text-[13px] font-semibold tracking-wider uppercase group-hover:text-[#c9a07a] transition-colors">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT GRID */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">The Kurti Edit</h2>
            <div className="h-0.5 w-16 bg-[#c9a07a] mx-auto mb-4"></div>
            <p className="text-gray-400 text-[10px] tracking-[0.3em] uppercase">
              Handpicked for your daily grace
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((item, i) => (
              <div key={i} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-white mb-5 shadow-sm">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                    <button className="w-full bg-white text-black py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#c9a07a] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0">
                      Add to Bag
                    </button>
                  </div>
                </div>
                <h3 className="text-[14px] text-gray-800 font-medium">
                  {item.name}
                </h3>
                <p className="text-[15px] font-bold text-[#c9a07a]">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VIDEO REVIEWS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-serif">#KuddiStories</h2>
              <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-semibold">
                See how our community styles it
              </p>
            </div>
            <IoLogoInstagram className="text-3xl text-[#c9a07a]" />
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8">
    {videoReviews.map((video) => (
  <div
    key={video.id}
    className="relative flex-shrink-0 w-[240px] aspect-[9/16] rounded-2xl overflow-hidden group shadow-lg"
  >
    <video
      src={video.url} // <--- Important Change
      className="w-full h-full object-cover"
      muted
      loop
      playsInline
      onMouseOver={(e) => e.currentTarget.play()}
      onMouseOut={(e) => {
        e.currentTarget.pause();
        e.currentTarget.currentTime = 0;
      }}
    />
    
    <div className="absolute bottom-4 left-4 text-white z-10 pointer-events-none">
      <p className="text-[10px] font-bold tracking-widest">
        {video.user}
      </p>
    </div>

    {/* Overlay - added pointer-events-none takki mouse hover video tak pahonch sake */}
    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all flex items-center justify-center pointer-events-none">
      <IoPlayCircleOutline className="text-white/70 text-4xl group-hover:hidden" />
    </div>
  </div>
))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="py-24 bg-[#fdfaf7]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-serif italic mb-16">
            Trusted by Thousands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="flex text-[#c9a07a] mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <IoStar key={i} />
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed mb-8 text-[15px]">
                  "{rev.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#fdfaf7] flex items-center justify-center text-[#c9a07a] font-bold text-sm border border-[#c9a07a]/20">
                    {rev.initial}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {rev.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. USP SECTION */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          <USPItem
            icon={<IoRocketOutline />}
            title="Free Shipping"
            desc="On orders above ₹2999"
          />
          <USPItem
            icon={<IoHeartOutline />}
            title="Made in India"
            desc="Handcrafted with love"
          />
          <USPItem
            icon={<IoTimeOutline />}
            title="Express Delivery"
            desc="Ships within 24 hours"
          />
          <USPItem
            icon={<IoShieldCheckmarkOutline />}
            title="Pure Fabrics"
            desc="100% Breathable Cotton"
          />
        </div>
      </section>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slow-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.05); } }
        .animate-slow-zoom { animation: slow-zoom 15s ease-in-out infinite alternate; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
};

const USPItem = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="text-2xl text-[#c9a07a] mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-[11px] font-bold uppercase tracking-tighter mb-1">
      {title}
    </h4>
    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
      {desc}
    </p>
  </div>
);

export default Home;
