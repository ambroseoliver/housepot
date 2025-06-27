import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import HowItWorks from "@/app/components/HowItWorks";
import FeaturedListings from "@/app/components/FeaturedListings";
import NewestListings from "./components/NewestListings";
import WhyChooseUs from "./components/WhyChooseUs";
import ExploreByLocation from "./components/ExploreByLocation";
import CallToAction from "./components/CallToAction";
import FAQ from "./components/FAQ";
import AppTeaser from "./components/AppTeaser";
import NewsletterSignup from "./components/NewsletterSignup";
import Testimonials from "./components/Testimonials";
import Partners from "./components/Partners";
import Footer from "./components/Footer";

import React from "react";

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
        <ExploreByLocation />
        <CallToAction />
        <FAQ />
        <AppTeaser />
        <NewsletterSignup />
        <Testimonials />
        <Partners />
        <Footer />
      </main>
    </div>
  );
}
