import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import HowItWorks from "@/app/components/HowItWorks";
import FeaturedListings from "@/app/components/FeaturedListings";
import NewestListings from "./components/NewestListings";
import WhyChooseUs from "./components/WhyChooseUs";
import CallToAction from "./components/CallToAction";
import FAQ from "./components/FAQ";
import AppTeaser from "./components/AppTeaser";
import NewsletterSignup from "./components/NewsletterSignup";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <NewestListings />
        <FeaturedListings />
        <WhyChooseUs />
        <CallToAction />
        <FAQ />
        <AppTeaser />
        <NewsletterSignup />
        <Testimonials />
      </main>
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        &copy; {new Date().getFullYear()} HouseSpot. All rights reserved.
      </footer>
    </div>
  );
}
