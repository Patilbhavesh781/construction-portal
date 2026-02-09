import React, { useEffect, useMemo, useState, Suspense } from "react";
import { Search, Globe, Home as HomeIcon, MapPin, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// 3D
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// UI Components
import FadeIn from "../../components/animations/FadeIn";
import ScrollReveal from "../../components/animations/ScrollReveal";
import PropertyCard from "../../components/cards/PropertyCard";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

// Services
import PropertyService from "../../services/property.service";

/* ================= 360° PREVIEW COMPONENT ================= */
// This renders a small 360 room inside the card/modal
function Property360Preview({ imageUrl }) {
  const texture = useLoader(THREE.TextureLoader, imageUrl || "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=2070");
  
  return (
    <mesh>
      <sphereGeometry args={[5, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview3D, setPreview3D] = useState(null); // Stores ID of property being viewed in 3D

  // Filter States
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all"); 
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await PropertyService.getAllProperties();
        setProperties(res || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase()) || 
                           p.location?.city?.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "all" || p.purpose === type;
      const matchesCategory = category === "all" || p.type === category;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [properties, search, type, category]);

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* ================= 1. 3D HERO SECTION ================= */}
      <section className="relative h-[50vh] bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
           <Canvas camera={{ position: [0, 0, 0.1] }}>
              <Suspense fallback={null}>
                 <Property360Preview />
                 <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
              </Suspense>
           </Canvas>
        </div>
        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
              VIRTUAL <span className="text-orange-500">REALTY.</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Explore Nashik's finest properties through high-fidelity 3D walkthroughs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE FILTERS ================= */}
      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search city or area..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-orange-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full lg:w-auto">
             {["all", "sale", "rent"].map((t) => (
                <button 
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all ${type === t ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  {t}
                </button>
             ))}
          </div>
        </div>
      </section>

      {/* ================= 3. PROPERTY GRID WITH 3D TOGGLE ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20"><Loader size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map((property) => (
                <motion.div 
                  key={property._id}
                  layout
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 relative"
                >
                  {/* Image/3D Switcher Container */}
                  <div className="relative h-72 overflow-hidden">
                    {preview3D === property._id ? (
                      <div className="h-full w-full bg-black">
                        <Canvas camera={{ position: [0, 0, 0.1] }}>
                          <Suspense fallback={null}>
                            <Property360Preview imageUrl={property.images?.[0]?.url || property.images?.[0]} />
                            <OrbitControls enableZoom={false} />
                          </Suspense>
                        </Canvas>
                        <button 
                          onClick={() => setPreview3D(null)}
                          className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <img 
                          src={property.images?.[0]?.url || property.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          alt={property.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <button 
                          onClick={() => setPreview3D(property._id)}
                          className="absolute bottom-4 right-4 flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                        >
                          <Globe size={14} /> 360° View
                        </button>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                       <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black uppercase rounded-lg tracking-widest">
                          {property.purpose}
                       </span>
                       <p className="text-xl font-black text-slate-900">₹{property.price?.toLocaleString()}</p>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{property.title}</h3>
                    <div className="flex items-center gap-1 text-slate-400 text-sm mb-6">
                       <MapPin size={14} />
                       <span>{property.location?.city}, Nashik</span>
                    </div>
                    <Button 
                      className="w-full rounded-2xl bg-slate-900 text-white font-bold"
                      onClick={() => navigate(`/properties/${property._id}`)}
                    >
                      View Property Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= 4. FINAL CTA ================= */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-orange-600 rounded-[3.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-200">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
           <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">LIST YOUR PROPERTY.</h2>
           <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
              Get a professional 3D scan of your property and find buyers faster with BuildPro.
           </p>
           <Button size="lg" className="bg-white text-orange-600 px-12 rounded-full font-black">
              Get Started Now
           </Button>
        </div>
      </section>

    </div>
  );
};

export default Properties;