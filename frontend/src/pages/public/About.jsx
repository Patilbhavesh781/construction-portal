import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Target, Leaf, ArrowUpRight, Globe } from "lucide-react";

const About = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <main className="bg-white w-full overflow-x-hidden selection:bg-red-100">
      
      {/* ================= HERO: DYNAMIC PARALLAX ================= */}
      <section className="relative h-[90svh] flex items-center px-8 md:px-24 overflow-hidden bg-black">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100"
            alt="Premium Homes"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
        </motion.div>

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs uppercase tracking-[0.5em] text-red-600 font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              Est. 1998 — Moving Forward
            </span>
            <h1 className="text-6xl md:text-[100px] font-light text-gray-900 mt-8 leading-[0.9] tracking-tighter">
              Crafting Legacies <br />
              <span className="font-serif italic text-red-600">Since Last Century</span>
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-gray-600 max-w-2xl font-light leading-relaxed">
              As of 2026, we remain committed to creating resilient residential ecosystems 
              where architectural innovation meets sustainable longevity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= PHILOSOPHY: BENTO GRID REVEAL ================= */}
      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-5xl font-light text-gray-900 mb-8 tracking-tight">
                An Intelligent <br /><b>Design Ethos</b>
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-8">
                Our approach has evolved. We don't just build structures; we utilize 
                <b> AI-driven site optimization</b> and <b>regenerative materials</b> to 
                ensure every community we build contributes to its environment.
              </p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 group text-sm font-bold uppercase tracking-widest border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors">
                  View Our 2026 Impact Report <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=100"
                alt="Modern Architecture"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= LEGACY: REAL-TIME STATS ================= */}
      <section className="py-32 px-8 md:px-24 bg-zinc-900 text-white rounded-[3rem] mx-4 md:mx-8 shadow-inner overflow-hidden relative">
        <Globe className="absolute -right-20 -top-20 text-white/5 w-96 h-96" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-5">
            <h2 className="text-5xl font-light mb-8">A Legacy <br />Measured in <b>Trust</b></h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12 font-light">
              With 28 years of uninterrupted growth, we have redefined the urban skyline across 12 major economic hubs.
            </p>

            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              {[
                { label: "Families Served", value: "10k+", suffix: "Happy Souls" },
                { label: "Carbon Offset", value: "35%", suffix: "Net Zero Path" },
                { label: "Cities Presence", value: "12", suffix: "Metropolitans" },
                { label: "Active Sites", value: "18", suffix: "Under Construction" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-4xl font-bold text-red-500">{item.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] font-bold text-white">{item.label}</p>
                  <p className="text-zinc-500 text-[10px] mt-1 italic">{item.suffix}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=100"
                alt="Luxury Estate"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES: INTERACTIVE CARDS ================= */}
      <section className="py-32 px-8 md:px-24">
        <motion.div {...fadeIn} className="text-center mb-24">
          <span className="text-red-600 font-bold text-xs uppercase tracking-widest">Our Foundation</span>
          <h2 className="text-5xl font-light text-gray-900 mt-4">The Pillars of 2026</h2>
        </motion.div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Absolute Integrity",
              icon: <Shield className="text-red-600" size={32} />,
              desc: "Smart-contract based transparency for every transaction.",
            },
            {
              title: "Uncompromising Quality",
              icon: <Target className="text-red-600" size={32} />,
              desc: "IOT-monitored construction health for lifetime structural safety.",
            },
            {
              title: "Climate Responsibility",
              icon: <Leaf className="text-red-600" size={32} />,
              desc: "LEED Platinum standards integrated into every square foot.",
            },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-12 bg-zinc-50 rounded-3xl border border-zinc-100 hover:bg-white hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA: CINEMATIC ================= */}
      <section className="relative py-48 px-8 md:px-24 bg-zinc-900 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" className="w-full h-full object-cover grayscale" />
        </div>
        
        <div className="relative z-10">
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-8xl font-light text-white tracking-tighter"
          >
            Defining the <br /> <span className="font-serif italic text-red-600">Urban Future</span>
          </motion.h2>
          <button className="mt-16 px-16 py-6 bg-red-600 text-white font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 rounded-full">
            Explore 2026 Collection
          </button>
        </div>
      </section>

    </main>
  );
};

export default About;