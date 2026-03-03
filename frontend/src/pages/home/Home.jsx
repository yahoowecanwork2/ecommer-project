import React from "react";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

const Home = () => {
  return (
    <>
      <div className="font-google">
        <Header />
        <section className="relative w-full min-h-screen bg-[#f5f5f3] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 items-center">
            {/* LEFT */}
            <div className="space-y-10 z-10">
              <p className="text-xs tracking-[0.4em] uppercase text-gray-500 fade-up">
                New Drop 2026
              </p>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.95] text-black fade-up-delay">
                Move
                <br />
                Different.
              </h1>

              <p className="text-lg text-gray-600 max-w-md leading-relaxed fade-up-delay-2">
                Contemporary silhouettes built for presence. Designed for the
                ones who don’t blend in.
              </p>

              <div className="flex items-center gap-8 pt-4 fade-up-delay-2">
                <Link
                  to="/product"
                  className="px-10 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
                >
                  Shop Now
                </Link>

                <Link
                  to="/about"
                  className="text-sm font-medium border-b border-black pb-1 hover:opacity-70 transition"
                >
                  Lookbook
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative mt-16 lg:mt-0 overflow-hidden">
              <img
                src="/src/assets/images/image.png"
                alt="Fashion Model"
                className="w-full h-[700px] object-cover image-zoom image-hover"
              />
            </div>
          </div>
        </section>
        {/* <section className="w-full bg-[#faf7f2] py-28">
          <div className="max-w-7xl mx-auto px-6">
            Heading
            <div className="mb-16 text-center">
              <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-4">
                Our Collections
              </p>
              <h2 className="text-4xl md:text-5xl font-medium text-gray-900">
                Find Your Perfect Kurti
              </h2>
            </div>

            Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Festive Wear", img: "/src/assets/images/festive.jpg" },
                { name: "Daily Wear", img: "/src/assets/images/daily.jpg" },
                { name: "Office Wear", img: "/src/assets/images/office.jpg" },
                { name: "Party Wear", img: "/src/assets/images/party.jpg" },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={`/category/${item.name.toLowerCase().replace(" ", "-")}`}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-medium">{item.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section> */}
        <section className="w-full bg-white py-28">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-4">
                  Fresh Drop
                </p>
                <h2 className="text-4xl md:text-5xl font-medium text-gray-900">
                  New Arrivals
                </h2>
              </div>

              <Link
                to="/product"
                className="text-sm font-medium border-b border-gray-900 pb-1 hover:opacity-70 transition"
              >
                View All →
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  name: "Floral Cotton Kurti",
                  price: "₹1,299",
                  img: "/src/assets/images/product1.jpg",
                },
                {
                  name: "Pastel Printed Kurti",
                  price: "₹1,499",
                  img: "/src/assets/images/product2.jpg",
                },
                {
                  name: "Festive Embroidered Kurti",
                  price: "₹1,999",
                  img: "/src/assets/images/product3.jpg",
                },
                {
                  name: "Minimal Office Kurti",
                  price: "₹1,599",
                  img: "/src/assets/images/product4.jpg",
                },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#f7f5f1]">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-6 space-y-2">
                    <h3 className="text-base font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full bg-[#faf7f2] py-28">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Image */}
            <div className="relative">
              <img
                src="/src/assets/images/fabric.jpg"
                alt="Premium Fabric"
                className="w-full h-[550px] object-cover rounded-2xl"
              />
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <p className="text-xs tracking-[0.4em] uppercase text-rose-400">
                Our Promise
              </p>

              <h2 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
                Crafted with comfort,
                <br />
                designed with elegance.
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Every kurti is thoughtfully tailored using breathable fabrics,
                refined stitching, and timeless patterns — ensuring you feel
                confident and comfortable throughout the day.
              </p>

              {/* Features */}
              <div className="space-y-4 text-gray-700 text-sm">
                <div className="flex items-center gap-3">
                  <span>✓</span>
                  <p>Premium cotton & blended fabrics</p>
                </div>

                <div className="flex items-center gap-3">
                  <span>✓</span>
                  <p>Skin-friendly & breathable materials</p>
                </div>

                <div className="flex items-center gap-3">
                  <span>✓</span>
                  <p>Fine stitching & durable finishing</p>
                </div>

                <div className="flex items-center gap-3">
                  <span>✓</span>
                  <p>Easy returns & secure payments</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-white py-28">
          <div className="max-w-6xl mx-auto px-6 text-center">
            {/* Heading */}
            <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-4">
              Loved by Women
            </p>

            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-16">
              What Our Customers Say
            </h2>

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-3 gap-10 text-left">
              {[
                {
                  name: "Priya Sharma",
                  review:
                    "The fabric feels so soft and breathable. Perfect for daily wear and still looks elegant.",
                },
                {
                  name: "Anjali Mehta",
                  review:
                    "The fitting was exactly as shown. I wore it to a family function and got so many compliments!",
                },
                {
                  name: "Ritika Jain",
                  review:
                    "Beautiful designs and amazing quality. Definitely ordering more for the festive season.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-[#faf7f2] p-8 rounded-2xl space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    “{item.review}”
                  </p>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full bg-[#faf7f2] py-28">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-4">
                Community
              </p>
              <h2 className="text-4xl md:text-5xl font-medium text-gray-900">
                #StyledByYou
              </h2>
              <p className="mt-4 text-gray-600 text-sm">
                Real women. Real elegance. Tag us to get featured.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                "/src/assets/images/insta1.jpg",
                "/src/assets/images/insta2.jpg",
                "/src/assets/images/insta3.jpg",
                "/src/assets/images/insta4.jpg",
                "/src/assets/images/insta5.jpg",
                "/src/assets/images/insta6.jpg",
                "/src/assets/images/insta7.jpg",
                "/src/assets/images/insta8.jpg",
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl group cursor-pointer"
                >
                  <img
                    src={img}
                    alt="Customer wearing kurti"
                    className="w-full h-[260px] object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full bg-[#f3e9dc] py-28">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xs tracking-[0.4em] uppercase text-rose-500 mb-6">
              Limited Edition
            </p>

            <h2 className="text-4xl md:text-6xl font-medium text-gray-900 leading-tight max-w-3xl mx-auto">
              Festive Collection 2026
            </h2>

            <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Handpicked festive kurtis crafted in rich fabrics and elegant
              silhouettes. Available for a limited time only.
            </p>

            <div className="mt-10">
              <Link
                to="/category/festive-wear"
                className="px-12 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full bg-white py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 text-center">
              <div className="space-y-3">
                <div className="text-2xl">🚚</div>
                <h3 className="text-sm font-medium text-gray-900">
                  Free Shipping
                </h3>
                <p className="text-xs text-gray-600">On all prepaid orders</p>
              </div>

              <div className="space-y-3">
                <div className="text-2xl">↩️</div>
                <h3 className="text-sm font-medium text-gray-900">
                  Easy Returns
                </h3>
                <p className="text-xs text-gray-600">
                  7-day hassle-free policy
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-2xl">🧵</div>
                <h3 className="text-sm font-medium text-gray-900">
                  Premium Fabric
                </h3>
                <p className="text-xs text-gray-600">
                  Breathable & skin-friendly
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-2xl">💬</div>
                <h3 className="text-sm font-medium text-gray-900">
                  Dedicated Support
                </h3>
                <p className="text-xs text-gray-600">We're here to help</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-[#faf7f2] py-28">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-6">
              Stay Connected
            </p>

            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
              Be the first to know
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Get early access to new arrivals, festive drops, and exclusive
              offers. No spam — just timeless elegance delivered to your inbox.
            </p>

            {/* Email Form */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-full border border-gray-300 text-sm w-full sm:w-80 focus:outline-none focus:border-gray-900"
              />

              <button className="px-10 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  );
};

export default Home;
