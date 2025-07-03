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
    <div className="w-full max-w-6xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-4 items-center justify-between transition-all">
      {/* Location Input */}
      <div className="relative w-full lg:flex-1">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <span className="absolute left-4 top-3.5 text-gray-500 dark:text-gray-400">
          <MapPin className="w-5 h-5" />
        </span>
        <input
          id="location"
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-12 pr-4 py-3 w-full rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
        />
      </div>

      {/* House Type */}
      <div className="w-full lg:flex-1">
        <label htmlFor="houseType" className="sr-only">
          House Type
        </label>
        <select
          id="houseType"
          value={houseType}
          onChange={(e) => setHouseType(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
        >
          <option value="">House Type</option>
          <option value="single-room">Single Room</option>
          <option value="bedsitter">Bedsitter / Studio</option>
          <option value="1-bedroom">1 Bedroom</option>
          <option value="2-bedroom">2 Bedroom</option>
          <option value="3-bedroom">3 Bedroom</option>
        </select>
      </div>

      {/* Budget */}
      <div className="w-full lg:flex-1">
        <label htmlFor="budget" className="sr-only">
          Budget
        </label>
        <select
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
        >
          <option value="">Select Budget</option>
          <option value="5000">Below KSh 5,000</option>
          <option value="10000">KSh 5,001 – 10,000</option>
          <option value="20000">KSh 10,001 – 20,000</option>
          <option value="20001">KSh 20,001 – 25,000</option>
          <option value="25001">KSh 25,001 – 30,000</option>
          <option value="30000">KSh 30,001 – 40,000</option>
          <option value="40001">KSh 40,001 – 50,000</option>
          <option value="50001">Above KSh 50,000</option>
        </select>
      </div>

      {/* Search & Mic Buttons */}
      <div className="flex gap-3 w-full lg:w-auto justify-center">
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Search className="w-5 h-5" />
          Search
        </button>

        <button
          onClick={handleMicClick}
          className={`p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 ${
            isListening
              ? "bg-red-600 text-white focus:ring-red-400"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:scale-110"
          }`}
          aria-label="Voice Search"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
