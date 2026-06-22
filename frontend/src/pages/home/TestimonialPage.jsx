

export default function TestimonialPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-center text-4xl font-serif text-slate-700">
          Testimonials
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-12">
          Over 15,000 happy customers
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            alt="customer"
            className="rounded-lg w-full h-80 object-cover"
          />

          <div>
            <p className="text-lg text-gray-600 leading-relaxed">
              “My experience with Mark is a complete success,
              from customer service and wide range of products
              to clean store and purchasing experience.”
            </p>

            <div className="mt-6">
              <h4 className="font-semibold">
                Leona Paul
              </h4>

              <span className="text-gray-500 text-sm">
                CEO of Fashion
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          <div className="w-3 h-3 rounded-full bg-teal-600"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
}