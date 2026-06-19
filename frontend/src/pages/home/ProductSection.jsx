import React from "react";

const products = [
  {
    id: 1,
    name: "Armchair",
    description: "Light and stylish",
    price: "$145",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
    bg: "bg-green-100",
  },
  {
    id: 2,
    name: "Premium Sofa",
    description: "Elegant comfort",
    price: "$145",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    bg: "bg-sky-100",
  },
  {
    id: 3,
    name: "Minimal Sofa",
    description: "Modern design",
    price: "$145",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400",
    bg: "bg-purple-100",
  },
  {
    id: 4,
    name: "Dining Chair",
    description: "Natural wood finish",
    price: "$145",
    image:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=400",
    bg: "bg-orange-50",
  },
];

export default function ProductSection() {
  return (
    <section className="relative bg-[#f8f6f2] py-16 overflow-hidden">
      {/* Left Large Image */}
      {/* <div className="absolute left-0 top-12 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=1200"
          alt="chair"
          className=" w-[280px] object-cover"
        />
      </div> */}

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-center text-4xl font-bold text-teal-900 mb-12">
          Popular Products
        </h2>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:ml-32">
          {products.map((item) => (
            <div
              key={item.id}
              className={`${item.bg} rounded-lg p-6 shadow-sm hover:shadow-md transition`}
            >
              <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 object-contain"
                />
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>

                <p className="mt-3 font-bold text-gray-900">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/*  Line */}
        <div className="mt-10 lg:ml-32">
          <div className="h-1 bg-teal-700 rounded-full w-full"></div>

          <div className="flex justify-end gap-3 mt-4">
            <button className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
              ‹
            </button>

            <button className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
              ›
            </button>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-teal-700 text-white px-8 py-3 rounded-md hover:bg-teal-800 transition">
            Explore all items →
          </button>
        </div>
      </div>
    </section>
  );
}
