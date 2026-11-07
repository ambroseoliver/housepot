import Hero from "@/app/components/Hero";
import HowItWorks from "@/app/components/HowItWorks";
import FeaturedListings from "@/app/components/FeaturedListings";
import WhyChooseUs from "./components/WhyChooseUs";
import ExploreByLocation from "./components/ExploreByLocation";
import CallToAction from "./components/CallToAction";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <>
        <Hero />
        <FeaturedListings />
        <ExploreByLocation />
        <HowItWorks />
        <WhyChooseUs />
        <CallToAction />
        <FAQ />
    </>
  );
}
