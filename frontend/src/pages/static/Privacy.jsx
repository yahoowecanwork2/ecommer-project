import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Privacy = () => {
  return (
    <div className="font-google">
      <Header />
      <section className="w-full bg-[#f5f1ea] py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-6">
            Legal
          </p>

          <h1 className="text-5xl font-medium text-gray-900">Privacy Policy</h1>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Your privacy matters to us. This policy explains how we collect,
            use, and protect your personal information when you use our website.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Information We Collect
          </h2>

          <p className="text-gray-600 leading-relaxed">
            When you place an order or interact with our website, we may collect
            personal information such as your name, email address, phone number,
            shipping address, and payment details.
          </p>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            How We Use Your Information
          </h2>

          <ul className="text-gray-600 space-y-3 text-sm">
            <li>• To process and deliver your orders</li>
            <li>• To communicate order updates</li>
            <li>• To improve our products and website experience</li>
            <li>• To send promotional updates (only if you opt in)</li>
          </ul>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Cookies & Tracking Technologies
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our website uses cookies to enhance user experience, analyze site
            traffic, and personalize content. You can choose to disable cookies
            through your browser settings.
          </p>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Data Protection
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We implement secure technologies and procedures to protect your
            personal information from unauthorized access, misuse, or
            disclosure.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Third-Party Services
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We may share limited information with trusted partners such as
            payment gateways and delivery services to complete your order.
          </p>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">Your Rights</h2>

          <p className="text-gray-600 leading-relaxed">
            You have the right to access, update, or request deletion of your
            personal data. You can contact us anytime for assistance.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">Contact Us</h2>

          <p className="text-gray-600 leading-relaxed">
            If you have any questions regarding this privacy policy, feel free
            to contact us.
          </p>

          <p className="text-sm text-gray-700">Email: support@yourbrand.com</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Privacy;
