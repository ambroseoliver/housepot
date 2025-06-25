import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        &copy; {new Date().getFullYear()} HouseSpot. All rights reserved.
      </footer>
    </div>
  );
}
