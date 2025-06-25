import SearchBar from "./SearchBar";
import PropertyShowcase from "./PropertyShowCase";

export default function Hero() {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-white via-slate-100 to-white min-h-[90vh]">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Your Future Home, Unlocked.
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Experience the next generation of effortless rental discovery.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <SearchBar />
      </div>
      <div className="mt-10 px-6">
        <PropertyShowcase />
      </div>
    </section>
  );
}
