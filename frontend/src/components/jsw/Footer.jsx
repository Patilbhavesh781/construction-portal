import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <span className="text-xl font-extrabold">
              JSW <span className="text-primary">ONE</span> HOMES
            </span>
            <p className="mt-4 text-sm text-accent-foreground/60 leading-relaxed">
              Build your dream home hassle-free with India's most trusted home construction partner.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-accent-foreground/50">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/projects" className="text-sm text-accent-foreground/70 hover:text-primary transition-colors">Our Projects</Link>
              <Link to="/about" className="text-sm text-accent-foreground/70 hover:text-primary transition-colors">How it Works</Link>
              <Link to="/testimonials" className="text-sm text-accent-foreground/70 hover:text-primary transition-colors">Testimonials</Link>
              <Link to="/contact" className="text-sm text-accent-foreground/70 hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-accent-foreground/50">Cities</h4>
            <div className="flex flex-col gap-3">
              {["Pune", "Mumbai", "Bangalore", "Chennai", "Hyderabad"].map(city => (
                <span key={city} className="text-sm text-accent-foreground/70">{city}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-accent-foreground/50">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-accent-foreground/70">
              <span>info@jswonehomes.com</span>
              <span>+91 1800-XXX-XXXX</span>
              <span>JSW Centre, Mumbai</span>
            </div>
          </div>
        </div>

        <div className="border-t border-accent-foreground/10 mt-12 pt-8 text-center text-sm text-accent-foreground/40">
          © 2025 JSW One Homes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;