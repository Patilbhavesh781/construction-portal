import React, { useMemo, useState } from "react";
import { Search, ChevronRight, CheckCircle, Info } from "lucide-react";
import FadeIn from "../../components/animations/FadeIn";
import ScrollReveal from "../../components/animations/ScrollReveal";
import Button from "../../components/common/Button";

const services = [
  {
    id: 1,
    title: "Brick & Plaster Work",
    desc: "Strong brick masonry and smooth plaster finishing for durable structures and impeccable walls.",
    category: "residential",
    img: "https://images.unsplash.com/photo-1590642919589-9b5c8f1e3f1a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Plumbing Work",
    desc: "Professional plumbing for homes and buildings with leakage-free systems and premium fittings.",
    category: "residential",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Waterproofing Work",
    desc: "Advanced roof, bathroom, and terrace waterproofing to ensure your structure stays dry for decades.",
    category: "residential",
    img: "https://images.unsplash.com/photo-1517646281042-749510d5666b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Gypsum & False Ceiling",
    desc: "Modern gypsum ceilings and partitions designed for stylish, ambient, and temperature-controlled interiors.",
    category: "interior",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Painting Work",
    desc: "Interior and exterior painting with smooth textures and weather-resistant, long-lasting finishes.",
    category: "residential",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Electrical Work",
    desc: "Safe, industrial-grade electrical wiring, smart lighting, and robust power solutions.",
    category: "commercial",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Fabrication Work",
    desc: "Heavy-duty steel fabrication for security gates, aesthetic railings, and structural elements.",
    category: "commercial",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Tile Work",
    desc: "Perfect floor and wall tile installation with laser-aligned precision and clean epoxy finishing.",
    category: "interior",
    img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "Door, Window & Lock Work",
    desc: "Installation of premium doors, windows, and high-security smart locking systems.",
    category: "residential",
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "Renovation Work",
    desc: "Complete structural renovation and aesthetic remodeling to breathe new life into old buildings.",
    category: "interior",
    img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "Interior Design",
    desc: "Modern home and office interior design solutions blending ergonomics with luxury.",
    category: "interior",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "Architecture & RCC Work",
    desc: "Vastu-compliant architectural planning and high-strength RCC structural construction.",
    category: "commercial",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    title: "Property Buying & Selling",
    desc: "Trusted assistance in legal documentation and property valuation for buyers and sellers.",
    category: "commercial",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
];

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const searchMatch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase());
      const categoryMatch = category === "all" || s.category === category;
      return searchMatch && categoryMatch;
    });
  }, [search, category]);

  return (
    <div className="w-full bg-slate-50">
      {/* Hero */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=1500&q=80" 
            alt="background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1 mb-4 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest">
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Solutions for Every <span className="text-orange-500">Structure</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-300 text-lg">
              From the initial RCC foundation to the final interior polish, BuildPro delivers craftsmanship that stands the test of time.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition shadow-sm"
            />
          </div>

          <div className="flex p-1 bg-slate-100 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
            {["all", "residential", "commercial", "interior"].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  category === c
                    ? "bg-white text-orange-600 shadow-md"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((s, idx) => (
              <ScrollReveal key={s.id} delay={idx * 0.05}>
                <div className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-slate-100">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                        {s.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6 line-clamp-2">
                      {s.desc}
                    </p>
                    <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors">
                            View Details <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                            <Info className="w-5 h-5" />
                        </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No services found</h3>
              <p className="text-slate-500">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Workflow/Process Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
                <p className="text-slate-400">Our systematic approach to delivering quality.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { step: "01", title: "Consultation", desc: "Understanding your needs and site assessment." },
                    { step: "02", title: "Planning", desc: "Detailed structural and architectural blueprinting." },
                    { step: "03", title: "Execution", desc: "On-site construction with strict quality checks." },
                    { step: "04", title: "Handover", desc: "Final finishing and project walkthrough." },
                ].map((item, i) => (
                    <div key={i} className="relative p-8 bg-slate-800/50 rounded-3xl border border-slate-700/50">
                        <span className="text-5xl font-black text-orange-500/20 absolute top-4 right-6">{item.step}</span>
                        <h4 className="text-xl font-bold mb-2 relative z-10">{item.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
            <div className="bg-orange-600 rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-orange-600/20">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Need a custom solution?</h2>
                <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
                    Tell us about your project requirements and get a detailed quote within 24 hours.
                </p>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 border-none px-10">
                    Get Free Estimate
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Services;