import React, { useEffect, useState, useRef, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PhoneCall, CheckCircle, Ruler, HardHat, FileText, Layers } from "lucide-react";

// 3D & Animation
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

// UI Components
import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import ScrollReveal from "../../components/animations/ScrollReveal";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import ServiceCard from "../../components/cards/ServiceCard";

// Services
import ServiceService from "../../services/service.service";
import BookingService from "../../services/booking.service";
import { useAuth } from "../../hooks/useAuth";

<<<<<<< HEAD
const ServiceDetails = ({
  servicesPathBase = "/services",
  showBooking = false,
}) => {
=======
/* ================= 3D REPRESENTATION ================= */
function CategoryModel({ category }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.position.y = Math.sin(t) * 0.1;
    }
  });

  // Unique 3D shapes for different disciplines
  const getShape = () => {
    switch (category) {
      case "construction": return <boxGeometry args={[2.2, 2.2, 2.2]} />;
      case "interior": return <torusKnotGeometry args={[1, 0.4, 128, 32]} />;
      case "architecture": return <cylinderGeometry args={[1.2, 1.2, 2.5, 32]} />;
      default: return <icosahedronGeometry args={[1.5, 1]} />;
    }
  };

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        {getShape()}
        <meshStandardMaterial 
          color="#f97316" 
          metalness={0.7} 
          roughness={0.1} 
          emissive="#f97316" 
          emissiveIntensity={0.2} 
        />
      </mesh>
    </Float>
  );
}

