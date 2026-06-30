
// CategoryPage.jsx

const categories = [
  {
    id: 1,
    name: "Chair",
    count: "120 Products",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: 2,
    name: "Sofa",
    count: "86 Products",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  },
  {
    id: 3,
    name: "Table",
    count: "54 Products",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86",
  },
  {
    id: 4,
    name: "Lighting",
    count: "39 Products",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
  },
];

export default function CategoryPage() {
  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-sm uppercase tracking-widest text-teal-600">
              Categories
            </span>

            <h2 className="text-4xl font-serif text-slate-800 mt-2">
              Explore by Category
            </h2>
          </div>

          <button className="border border-slate-300 px-5 py-2 rounded-full hover:bg-slate-100 transition">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-slate-800">
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  {item.count}
                </p>

                <button className="mt-4 text-teal-700 font-medium">
                  Shop Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}