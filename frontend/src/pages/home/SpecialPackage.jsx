import React from "react";

export default function SpecialPackage() {
  const packageItems = [
    {
      id: 1,
      name: "Living Room Family Set",
      price: "$329.99",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
    },
    {
      id: 2,
      name: "Workspace Package",
      price: "$329.99",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
    },
    {
      id: 3,
      name: "Dining Room Set",
      price: "$587.99",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Heading */}
      <h2 className="text-center text-5xl font-bold text-[#244d4d] mb-16">
        Special Package
      </h2>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <div>
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200"
              alt="Living Room Set"
              className="w-full h-[380px] object-cover"
            />
          </div>

          <div className="flex justify-between items-center mt-5">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Larkin Wood Full Set
              </h3>

              <div className="text-yellow-500 mt-1">
                ★★★★★
              </div> 

              <p className="font-bold text-lg mt-2">
                $729.99
              </p>
            </div>

            <button className="bg-[#244d4d] text-white px-6 py-3 rounded-md hover:bg-[#1c3d3d] transition">
              Add To Cart
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Description
          </h3>

          <p className="text-gray-500 leading-relaxed mb-8">
            Discover beautifully designed furniture packages that
            combine comfort, functionality, and elegance. Perfect
            for modern homes looking for a complete interior
            solution.
          </p>

          {/* Package List */}
          <div className="space-y-4">
            {packageItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-20 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">
                    {item.name}
                  </h4>

                  <div className="text-yellow-500 text-sm mt-1">
                    ★★★★☆
                  </div>
                </div>

                <div className="font-semibold text-gray-800">
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Dots */}
          <div className="flex justify-end gap-3 mt-6">
            <button className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
              ‹
            </button>

            <button className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}