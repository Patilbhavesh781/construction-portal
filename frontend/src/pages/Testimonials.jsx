import Navbar from "@/components/landing/Navbar";
import TestimonialsCarousel from "@/components/jsw/TestimonialsCarousel";
import StatsCounter from "@/components/jsw/StatsCounter";
import BookingCTA from "@/components/jsw/BookingCTA";
import Footer from "@/components/jsw/Footer";

const Testimonials = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <TestimonialsCarousel />
      <StatsCounter />
    </div>
    <BookingCTA />
    <Footer />
  </div>
);

export default Testimonials;
