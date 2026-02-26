import Navbar from "@/components/landing/Navbar";
import ContactForm from "@/components/jsw/ContactForm";
import Footer from "@/components/jsw/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

const offices = [
  { city: "Pune", address: "Baner Road, Pune 411045", phone: "+91 20 XXXX XXXX" },
  { city: "Mumbai", address: "BuildPro Centre, BKC, Mumbai 400051", phone: "+91 22 XXXX XXXX" },
  { city: "Bangalore", address: "Whitefield, Bangalore 560066", phone: "+91 80 XXXX XXXX" },
];

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Get in touch</h1>
          <p className="mt-4 text-muted-foreground text-lg">We'd love to hear from you. Reach out to start building your dream home.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>
          <div className="space-y-6">
            {offices.map((office) => (
              <div key={office.city} className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> {office.city}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{office.address}</p>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {office.phone}
                </p>
              </div>
            ))}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" /> Email Us
              </h3>
              <p className="text-sm text-muted-foreground mt-2">info@buildpro.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Contact;
