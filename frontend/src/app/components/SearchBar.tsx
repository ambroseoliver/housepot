import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-[90%] max-w-xl">
      <input
        type="text"
        placeholder="Find your dream preferences"
        className="flex-grow outline-none px-2 text-gray-800 placeholder-gray-400"
      />
      <button className="bg-black text-white p-2 rounded-full">
        <Search size={20} />
      </button>
    </div>
  );
}
