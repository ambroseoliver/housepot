"use client";

import { Search, Home, UploadCloud } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Discover",
    description: "Explore homes tailored to your lifestyle and budget.",
  },
  {
    icon: <Home className="w-8 h-8 text-primary" />,
    title: "Book",
    description: "Schedule viewings or request more information easily.",
  },
  {
    icon: <UploadCloud className="w-8 h-8 text-primary" />,
    title: "List Your Property",
    description: "Landlords can book professional media & go live in no time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-24 px-6 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-8 text-center shadow hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
