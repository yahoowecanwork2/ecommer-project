import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="font-google">
      <Header />
      <section className="w-full bg-[#f5f1ea] py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-6">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-6xl font-medium text-gray-900 leading-tight">
            We’d love to hear from you.
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Whether it’s a question about sizing, orders, or styling — our team
            is here to help.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          {/* Form */}
          <div className="space-y-6">
            <h2 className="text-3xl font-medium text-gray-900">
              Send a Message
            </h2>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gray-900"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gray-900"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-6 py-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gray-900 resize-none"
              ></textarea>

              <button
                type="submit"
                className="px-10 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-3xl font-medium text-gray-900">Get in Touch</h2>

            <div className="space-y-6 text-gray-600 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-1">Email</p>
                <p>support@yourbrand.com</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1">Phone</p>
                <p>+91 98765 43210</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1">Working Hours</p>
                <p>Monday – Saturday</p>
                <p>10:00 AM – 7:00 PM</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1">Address</p>
                <p>Your Store Address Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-medium text-gray-900 text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8 text-gray-700">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                What is your return policy?
              </h3>
              <p className="text-sm">
                We offer a 7-day hassle-free return policy on eligible items.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                How do I choose the right size?
              </h3>
              <p className="text-sm">
                Please refer to our size guide available on each product page.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                How long does shipping take?
              </h3>
              <p className="text-sm">
                Orders are usually delivered within 3–5 business days.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white py-24 text-center">
        <h2 className="text-3xl font-medium text-gray-900">
          Explore Our Latest Collection
        </h2>

        <div className="mt-8">
          <Link
            to="/product"
            className="px-12 py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
