<<<<<<< HEAD
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Home,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
=======
import React, { useEffect, useRef, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, MapPin, Home as HomeIcon, IndianRupee, 
  ChevronLeft, ChevronRight, Globe, Tv, ChefHat, BedDouble, CheckCircle
>>>>>>> 3d
} from "lucide-react";

// 3D
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

// UI Components
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import PropertyService from "../../services/property.service";

/* ================= 360 PANORAMA COMPONENT (FIXED) ================= */
function PanoramaViewer({ url }) {
  // We use the texture loader with anonymous cross-origin to prevent 404/CORS errors
  const texture = useLoader(THREE.TextureLoader, url, (loader) => {
    loader.crossOrigin = "anonymous";
  });

  // Ensure the texture is mapped correctly for a sphere interior
  useEffect(() => {
    if (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  return (
    <mesh>
      {/* Reverse the sphere geometry so the image is on the inside */}
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
=======
  const [activeRoom, setActiveRoom] = useState("hall");

  // VERIFIED 360° PANORAMA URLS (Equirectangular)
  const roomViews = {
    hall: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=2000",
    kitchen: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=2000",
    bedroom: "https://images.unsplash.com/photo-1616489953149-7597b77d4221?auto=format&fit=crop&q=80&w=2000",
  };
>>>>>>> 3d

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await PropertyService.getPropertyById(id);
        setProperty(data);
        setActiveIndex(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProperty();
  }, [id]);

<<<<<<< HEAD
  const images = useMemo(() => {
    if (Array.isArray(property?.images) && property.images.length > 0) {
      return property.images.map((img) => img.url || img);
    }
    return [
      "https://via.placeholder.com/1200x600?text=Property+Image",
    ];
  }, [property?.images]);

  const coverImage = images[activeIndex] || images[0];

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => navigate("/properties")}>
          Back to Properties
        </Button>
      </div>
    );
  }

=======
  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-900"><Loader size="lg" /></div>;
>>>>>>> 3d
  if (!property) return null;

  return (
    <div className="w-full bg-white selection:bg-orange-100">
      
      {/* ================= 1. 360° VIRTUAL TOUR HEADER ================= */}
      <section className="relative h-[75vh] md:h-[85vh] bg-black overflow-hidden">
        <Canvas 
            camera={{ position: [0, 0, 0.1], fov: 75 }}
            gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}
        >
          <Suspense fallback={null}>
            <PanoramaViewer url={roomViews[activeRoom]} />
            {/* Added OrbitControls so the user can drag to look around */}
            <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                rotateSpeed={-0.5} // Reversed for more natural feel inside a sphere
            />
          </Suspense>
        </Canvas>

        {/* HUD OVERLAY: BACK BUTTON */}
        <div className="absolute top-24 left-6 z-20">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-black/40 backdrop-blur-md text-white px-5 py-2 rounded-full border border-white/20 hover:bg-orange-600 transition-all"
          >
            <ArrowLeft size={18} /> Back to Listings
          </button>
        </div>

        {/* HUD OVERLAY: ROOM SWITCHER */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-4 bg-black/40 backdrop-blur-xl p-2 rounded-[2rem] border border-white/10 shadow-2xl">
           <RoomTab active={activeRoom === 'hall'} label="Living Hall" icon={<Tv size={16}/>} onClick={() => setActiveRoom('hall')} />
           <RoomTab active={activeRoom === 'kitchen'} label="Kitchen" icon={<ChefHat size={16}/>} onClick={() => setActiveRoom('kitchen')} />
           <RoomTab active={activeRoom === 'bedroom'} label="Bedroom" icon={<BedDouble size={16}/>} onClick={() => setActiveRoom('bedroom')} />
        </div>

        {/* 360 INTERACTIVE LABEL */}
        <div className="absolute top-24 right-6 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-[10px] font-black tracking-widest uppercase border border-white/10">
           <Globe className="w-3 h-3 text-green-500 animate-pulse" />
           Drag to explore 360°
        </div>
      </section>

<<<<<<< HEAD
      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            <FadeIn direction="left">
              <div className="relative">
                <img
                  src={coverImage}
                  alt={property.title}
                  className="w-full h-[350px] object-cover rounded-3xl shadow-lg"
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Property Overview
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right */}
          <div className="lg:col-span-1">
            <SlideIn direction="right">
              <div className="sticky top-28 space-y-6">
                <div className="bg-gray-50 rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Property Info
                  </h3>

                  {(property.location?.city || property.location?.address) && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>
                        {property.location?.city ||
                          property.location?.address}
                      </span>
                    </div>
                  )}

                  {property.price != null && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <IndianRupee className="w-4 h-4 text-gray-500" />
                      <span>{property.price.toLocaleString()}</span>
                    </div>
                  )}

                  {property.area?.size && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Home className="w-4 h-4 text-gray-500" />
                      <span>
                        {property.area.size} {property.area.unit || "sqft"}
                      </span>
                    </div>
                  )}
