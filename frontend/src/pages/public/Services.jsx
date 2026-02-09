<<<<<<< HEAD
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Hammer,
  Droplet,
  ShieldCheck,
  Brush,
  Zap,
  Wrench,
  Square,
  DoorOpen,
  Key,
  Home,
  Sofa,
  Ruler,
  Building2,
} from "lucide-react";
=======
import React, { useEffect, useMemo, useState, Suspense, useRef } from "react";
import { Search, Hammer, Droplet, ShieldCheck, Brush, Zap, Ruler, Building2, Sofa, CheckCircle } from "lucide-react";
>>>>>>> 3d
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 3D
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment } from "@react-three/drei";

// Components
import ServiceCard from "../../components/cards/ServiceCard";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import FadeIn from "../../components/animations/FadeIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import ServiceService from "../../services/service.service";
import { SERVICE_CATEGORIES } from "../../utils/constants";

/* ================= 3D HEADER MODEL ================= */
function ServiceModel({ category }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.position.y = Math.sin(t) * 0.1;
    }
  });

  const renderShape = () => {
    switch (category) {
      case "construction": return <boxGeometry args={[2, 2, 2]} />;
      case "interior": return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case "architecture": return <cylinderGeometry args={[1, 1, 2.5, 32]} />;
      default: return <sphereGeometry args={[1.3, 32, 32]} />;
    }
  };

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        {renderShape()}
        <meshStandardMaterial color="#f97316" metalness={0.6} roughness={0.2} emissive="#f97316" emissiveIntensity={0.1} />
      </mesh>
    </Float>
  );
}

const Services = ({ detailsPathBase = "/services" }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const serviceTypes = [
    { title: "Bricks & Plaster Work", icon: Hammer, category: "construction" },
    { title: "Plumbing Work", icon: Droplet, category: "construction" },
    { title: "Waterproofing Work", icon: ShieldCheck, category: "construction" },
    { title: "Gypsum Work", icon: Square, category: "interior" },
    { title: "Painting Work", icon: Brush, category: "construction" },
    { title: "Electrical Work", icon: Zap, category: "construction" },
    { title: "Fabrication Work", icon: Wrench, category: "construction" },
    { title: "Tile Work", icon: Square, category: "construction" },
    { title: "Door & Window Work", icon: DoorOpen, category: "construction" },
    { title: "Lock & Key Work", icon: Key, category: "construction" },
    { title: "Renovation Work", icon: Home, category: "renovation" },
    { title: "Interior Design Work", icon: Sofa, category: "interior" },
    { title: "Architecture Planning & RCC Work", icon: Ruler, category: "architecture" },
    { title: "Property Buying & Selling", icon: Building2, category: "real-estate" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await ServiceService.getAllServices();
        setServices(res || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch = s.title?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || s.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [services, search, category]);

  return (
    <div className="w-full bg-white selection:bg-orange-100">
      
      {/* 3D HERO SECTION */}
      <section className="relative min-h-[65vh] flex items-center bg-slate-950 overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <ServiceModel category={category} />
              <Environment preset="city" />
            </Suspense>
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center lg:text-left grid grid-cols-1 lg:grid-cols-2">
          <FadeIn>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-6">
              EXPERT <br /> <span className="text-orange-500">ENGINEERING.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed font-medium">
              We provide an integrated technical workflow for Nashik’s residential and commercial projects.
            </p>
          </FadeIn>
        </div>
      </section>

<<<<<<< HEAD
      {/* Service Types */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Our Service Types
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse all core construction and specialty services we offer.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.title}
                  onClick={() => setCategory(type.category)}
                  className="flex items-center gap-3 bg-gray-50 border rounded-xl p-4 text-left hover:border-orange-400 hover:bg-orange-50 transition"
                >
                  <span className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {type.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
=======
      {/* FILTER DASHBOARD */}
      <section className="py-20 bg-white relative z-20 -mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white shadow-2xl rounded-[3.5rem] p-10 border border-slate-100">
             <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Technical Filter</h2>
                    <p className="text-slate-500 font-medium">Browse our construction & interior capabilities.</p>
                </div>
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search technical work..." 
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 font-bold"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
             </div>
>>>>>>> 3d

             <div className="flex flex-wrap gap-3">
                <FilterBtn active={category === 'all'} label="Everything" onClick={() => setCategory('all')} />
                {SERVICE_CATEGORIES.map(cat => (
                    <FilterBtn key={cat.value} active={category === cat.value} label={cat.label} onClick={() => setCategory(cat.value)} />
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 3D SERVICES GRID */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20"><Loader size="lg" /></div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              <AnimatePresence>
                {filteredServices.map((service) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={service._id}
                  >
                    <ServiceCard service={service} detailsPathBase={detailsPathBase} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ENGINEERING STANDARDS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
                <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-none">
                    Certified <br /> <span className="text-orange-500 underline decoration-8 underline-offset-4">Materials.</span>
                </h2>
                <div className="space-y-4">
                    <StandardRow title="Structural Integrity" text="ISI Marked Steel & Grade 43/53 Cement." />
                    <StandardRow title="Waterproofing" text="Multi-layer polymer coating standards." />
                    <StandardRow title="Electrical" text="FRLS grade wiring and modular safety switches." />
                    <StandardRow title="3D Precision" text="Visualizing every pipe & beam before construction." />
                </div>
            </ScrollReveal>
            <div className="relative">
                <img src="https://images.unsplash.com/photo-1503387762-592dee58c460" className="rounded-[4rem] shadow-2xl" alt="Blueprint" />
                <div className="absolute -bottom-10 -left-10 bg-slate-900 p-8 rounded-3xl text-white shadow-2xl">
                   <p className="text-4xl font-black">100%</p>
                   <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Quality Assured</p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-orange-600 text-white text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">Ready to Build?</h2>
        <Button size="lg" className="bg-white text-orange-600 rounded-full px-16 py-8 text-xl font-black shadow-2xl" onClick={() => navigate("/contact")}>
            Get Free Quote
        </Button>
      </section>
    </div>
  );
};

/* ================= HELPERS ================= */
const FilterBtn = ({ active, label, onClick }) => (
    <button onClick={onClick} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-orange-600 text-white shadow-xl scale-105' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{label}</button>
);

const StandardRow = ({ title, text }) => (
    <div className="flex gap-4 p-6 rounded-3xl border border-slate-100 hover:border-orange-500 transition-all group">
        <CheckCircle size={24} className="text-orange-600" />
        <div>
            <h4 className="font-black text-slate-900 text-lg uppercase tracking-tighter">{title}</h4>
            <p className="text-slate-500 text-sm">{text}</p>
        </div>
    </div>
);

export default Services;