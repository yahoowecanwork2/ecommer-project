import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Shipping = () => {
  return (
    <div className="font-google">
      <Header />
      <section className="w-full bg-[#f5f1ea] py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-6">
            Information
          </p>

          <h1 className="text-5xl font-medium text-gray-900">
            Shipping Policy
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed">
            We aim to deliver your orders safely and quickly. Below are the
            details regarding order processing, shipping timelines, and
            delivery.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Order Processing
          </h2>

          <p className="text-gray-600 leading-relaxed">
            All orders are processed within 24–48 hours after confirmation.
            Orders placed on weekends or public holidays will be processed on
            the next working day.
          </p>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Delivery Timeline
          </h2>

          <ul className="text-gray-600 space-y-3 text-sm">
            <li>• Metro cities: 2–4 business days</li>
            <li>• Other cities: 3–6 business days</li>
            <li>• Remote locations may take slightly longer</li>
          </ul>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Shipping Charges
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We offer free shipping on all prepaid orders. A small shipping fee
            may apply for Cash on Delivery (COD) orders depending on the
            location.
          </p>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">Order Tracking</h2>

          <p className="text-gray-600 leading-relaxed">
            Once your order is shipped, you will receive a tracking link via
            email or SMS so you can follow the delivery status of your package.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">Need Help?</h2>

          <p className="text-gray-600 leading-relaxed">
            If your order is delayed or you face any issues with delivery,
            please contact our support team and we will assist you promptly.
          </p>

          <p className="text-sm text-gray-700">Email: support@yourbrand.com</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;
