

import {
  CreditCard,
  RotateCcw,
  Headphones,
} from "lucide-react";

export default function BenefitsPage() {
  const benefits = [
    {
      icon: <CreditCard size={32} />,
      title: "Payment Method",
      desc: "We offer flexible payment options to make checkout easier.",
    },
    {
      icon: <RotateCcw size={32} />,
      title: "Return Policy",
      desc: "Return your product within 30 days.",
    },
    {
      icon: <Headphones size={32} />,
      title: "Customer Support",
      desc: "Our support team is available 24/7.",
    },
  ];

  return (
    <section className="bg-sky-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-4xl font-serif font-semibold text-slate-700 mb-14">
          Benefits for your expediency
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="text-center bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex justify-center text-teal-600 mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}