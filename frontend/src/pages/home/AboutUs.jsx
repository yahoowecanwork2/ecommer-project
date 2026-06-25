import React from "react";

const galleryImages = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
];

export default function AboutUs() {
  return (
    <section className="min-h-screen bg-stone-50 flex items-center justify-center p-4 md:p-10">
      <div className="max-w-7xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* Left Image */}
          <div className="relative h-[400px] lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-none text-[#2b1d15]">
                ABOUT
                <br />
                US:
              </h1>

              <h2 className="text-4xl md:text-6xl font-light italic text-[#3f2b21] mt-2">
                Our Story
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div>
                  <p className="text-sm uppercase tracking-wider text-gray-400">
                    Who We Are
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 leading-7">
                    We design beautiful interiors that balance comfort,
                    functionality, and elegance. Our passion is transforming
                    spaces into timeless environments that reflect your
                    personality and lifestyle.
                  </p>

                  <button className="mt-6 px-6 py-3 bg-[#f4eee7] hover:bg-[#e5d8c8] transition rounded-md text-[#3f2b21] font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-4 gap-3 mt-12">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg h-24 md:h-32"
                >
                  <img
                    src={img}
                    alt={`gallery-${index}`}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}