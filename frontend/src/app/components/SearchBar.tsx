"use client";

import { Search, Mic } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = () => {
    setIsListening(true);
    // TODO: Integrate Web Speech API in future
    alert("🎙 Voice input coming soon!");
    setTimeout(() => setIsListening(false), 1500);
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-center transition-all">
      <select className="flex-1 px-4 py-3 rounded-full border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-transform duration-200 hover:scale-[1.02]">
        <option>Apartment</option>
        <option>House</option>
        <option>Bed Sitter</option>
        <option>Studio</option>
      </select>

      <select className="flex-1 px-4 py-3 rounded-full border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-transform duration-200 hover:scale-[1.02]">
        <option>Nairobi</option>
        <option>Mombasa</option>
        <option>Kisumu</option>
        <option>Thika</option>
        <option>Eldoret</option>
      </select>

      <select className="flex-1 px-4 py-3 rounded-full border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-transform duration-200 hover:scale-[1.02]">
        <option>Below Ksh 10,000</option>
        <option>Ksh 10,000 - 30,000</option>
        <option>Ksh 30,000 - 60,000</option>
        <option>Above Ksh 60,000</option>
      </select>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg">
          <Search className="w-5 h-5" />
          Search
        </button>

        <button
          onClick={handleMicClick}
          className={`p-3 rounded-full transition-all ${
            isListening
              ? "bg-red-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          } hover:scale-110`}
          aria-label="Voice Search"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
