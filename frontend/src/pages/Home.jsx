import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/jsw/HeroSection";
import WhyJSWCards from "@/components/jsw/WhyJSWCards";
import ProjectGallery from "@/components/jsw/ProjectGallery";
import StatsCounter from "@/components/jsw/StatsCounter";
import PackagesSection from "@/components/jsw/PackageSection";
import TestimonialsCarousel from "@/components/jsw/TestimonialsCarousel";
import BookingCTA from "@/components/jsw/BookingCTA";
import ExperienceCentres from "@/components/jsw/ExperienceCentres";
import ContactCTASection from "../components/jsw/ContactCTASection";

import Footer from "@/components/jsw/Footer";

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">
    <Navbar />
    <HeroSection />
    <WhyJSWCards />
    <ProjectGallery />
    <StatsCounter />
    <PackagesSection />
    <TestimonialsCarousel />
    <BookingCTA />
    <ExperienceCentres />
    <ContactCTASection/>
    <Footer />
  </div>
);

export default Home;
