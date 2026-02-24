import Navbar from "@/components/landing/Navbar";
import StatsCounter from "@/components/jsw/StatsCounter";
import BookingCTA from "@/components/jsw/BookingCTA";
import Footer from "@/components/jsw/Footer";
import { Target, Eye, Heart, Clock } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const values = [
  { icon: Target, title: "Quality First", desc: "Every home is built with JSW Steel — the strongest foundation for lasting durability." },
  { icon: Eye, title: "Transparency", desc: "Real-time updates, clear timelines, and honest communication at every stage." },
  { icon: Heart, title: "Customer Centric", desc: "Your vision drives everything we do. We listen, design, and deliver." },
  { icon: Clock, title: "On-Time Delivery", desc: "We respect your time with disciplined project management and timely handovers." },
];

const timeline = [
  { year: "2019", event: "JSW One Homes launched with a vision to transform home construction in India." },
  { year: "2020", event: "Expanded to 5 major cities with 50+ completed homes." },
  { year: "2022", event: "Crossed 100+ homes delivered with an NPS of 81+." },
  { year: "2024", event: "180+ homes delivered, 227+ under construction across India." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Building dreams,<br />one home at a time.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              JSW One Homes is part of the JSW Group — India's leading conglomerate. 
              We bring world-class materials, expert architects, and end-to-end service 
              to make home construction hassle-free.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={heroImage} alt="About JSW" className="w-full h-80 object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-border text-center card-hover">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Our Journey</h2>
        <div className="space-y-8">
          {timeline.map((t, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{t.year}</div>
                {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
              </div>
              <div className="pb-8">
                <p className="text-foreground leading-relaxed">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <StatsCounter />
    <BookingCTA />
    <Footer />
  </div>
);

export default About;
