"use client";

import { Search, Mic, MapPin } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [isListening, setIsListening] = useState(false);
  const [location, setLocation] = useState("");
  const [houseType, setHouseType] = useState("");
  const [budget, setBudget] = useState("");

  const handleMicClick = () => {
    setIsListening(true);
    alert("🎙 Voice input coming soon!");
    setTimeout(() => setIsListening(false), 1500);
  };

  const handleSearch = () => {
    console.log({ location, houseType, budget });
    // Future: Redirect or filter listings
  };

  return (
    <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-center transition-all">
      {/* Location Input */}
      <div className="relative w-full sm:w-auto flex-1">
        <span className="absolute left-4 top-3 text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Enter Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10 pr-4 py-3 w-full rounded-full border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* House Type */}
      <select
        value={houseType}
        onChange={(e) => setHouseType(e.target.value)}
        className="flex-1 px-4 py-3 rounded-full border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        <option value="">Select House Type</option>
        <option value="single-room">Single Room</option>
        <option value="bedsitter">Bedsitter / Studio</option>
        <option value="1-bedroom">1 Bedroom</option>
        <option value="2-bedroom">2 Bedroom</option>
        <option value="3-bedroom">3 Bedroom</option>
      </select>

      {/* Budget */}
      <select
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="flex-1 px-4 py-3 rounded-full border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        <option value="">Budget</option>
        <option value="5000">Below KSh 5,000</option>
        <option value="10000">KSh 5,001 – 10,000</option>
        <option value="20000">KSh 10,001 – 20,000</option>
        <option value="20001">KSh 20,001 - 25,000</option>
        <option value="25001">KSh 25,001 - 30,000</option>
        <option value="30000">KSh 30,001 - 40,000</option>
        <option value="40001">KSh 40,001 - 50,000</option>
        <option value="50001"> Above KSh 50,000</option>
      </select>

      {/* Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg"
        >
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