=======
      {/* ================= 2. PROPERTY DETAILS CONTENT ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="bg-orange-50 text-orange-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                    Exclusive Listing
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                    {property.title}
                </h1>
                
                <div className="flex flex-wrap gap-8 items-center border-y border-slate-100 py-8 mb-10">
                   <InfoMetric label="Price" value={`₹${property.price?.toLocaleString()}`} icon={<IndianRupee className="text-orange-500" />} />
                   <InfoMetric label="Location" value={property.location?.city} icon={<MapPin className="text-orange-500" />} />
                   <InfoMetric label="Total Area" value={`${property.area?.size} ${property.area?.unit}`} icon={<HomeIcon className="text-orange-500" />} />
>>>>>>> 3d
                </div>

                <div className="prose prose-slate max-w-none">
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Architectural Summary</h3>
                    <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                        {property.description}
                    </p>
                </div>

                <div className="mt-12">
                   <h3 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-4">Standard Amenities</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Modular Kitchen", "POP Ceiling", "Smart Lighting", "Premium Flooring", "CCTV Security", "Dedicated Parking"].map(item => (
                         <div key={item} className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl text-slate-700 font-semibold text-sm border border-slate-100">
                            <CheckCircle size={16} className="text-orange-600" /> {item}
                         </div>
                      ))}
                   </div>
                </div>
            </motion.div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <SlideIn direction="right">
                <div className="sticky top-28 bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />
                    <h3 className="text-2xl font-bold mb-6">Request a <br/>Physical Tour</h3>
                    <p className="text-slate-400 text-sm mb-10 leading-relaxed">Our agents in Nashik are available for site visits and financial consultation regarding this project.</p>
                    
                    <div className="space-y-4">
                        <Button size="lg" className="w-full bg-orange-600 rounded-2xl py-6 font-bold hover:bg-orange-500 border-none shadow-lg shadow-orange-900/20" onClick={() => navigate("/contact")}>
                            Book Site Visit
                        </Button>
                        <Button variant="outline" size="lg" className="w-full border-white/20 text-white rounded-2xl py-6 font-bold hover:bg-white/10 transition-colors">
                            Download Plan PDF
                        </Button>
                    </div>

                    <div className="mt-10 pt-10 border-t border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-bold text-lg">C</div>
                        <div>
                            <p className="text-sm font-bold text-white">Chetan.Dev</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Lead Consultant</p>
                        </div>
                    </div>
                </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ================= HELPER COMPONENTS ================= */

const RoomTab = ({ active, label, icon, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
            active ? 'bg-orange-600 text-white shadow-lg scale-105' : 'text-slate-400 bg-white/5 hover:bg-white/10'
        }`}
    >
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </button>
);

const InfoMetric = ({ label, value, icon }) => (
    <div className="flex items-center gap-4">
        <div className="bg-orange-50 p-3 rounded-2xl">{icon}</div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-black text-slate-900">{value}</p>
        </div>
    </div>
);

export default PropertyDetails;