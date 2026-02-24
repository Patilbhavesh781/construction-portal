import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Home, LayoutGrid } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const stats = [
  { icon: Star, value: "+81", label: "NPS\nScore" },
  { icon: Home, value: "180+", label: "Homes\nDelivered" },
  { icon: LayoutGrid, value: "227+", label: "Homes Under\nConstruction" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                You Dream.
                <br />
                <span className="text-foreground">We Deliver.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-md">
                Build your dream home hassle-free with JSW One Homes.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-0">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center">
                  <div className="text-center px-5">
                    <stat.icon className="w-7 h-7 mx-auto mb-2 text-foreground/70" />
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground whitespace-pre-line mt-1">{stat.label}</p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-16 bg-border" />
                  )}
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="rounded-full px-10 text-base shadow-glow">
              <Link to="/book-meeting">Book a meeting</Link>
            </Button>
          </div>

          {/* Right - Hero image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={heroImage}
                alt="Modern luxury home"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;