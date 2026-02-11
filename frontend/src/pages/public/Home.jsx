import React, { useState, useRef } from "react";

import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform 
} from "framer-motion";

import { 
  Plus, 
  ArrowRight, 
  Shield, 
  Trees, 
  Waves, 
  Zap, 
  Droplets, 
  Layout 
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const plans = [
  { name: "Standard", price: "₹ 1499", color: "bg-white", text: "text-zinc-900" },
  { name: "Premium", price: "₹ 1749", color: "bg-zinc-900", text: "text-white" },
  { name: "Luxury", price: "₹ 2099", color: "bg-stone-100", text: "text-zinc-900" },
];

const features = [
  "Design", "Structure", "Flooring and dado", "Door and windows",
  "Plumbing accessories", "Painting", "Electrical", "Plumbing", "Railing and handrails",
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (planIndex, featureIndex) => {
    const id = `${planIndex}-${featureIndex}`;
    setOpenIndex(openIndex === id ? null : id);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "circOut" }
  };

  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for images
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <main className="bg-[#fcfcfc] w-full overflow-x-hidden selection:bg-red-500 selection:text-white">
      
      {/* ================= HERO (Section 1) ================= */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100"
            className="w-full h-full object-cover"
            alt="Premium Homes"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        </motion.div>

        <div className="relative z-10 px-8 md:px-24 max-w-7xl w-full">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-red-500 font-bold tracking-[0.5em] uppercase text-xs"
          >
            Est. 1998
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-[120px] font-light text-white leading-[0.9] tracking-tighter mt-6"
          >
            Creating Communities <br /> 
            <span className="italic font-serif text-red-500">That Inspire Living</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-xl text-gray-300 max-w-xl leading-relaxed font-light"
          >
            Thoughtfully planned residences designed to enhance everyday life,
            built with integrity and long-term value.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            <button className="px-12 py-5 bg-red-600 text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-xs font-bold">
              Our Portfolio
            </button>
            <button className="px-12 py-5 border border-white/30 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-xs font-bold">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

     

      
      <section
  ref={containerRef}
  className="relative py-52 px-6 md:px-24 bg-black text-white overflow-hidden"
>

  {/* Ambient Background Glow */}
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[160px] -z-10" />

  {/* ================= TOP STATEMENT ================= */}
  <div className="text-center max-w-5xl mx-auto mb-40">
    <motion.span
      initial={{ opacity: 0, letterSpacing: "0.5em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-red-500 uppercase text-xs font-bold tracking-[0.4em]"
    >
      Philosophy
    </motion.span>

    <motion.h2
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="mt-10 text-6xl md:text-8xl font-light leading-[0.95] tracking-tight"
    >
      Architecture that <br />
      <span className="font-semibold">Respects the Future</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      viewport={{ once: true }}
      className="mt-10 text-gray-400 text-xl max-w-2xl mx-auto font-light"
    >
      We design living spaces that harmonize innovation,
      sustainability, and timeless elegance.
    </motion.p>
  </div>

  {/* ================= IMAGE + FLOATING PANEL ================= */}
  <div className="relative max-w-7xl mx-auto">

    {/* Cinematic Image */}
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="rounded-3xl overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.7)]"
    >
      <motion.img
        style={{ y: imageY }}
        src="https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=100"
        className="w-full h-[750px] object-cover scale-110"
        alt="Luxury Sustainable Home"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
    </motion.div>

    {/* Floating Glass Panel */}
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      viewport={{ once: true }}
      className="absolute bottom-[-80px] left-1/2 -translate-x-1/2
                 w-[90%] md:w-[70%]
                 backdrop-blur-2xl
                 bg-white/10
                 border border-white/20
                 rounded-3xl
                 p-16
                 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
    >
      <div className="grid md:grid-cols-3 gap-12 text-center">

        {[
          { number: "100%", label: "Eco Materials" },
          { number: "A+", label: "Energy Rating" },
          { number: "25+ Years", label: "Structural Warranty" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-light text-red-400 mb-4">
              {item.number}
            </h3>
            <p className="text-gray-300 uppercase tracking-widest text-xs font-semibold">
              {item.label}
            </p>
          </motion.div>
        ))}

      </div>
    </motion.div>
  </div>

  {/* ================= LOWER DESCRIPTION BLOCK ================= */}
  <div className="mt-52 max-w-5xl mx-auto text-center">
    <motion.h3
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-light leading-tight"
    >
      Designed With <span className="italic text-red-500">Responsibility</span>
    </motion.h3>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
      viewport={{ once: true }}
      className="mt-10 text-gray-400 text-lg max-w-3xl mx-auto font-light"
    >
      From renewable energy integration to intelligent airflow planning,
      every detail is engineered to enhance long-term sustainability
      while maintaining uncompromising luxury.
    </motion.p>
  </div>

</section>

      {/* ================= FULL SCREEN SLIDER ================= */}
      <section className="py-20 bg-zinc-900 overflow-hidden">
        <div className="mb-12 px-8 md:px-24">
          <span className="text-red-500 font-bold tracking-[0.4em] uppercase text-xs">Our Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter mt-2">Current Developments</h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1.2}      // Shows 20% of the next/prev slides
          centeredSlides={true}    // Keeps active slide in middle
          spaceBetween={30}        // Gap between slides
          loop={true}              // Infinite carousel
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 1.5 }, // More preview visible on tablet/desktop
            1024: { slidesPerView: 1.8 }
          }}
          className="h-[70vh] w-full items-center"
        >
          {[
            { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", title: "Urban Living Estates", location: "Mumbai" },
            { img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea", title: "The Sky Garden", location: "Pune" },
            { img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0", title: "Green Horizon", location: "Nashik" },
            { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", title: "Royal Palms", location: "Goa" }
          ].map((item, index) => (
            <SwiperSlide key={index} className="transition-all duration-700">
              {({ isActive }) => (
                <div 
                  className={`relative h-full w-full transition-all duration-1000 ease-out overflow-hidden rounded-2xl ${
                    isActive ? "scale-100 opacity-100 shadow-2xl" : "scale-90 opacity-40 grayscale"
                  }`}
                >
                  <img 
                    src={`${item.img}?auto=format&fit=crop&q=100`} 
                    className="w-full h-full object-cover" 
                    alt={item.title} 
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Content only visible/clear when active */}
                  <div className={`absolute bottom-12 left-10 text-white transition-all duration-700 delay-300 ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}>
                    <span className="text-red-500 font-bold tracking-widest text-xs uppercase">{item.location}</span>
                    <h3 className="text-4xl md:text-5xl font-light tracking-tighter mt-2">{item.title}</h3>
                    <button className="mt-6 flex items-center gap-2 text-xs font-bold tracking-widest uppercase border-b border-red-500 pb-1 hover:text-red-500 transition-colors">
                      View Details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Styling */}
        <style dangerouslySetInnerHTML={{ __html: `
          .swiper-button-next, .swiper-button-prev { color: white !important; transform: scale(0.7); }
          .swiper-pagination-bullet { background: white !important; opacity: 0.3; }
          .swiper-pagination-bullet-active { background: #ef4444 !important; opacity: 1; width: 24px; border-radius: 4px; transition: all 0.3s; }
        `}} />
      </section>

     

  

      {/* ================= PRICING SECTION (Clean Minimalist) ================= */}
      <section className="py-32 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-light text-white tracking-tighter">Investment Tiers</h2>
            <p className="text-zinc-500 mt-4 uppercase tracking-widest text-xs font-bold">Transparent value for excellence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, planIndex) => (
              <motion.div 
                key={planIndex}
                whileHover={{ y: -10 }}
                className={`${plan.color} ${plan.text} p-10 rounded-sm shadow-2xl flex flex-col`}
              >
                <div className="mb-12">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-red-600">
                    {plan.name} Package
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tighter">{plan.price}</span>
                    <span className="text-xs opacity-60">/sq.ft</span>
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  {features.map((feature, featureIndex) => {
                    const id = `${planIndex}-${featureIndex}`;
                    const isOpen = openIndex === id;

                    return (
                      <div key={featureIndex} className="border-t border-current/10 py-2">
                        <button
                          onClick={() => toggle(planIndex, featureIndex)}
                          className="flex items-center justify-between w-full group"
                        >
                          <span className={`text-sm tracking-tight transition-all ${isOpen ? 'font-bold' : 'opacity-70 group-hover:opacity-100'}`}>
                            {feature}
                          </span>
                          <motion.div animate={{ rotate: isOpen ? 135 : 0 }} className="opacity-50">
                            <Plus size={14} />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-4 text-[11px] leading-relaxed opacity-60 uppercase tracking-wider">
                                Detailed information about {feature} included in {plan.name} package.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
                <button className="mt-12 w-full py-4 bg-red-600 text-white font-bold text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-black">
                  Inquire Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LUXURY AMENITIES SECTION ================= */}

<section className="relative py-40 px-6 md:px-24 bg-black text-white overflow-hidden">

  {/* Ambient Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[140px] rounded-full -z-10" />

  {/* Section Header */}
  <div className="text-center max-w-4xl mx-auto mb-24">
    <motion.span
      initial={{ opacity: 0, letterSpacing: "0.5em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-red-500 uppercase text-xs font-bold tracking-[0.4em]"
    >
      Lifestyle
    </motion.span>

    <motion.h2
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="mt-8 text-5xl md:text-7xl font-light leading-tight"
    >
      Elevated Living <br />
      <span className="font-semibold">Beyond Expectations</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
      viewport={{ once: true }}
      className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto font-light"
    >
      Designed to complement modern lifestyles with refined
      comfort, security, and indulgence.
    </motion.p>
  </div>

  {/* Amenities Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">

    {[
      { name: "Infinity Pool", icon: <Waves size={32} /> },
      { name: "Clubhouse", icon: <Layout size={32} /> },
      { name: "Fitness Center", icon: <Zap size={32} /> },
      { name: "Organic Gardens", icon: <Trees size={32} /> },
      { name: "Smart Security", icon: <Shield size={32} /> },
      { name: "Jogging Track", icon: <Trees size={32} /> },
      { name: "Zen Deck", icon: <Droplets size={32} /> },
      { name: "Kids Play Area", icon: <Layout size={32} /> },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        className="group relative p-10 rounded-3xl 
                   backdrop-blur-xl 
                   bg-white/5 
                   border border-white/10 
                   hover:border-red-500/40
                   transition-all duration-500
                   hover:scale-105
                   hover:bg-white/10"
      >

        {/* Icon */}
        <div className="mb-6 text-red-500 group-hover:scale-110 transition-transform duration-500">
          {item.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-light tracking-wide">
          {item.name}
        </h3>

        {/* Subtle Divider */}
        <div className="mt-6 h-px w-12 bg-red-500/40 group-hover:w-20 transition-all duration-500" />

      </motion.div>
    ))}

  </div>

</section>


{/* ================= LUXURY REVIEW SECTION ================= */}

<section className="relative py-40 px-6 md:px-24 bg-black text-white overflow-hidden">

  {/* Ambient Glow */}
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -z-10" />

  {/* Section Header */}
  <div className="text-center max-w-4xl mx-auto mb-24">
    <motion.span
      initial={{ opacity: 0, letterSpacing: "0.5em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-red-500 uppercase text-xs font-bold tracking-[0.4em]"
    >
      Testimonials
    </motion.span>

    <motion.h2
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="mt-8 text-5xl md:text-7xl font-light leading-tight"
    >
      What Our <span className="font-semibold">Residents Say</span>
    </motion.h2>
  </div>

  {/* Review Cards */}
  <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

    {[
      {
        name: "Rohit Sharma",
        role: "Business Owner",
        review:
          "The attention to detail and architectural quality exceeded our expectations. Every space feels thoughtfully designed and premium.",
      },
      {
        name: "Ananya Mehta",
        role: "Interior Designer",
        review:
          "Sustainability and elegance perfectly balanced. The environment feels calm, luxurious, and future-ready.",
      },
      {
        name: "Vikram Patel",
        role: "Entrepreneur",
        review:
          "From smart security to premium amenities, this development sets a new benchmark for modern living.",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        className="relative p-12 rounded-3xl 
                   backdrop-blur-xl 
                   bg-white/5 
                   border border-white/10 
                   hover:border-red-500/40
                   transition-all duration-500
                   hover:scale-105"
      >
        {/* Stars */}
        <div className="flex gap-1 mb-6 text-red-500">
          {"★★★★★"}
        </div>

        {/* Review Text */}
        <p className="text-gray-300 leading-relaxed text-lg font-light mb-10">
          "{item.review}"
        </p>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Client Info */}
        <div>
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            {item.role}
          </p>
        </div>
      </motion.div>
    ))}
  </div>

</section>



{/* ================= ULTRA LUXURY FINAL CTA ================= */}

<section className="relative py-56 bg-black text-white overflow-hidden">

  {/* Background Image with Cinematic Overlay */}
  <motion.div
    initial={{ scale: 1.15 }}
    whileInView={{ scale: 1 }}
    transition={{ duration: 2 }}
    viewport={{ once: true }}
    className="absolute inset-0 z-0"
  >
    <img
      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=100"
      className="w-full h-full object-cover"
      alt="Luxury Building"
    />
    <div className="absolute inset-0 bg-black/80" />
  </motion.div>

  {/* Ambient Glow */}
  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full -z-10" />

  {/* Glass Content Panel */}
  <div className="relative z-10 max-w-4xl mx-auto text-center px-8">

    <motion.h2
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-5xl md:text-8xl font-light leading-[0.95] tracking-tight"
    >
      Ready to Discover Your <br />
      <span className="italic font-serif text-red-500">
        Perfect Residence?
      </span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
      viewport={{ once: true }}
      className="mt-10 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
    >
      Schedule a private consultation with our experts and
      experience a new benchmark of architectural excellence.
    </motion.p>

    {/* Premium Button */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-20 py-6 text-xs font-bold tracking-[0.4em] uppercase 
                   bg-gradient-to-r from-red-600 to-red-500
                   rounded-full
                   shadow-[0_20px_60px_rgba(239,68,68,0.5)]
                   transition-all duration-500"
      >
        Book Private Viewing
      </motion.button>
    </motion.div>

  </div>

</section>


    </main>
  );
};

export default Home;