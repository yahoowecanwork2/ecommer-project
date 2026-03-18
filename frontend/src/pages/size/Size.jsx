import React from "react";
import { IoInformationCircleOutline, IoCallOutline } from "react-icons/io5";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Size = () => {
  const sizeData = [
    { size: "XS", bust: 32, waist: 28, hip: 36 },
    { size: "S", bust: 34, waist: 30, hip: 38 },
    { size: "M", bust: 36, waist: 32, hip: 40 },
    { size: "L", bust: 38, waist: 34, hip: 42 },
    { size: "XL", bust: 40, waist: 36, hip: 44 },
    { size: "XXL", bust: 42, waist: 38, hip: 46 },
  ];

  return (
    <div className="bg-[#f8f5f1] min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto pt-28 pb-20 px-6">
        {/* --- Title --- */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-wide text-gray-900">
            Size Guide
          </h1>
          <p className="text-gray-500 mt-2 text-sm tracking-wide">
            Find your perfect fit (in inches)
          </p>

          {/* gold divider */}
          <div className="w-16 h-[2px] bg-[#c9a07a] mx-auto mt-4"></div>
        </div>

        {/* --- Table --- */}
        <div className="overflow-hidden rounded-2xl border border-[#e8dfd6] shadow-sm mb-12 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f3ede7] border-b border-[#e5dcd3]">
                  <th className="py-4 px-6 text-[13px] font-semibold tracking-wide">
                    Size
                  </th>
                  <th className="py-4 px-6 text-[13px] font-semibold tracking-wide">
                    Bust
                  </th>
                  <th className="py-4 px-6 text-[13px] font-semibold tracking-wide">
                    Waist
                  </th>
                  <th className="py-4 px-6 text-[13px] font-semibold tracking-wide">
                    Hip
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f0ebe5]">
                {sizeData.map((item, index) => (
                  <tr key={index} className="hover:bg-[#faf7f3] transition-all">
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      {item.size}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{item.bust}"</td>
                    <td className="py-4 px-6 text-gray-600">{item.waist}"</td>
                    <td className="py-4 px-6 text-gray-600">{item.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Info Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Notes */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gray-900 mb-5">
              <IoInformationCircleOutline
                className="text-[#c9a07a]"
                size={18}
              />
              Important Notes
            </h3>

            <ul className="space-y-4 text-gray-600 text-sm">
              <li className="flex gap-3">
                <span className="text-[#c9a07a]">•</span>
                Choose size based on <b>bust measurement</b>.
              </li>
              <li className="flex gap-3">
                <span className="text-[#c9a07a]">•</span>
                1-inch margin included in every garment.
              </li>
              <li className="flex gap-3">
                <span className="text-[#c9a07a]">•</span>
                Use a soft measuring tape for accuracy.
              </li>
            </ul>
          </div>

          {/* Contact Box */}
          <div className="bg-white border border-[#e8dfd6] p-6 rounded-2xl shadow-sm flex flex-col justify-center text-center">
            <p className="text-sm text-gray-600 mb-5">
              Not sure about your size? Get help from our experts.
            </p>

            <button className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-[#c9a07a] hover:text-black transition-all text-sm font-medium">
              <IoCallOutline />
              Talk to Fit Expert
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Size;
