import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";
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
import { productApi } from "../../apis/product";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filterByCat, setFilterByCat] = useState([]);
  const limit = 12;

  const getProducts = async () => {
    try {
      setLoading(true);
      setActiveCategory(null);
      setFilterByCat([]);
      const res = await productApi.get(startIndex, limit);
      console.log("products", res);

      setProducts(res.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await productApi.getCategories();
      console.log("categories", res);

      setCategories(res.categories);
    } catch (error) {
      console.log("Category fetch error", error);
    }
  };
  const handleCategoryFilter = async (categoryId) => {
    try {
      setLoading(true);
      setProducts([]);
      setActiveCategory(categoryId);
      const res = await productApi.filterByCategories(categoryId, 0, limit);
      console.log("filter by categories", res);

      if (res.success) {
        setFilterByCat(res.products);
      }
      setLoading(false);
      // setIsFilterOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    fetchCategories();
  }, [startIndex]);
  // const categories = [
  //   {
  //     name: "Anarkali",
  //     img: "https://images.unsplash.com/photo-1610030469915-9a08eb7250a2?q=80&w=300",
  //   },
  //   {
  //     name: "Straight Cut",
  //     img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=300",
  //   },
  //   {
  //     name: "ChikanKari",
  //     img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=300",
  //   },
  //   {
  //     name: "Short Kurti",
  //     img: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=300",
  //   },
  // ];

  // const products = [
  //   {
  //     name: "Summer Pastel Floral Kurti",
  //     price: "1,899",
  //     img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600",
  //   },
  //   {
  //     name: "Midnight Blue Silk Anarkali",
  //     price: "4,500",
  //     img: "https://images.unsplash.com/photo-1610030469915-9a08eb7250a2?q=80&w=600",
  //   },
  //   {
  //     name: "Ivory Cotton Chikankari",
  //     price: "2,200",
  //     img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600",
  //   },
  //   {
  //     name: "Earthy Maroon Straight Fit",
  //     price: "1,499",
  //     img: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600",
  //   },
  // ];

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
      url: "https://cdn.pixabay.com/video/2021/04/12/70796-536098055_tiny.mp4",
      user: "@style_by_me",
    },
    {
      id: 2,
      url: "https://cdn.pixabay.com/video/2023/10/20/185834-876615801_tiny.mp4",
      user: "@ethnic_vibe",
    },
    {
      id: 3,
      url: "https://cdn.pixabay.com/video/2020/09/03/48981-456637119_tiny.mp4",
      user: "@desi_lookbook",
    },
    {
      id: 4,
      url: "https://cdn.pixabay.com/video/2022/01/18/104526-666323674_tiny.mp4",
      user: "@kuddi_diaries",
    },
  ];

  return (
    <div className="bg-white text-[#1a1a1a] font-sans selection:bg-[#c9a07a] selection:text-white">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-[#fdfaf7]">
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
      {/* 2. BRAND STORY SECTION (CONCISE VERSION) */}
      <section className="py-16 bg-white border-b border-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[#c9a07a] text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
            #StyleThatSpeaksYou
          </h2>
          <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-gray-800">
            "Redefining everyday fashion with short kurtis that inspire
            confidence. At{" "}
            <span className="text-[#c9a07a] not-italic font-semibold">
              Navi Clothing
            </span>
            , we believe premium style should be bold, expressive, and always
            affordable."
          </p>
          <div className="mt-6 h-px w-10 bg-[#c9a07a]/30 mx-auto"></div>
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-serif italic text-gray-900">
            Shop by Style
          </h2>
          <Link
            to="/product"
            className="text-[10px] font-bold uppercase tracking-widest text-[#c9a07a] border-b border-[#c9a07a]/30 pb-1"
          >
            View All
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
          {categories?.map((cat, idx) => (
            <Link
              key={idx}
              to={`/product?category=${cat.slug}`} // Category ke hisaab se filter karne ke liye
              className="relative flex-shrink-0 w-[200px] md:w-[260px] aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 snap-start group"
            >
              {/* IMAGE LOGIC FIX: Accessing the first item of the array */}
              <img
                src={
                  cat.image && cat.image[0]?.url
                    ? cat.image[0].url
                    : "https://via.placeholder.com/300x400"
                }
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Minimal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-lg font-serif italic leading-tight">
                  {cat.name}
                </h3>
                <div className="w-6 h-[1px] bg-[#c9a07a] mt-1 group-hover:w-12 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Scrollbar CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `,
          }}
        />
      </section>

      {/* 4. PRODUCT GRID */}
      <section className="py-20 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto px-6">
          {/* --- Header --- */}
          <div className="text-center mb-12">
            <span className="text-[#c9a07a] text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">
              New In Store
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900">
              The Kurti Edit
            </h2>
          </div>

          {/* --- Product Grid --- */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
            {products?.slice(0, 8).map((item, i) => (
              /* Dynamic Link using slug */
              <Link
                key={i}
                to={`/product-detail/${item.slug}`}
                className="group flex flex-col"
              >
                {/* Card Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-[#f3f3f3] mb-4 transition-all duration-500">
                  <img
                    src={item?.image?.url || item?.img}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    alt={item.name}
                  />

                  {/* View Overlay */}
                  <div className="absolute inset-0 bg-[#c9a07a]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="bg-white text-[#c9a07a] px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                      View Details
                      <IoArrowForwardOutline />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="text-center px-1">
                  <h3 className="text-[13px] md:text-[14px] text-gray-800 font-medium truncate mb-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-[15px] font-bold text-[#c9a07a]">
                      ₹{item.price}
                    </p>
                    <span className="text-[10px] text-gray-400 line-through">
                      ₹{Math.round(item.price * 1.3)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* --- View More Button (Single & Themed) --- */}
          <div className="mt-16 text-center">
            <Link
              to="/product"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#c9a07a] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#b88f6a] shadow-lg shadow-[#c9a07a]/20 transition-all duration-500 group"
            >
              View All Collections
              <IoArrowForwardOutline className="group-hover:translate-x-1 transition-transform" />
            </Link>
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
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  onMouseOver={(e) => e.target.play()}
                  onMouseOut={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                >
                  <source src={video.url} type="video/mp4" />
                </video>
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <p className="text-[10px] font-bold tracking-widest">
                    {video.user}
                  </p>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all flex items-center justify-center">
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
