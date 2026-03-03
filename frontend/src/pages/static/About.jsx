import React from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";

const About = () => {
  return (
    <div className="font-google">
      <Header />
      <section className="w-full bg-[#f5f1ea] py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-6">
            About Us
          </p>

          <h1 className="text-5xl md:text-6xl font-medium text-gray-900 leading-tight">
            Crafted for women
            <br />
            who carry grace effortlessly.
          </h1>

          <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We design timeless kurtis that blend comfort, culture, and
            contemporary elegance — made for everyday confidence.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <img
              src="/src/assets/images/about-story.jpg"
              alt="Our Story"
              className="w-full h-[550px] object-cover rounded-2xl"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-medium text-gray-900">Our Story</h2>

            <p className="text-gray-600 leading-relaxed">
              Born from a love for traditional Indian craftsmanship, our brand
              began with a simple belief — clothing should feel as beautiful as
              it looks.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We work closely with skilled artisans and trusted fabric suppliers
              to create kurtis that are breathable, versatile, and thoughtfully
              tailored for modern women.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-medium text-gray-900 mb-10">
            Thoughtful Craftsmanship
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            From selecting breathable fabrics to ensuring fine stitching, every
            piece goes through careful quality checks. We focus on fit, finish,
            and fabric — because details define elegance.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Comfort First
              </h3>
              <p className="text-sm text-gray-600">
                Designed for all-day ease and breathable wear.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Timeless Design
              </h3>
              <p className="text-sm text-gray-600">
                Classic silhouettes with modern detailing.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Quality Promise
              </h3>
              <p className="text-sm text-gray-600">
                Premium fabrics and durable finishing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#f3e9dc] py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-medium text-gray-900">
            Discover the Collection
          </h2>

          <p className="mt-6 text-gray-600">
            Explore our latest designs crafted with elegance and care.
          </p>

          <div className="mt-10">
            <Link
              to="/product"
              className="px-12 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default About;
