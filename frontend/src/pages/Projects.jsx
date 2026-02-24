import Navbar from "@/components/landing/Navbar";
import ProjectGallery from "@/components/jsw/ProjectGallery";
import BookingCTA from "@/components/jsw/BookingCTA";
import Footer from "@/components/jsw/Footer";

const Projects = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <ProjectGallery />
    </div>
    <BookingCTA />
    <Footer />
  </div>
);

export default Projects;
