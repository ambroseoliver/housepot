"use client";

import { Search } from "lucide-react";

export default function SmartSearch() {
  return (
    <div className="relative w-full max-w-2xl mt-6">
      <input
        type="text"
        placeholder="Where do you dream of living?"
        className="w-full py-4 px-6 pr-14 rounded-full shadow-lg text-lg placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
