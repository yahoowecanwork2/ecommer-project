import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Return = () => {
  return (
    <div className="font-google">
      <Header />
      <section className="w-full bg-[#f5f1ea] py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-rose-400 mb-6">
            Information
          </p>

          <h1 className="text-5xl font-medium text-gray-900">
            Return & Refund Policy
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed">
            We want you to love what you wear. If something isn’t quite right,
            our return process is simple and hassle-free.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Return Eligibility
          </h2>

          <ul className="text-gray-600 space-y-3 text-sm">
            <li>• Returns must be requested within 7 days of delivery.</li>
            <li>
              • Items must be unused, unwashed, and in original condition.
            </li>
            <li>• All tags and packaging must be intact.</li>
            <li>
              • Products purchased during clearance sales may not be eligible
              for return.
            </li>
          </ul>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            How to Request a Return
          </h2>

          <ol className="text-gray-600 space-y-3 text-sm">
            <li>1. Contact our support team with your order number.</li>
            <li>2. Our team will guide you through the return process.</li>
            <li>
              3. Once the item is received and inspected, the refund will be
              initiated.
            </li>
          </ol>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">Refunds</h2>

          <p className="text-gray-600 leading-relaxed">
            Once we receive and inspect the returned product, the refund will be
            processed within 5–7 business days. Refunds are issued to the
            original payment method used during checkout.
          </p>
        </div>
      </section>
      <section className="w-full bg-[#faf7f2] py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Non-Returnable Items
          </h2>

          <ul className="text-gray-600 space-y-3 text-sm">
            <li>• Items marked as Final Sale</li>
            <li>• Products damaged due to misuse</li>
            <li>• Items returned without original packaging</li>
          </ul>
        </div>
      </section>
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl font-medium text-gray-900">
            Need Assistance?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            If you have any questions regarding returns or refunds, feel free to
            contact our support team.
          </p>

          <p className="text-sm text-gray-700">Email: support@yourbrand.com</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Return;
