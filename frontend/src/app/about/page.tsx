"use client";

import { Users, Building, Sparkles, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="min-h-screen py-24 px-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            About <span className="text-indigo-600">HouseSpot</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We&#39;re revolutionizing the way Kenyans find homes — simple, secure,
            and stunning.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-2">🌍 Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400">
              To connect tenants and landlords seamlessly through a modern
              platform that values quality, trust, and convenience.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">🔭 Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400">
              To be Kenya&#39;s most trusted and innovative digital real estate
              platform — empowering every user to find the perfect space.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <ValueCard icon={<HeartHandshake />} title="Integrity" />
            <ValueCard icon={<Sparkles />} title="Innovation" />
            <ValueCard icon={<Building />} title="Quality Listings" />
            <ValueCard icon={<Users />} title="User-Centered" />
          </div>
        </div>

        {/* Why We're Different */}
        <div>
          <h2 className="text-3xl font-bold mb-4">What Sets Us Apart</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li>📸 Only high-quality listings with verified media</li>
            <li>⚡️ Super-fast search with intelligent filtering</li>
            <li>🧑‍💻 Landlord-controlled listing via pro media booking</li>
            <li>🧠 Smart, minimal design for an exceptional user experience</li>
            <li>🌐 Built with modern, secure tech (Next.js + Tailwind)</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/support"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

// Reusable Value Card Component
function ValueCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-all text-center">
      <div className="flex justify-center mb-3 text-indigo-600">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );
}
