// ProductPage.jsx

import { Heart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Modern Lounge Chair",
    category: "Chair",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Luxury Sofa",
    category: "Sofa",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Wood Dining Table",
    category: "Table",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Minimal Lamp",
    category: "Lighting",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Scandinavian Chair",
    category: "Chair",
    price: 279,
    image:
      "https://images.unsplash.com/photo-1582582429416-47b13c7f2f6b",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Premium Sofa Set",
    category: "Sofa",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8",
    rating: 4.9,
  },
];

export default function ProductPage() {
  return (
    <section className="bg-[#f8faf9] min-h-screen">
      {/* Hero */}
      <div className="bg-[#EAF4F2] py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* <p className="text-gray-500">
            Home / Products
          </p> */}

          <h1 className="text-5xl font-serif text-slate-800 mt-3">
            Furniture Collection
          </h1>
        </div>
      </div>

 
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search furniture..."
            className="border bg-white px-4 py-3 rounded-lg w-full md:w-80"
          />

          <div className="flex gap-4">
            <select className="border bg-white px-4 py-3 rounded-lg">
              <option>All Categories</option>
              <option>Chair</option>
              <option>Sofa</option>
              <option>Table</option>
              <option>Lighting</option>
            </select>

            <select className="border bg-white px-4 py-3 rounded-lg">
              <option>Latest</option>
              <option>Price Low-High</option>
              <option>Price High-Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-80 w-full object-cover"
                />

                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                  <Heart size={18} />
                </button>
              </div>

              <div className="p-5">
                <span className="text-sm text-teal-600">
                  {product.category}
                </span>

                <h3 className="font-semibold text-xl mt-1">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mt-2">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span>{product.rating}</span>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <p className="text-2xl font-bold">
                    ${product.price}
                  </p>

                  <button className="bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800">
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

  
        <div className="flex justify-center gap-3 mt-12">
          <button className="w-10 h-10 rounded-full bg-teal-700 text-white">
            1
          </button>

          <button className="w-10 h-10 rounded-full border">
            2
          </button>

          <button className="w-10 h-10 rounded-full border">
            3
          </button>
        </div>
      </div>
    </section>
  );
}