const ServiceDetails = ({ servicesPathBase = "/services" }) => {
>>>>>>> 3d
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
=======
>>>>>>> 3d
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
        const serviceData = await ServiceService.getServiceById(id);
        setService(serviceData);
        setActiveImage(0);
=======
        const data = await ServiceService.getServiceById(id);
        setService(data);
>>>>>>> 3d

        if (data?.category) {
          const related = await ServiceService.getAllServices({ category: data.category, limit: 3 });
          setRelatedServices((related || []).filter(s => s._id !== data._id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchServiceDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900"><Loader size="lg" /></div>;
  if (!service) return null;

  const handleBookService = async () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/user/services/${service._id}` },
      });
      return;
    }

    setBookingLoading(true);
    try {
      await BookingService.createBooking({
        service: service._id,
        bookingType: "service",
        bookingDate: new Date().toISOString(),
      });
      navigate("/user/bookings");
    } catch (err) {
      console.error("Failed to book service:", err);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* ================= 3D HERO HEADER ================= */}
      <section className="relative h-[60vh] bg-slate-900 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <CategoryModel category={service.category} />
              <Environment preset="city" />
              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-6 hover:translate-x-[-5px] transition-transform"
            >
              <ArrowLeft size={16} /> Back to Disciplines
            </button>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              {service.title.split(' ')[0]} <br />
              <span className="text-orange-600">{service.title.split(' ').slice(1).join(' ')}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ================= TECHNICAL SPECS GRID ================= */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <SpecItem icon={<Ruler />} label="Precision" value="0mm Margin" />
          <SpecItem icon={<HardHat />} label="Expertise" value="ISI Certified" />
          <SpecItem icon={<FileText />} label="Documentation" value="Full Plan Set" />
          <SpecItem icon={<Layers />} label="Materials" value="Grade A+" />
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2">
<<<<<<< HEAD
            <FadeIn direction="left">
              <div className="mb-8">
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={
                        service.images?.[activeImage]?.url ||
                        service.images?.[activeImage] ||
                        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80"
                      }
                      alt={service.title}
                      className="w-full h-[350px] object-cover rounded-3xl shadow-lg"
                    />
                  </div>
                  {service.images?.length > 1 && (
                    <div className="grid grid-cols-5 gap-3">
                      {service.images.slice(0, 5).map((img, idx) => (
                        <button
                          key={img.public_id || img.url || idx}
                          type="button"
                          onClick={() => setActiveImage(idx)}
                          className={`rounded-xl overflow-hidden border-2 transition ${
                            activeImage === idx
                              ? "border-orange-500"
                              : "border-transparent"
                          }`}
                        >
                          <img
                            src={img.url || img}
                            alt={`${service.title} ${idx + 1}`}
                            className="w-full h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
=======
            {/* Visual Gallery */}
            <div className="mb-16">
              <img
                src={service.images?.[activeImage]?.url || service.images?.[activeImage] || "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80"}
                className="w-full h-[500px] object-cover rounded-[2.5rem] shadow-2xl mb-6"
                alt={service.title}
              />
              <div className="flex gap-4">
                {service.images?.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(idx)} className={`w-24 h-24 rounded-2xl overflow-hidden border-4 transition ${activeImage === idx ? 'border-orange-600' : 'border-transparent'}`}>
                    <img src={img.url || img} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
>>>>>>> 3d
              </div>
            </div>

            <div className="prose prose-orange max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-tighter">Engineering Overview</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">{service.description}</p>
              
              

<<<<<<< HEAD
            {/* Features / Inclusions */}
            {service.features?.length > 0 && (
              <FadeIn direction="left">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    What’s Included
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            {/* Process / Steps */}
            {service.process?.length > 0 && (
              <FadeIn direction="left">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Our Process
                  </h2>
                  <ol className="space-y-4">
                    {service.process.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-600 text-white font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {step.title || `Step ${index + 1}`}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {step.description || step}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <SlideIn direction="right">
              <div className="sticky top-28 space-y-6">
                {/* Pricing Card */}
                <div className="bg-gray-50 rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Pricing
                  </h3>
                  <p className="text-3xl font-bold text-orange-600 mb-2">
                    {service.price != null
                      ? `₹${service.price.toLocaleString()}`
                      : "Custom Quote"}
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    {service.priceType
                      ? `Pricing: ${service.priceType.replace("_", " ")}`
                      : "Pricing varies based on project scope"}
                  </p>

                  <div className="space-y-3">
                    {showBooking && (
                      <Button
                        className="w-full"
                        onClick={handleBookService}
                        icon={<Calendar className="w-5 h-5" />}
                        loading={bookingLoading}
                        disabled={bookingLoading}
                      >
                        Book This Service
                      </Button>
                    )}
                    <Button
                      className="w-full"
                      onClick={() => navigate(`/contact?service=${service._id}`)}
                      icon={<PhoneCall className="w-5 h-5" />}
                    >
                      Request Callback
                    </Button>
=======
              <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Workflow Integration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                    <CheckCircle className="text-orange-600" size={20} />
                    <span className="font-semibold text-slate-700">{f}</span>
>>>>>>> 3d
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 italic">Request Technical Consultation</h3>
                <p className="text-slate-400 text-sm mb-8">Schedule a site visit from our lead engineer in Nashik to discuss your specific project requirements.</p>
                <div className="space-y-4">
                  <Button className="w-full py-6 rounded-2xl bg-orange-600 border-none text-lg font-bold" onClick={() => navigate('/contact')}>
                    Get a Quote
                  </Button>
                  <Button variant="outline" className="w-full py-6 rounded-2xl border-white/20 text-white hover:bg-white/10" icon={<PhoneCall />}>
                    Call Expert
                  </Button>
                </div>
              </div>

              <div className="p-8 border border-slate-100 rounded-[2.5rem] bg-slate-50">
                <h4 className="font-bold text-slate-900 mb-4">Quality Assurance</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">✔ Daily Progress Reports</li>
                  <li className="flex gap-2">✔ Material Quality Checks</li>
                  <li className="flex gap-2">✔ Structural Safety Audit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ================= HELPER COMPONENT ================= */
const SpecItem = ({ icon, label, value }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-slate-50 transition-colors">
    <div className="bg-orange-100 p-4 rounded-2xl text-orange-600 mb-4">{icon}</div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-xl font-black text-slate-900">{value}</p>
  </div>
);

export default ServiceDetails;