import React, { useEffect, useRef, useState, Suspense } from "react";
import {
  ChevronDown, Tv, ChefHat, Layout, Layers, BedDouble, Lightbulb, 
  ArrowRight, ShieldCheck, Box, Ruler, Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// 3D
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";

// UI
import Button from "../../components/common/Button";
import ScrollReveal from "../../components/animations/ScrollReveal";

/* ================= 3D INTERIOR SCENE (Detailed) ================= */
function InteriorScene({ scroll }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    let targetRotation = scroll * Math.PI * 2; 
    let targetX = Math.sin(scroll * Math.PI) * 1.5;

    group.current.rotation.y += (targetRotation - group.current.rotation.y) * 0.05;
    group.current.position.x += (targetX - group.current.position.x) * 0.05;
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* KITCHEN MODULE */}
      <group position={[0, 0, 3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[3, 1, 1]} />
          <meshStandardMaterial color="#f97316" roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[3.1, 0.1, 1.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} />
        </mesh>
        {/* Breakfast Stools */}
        <mesh position={[-0.8, 0.25, 0.8]}>
          <cylinderGeometry args={[0.2, 0.2, 0.5]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.8, 0.25, 0.8]}>
          <cylinderGeometry args={[0.2, 0.2, 0.5]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>

      {/* TV UNIT MODULE */}
      <group position={[3.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 1.5, -0.5]} castShadow>
          <boxGeometry args={[4, 3, 0.1]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 1.6, -0.3]}>
          <boxGeometry args={[2.5, 1.4, 0.05]} />
          <meshStandardMaterial color="#000000" metalness={1} />
        </mesh>
        {/* Floating Cabinet */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[3.5, 0.4, 0.6]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
      </group>

      {/* BEDROOM MODULE */}
      <group position={[-3, 0, -2]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[2.5, 0.5, 3]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0, 1.1, -1.4]}>
          <boxGeometry args={[2.6, 1.2, 0.2]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
      </group>

      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      <ContactShadows opacity={0.6} scale={20} blur={2.4} />
    </group>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrollValue(v));

  return (
    <div ref={containerRef} className="relative w-full bg-slate-950">
      
      {/* STICKY 3D BACKDROP */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [8, 5, 8], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
          <Environment preset="apartment" />
          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <InteriorScene scroll={scrollValue} />
            </Float>
          </Suspense>
        </Canvas>
        
        {/* 3D Label Overlay */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block">
           <div className="rotate-90 text-white/10 text-9xl font-black select-none tracking-tighter">
              NASHIK_2026
           </div>
        </div>
      </div>

      {/* CONTENT LAYERS */}
      <div className="relative z-10">
        
        {/* 1. HERO */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6 text-orange-500 font-bold tracking-widest uppercase text-sm">
              <ShieldCheck size={20} /> Verified Premium Renovation
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white leading-none mb-8">
              BEYOND <br /> <span className="text-orange-500 italic">LIMITS.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
              We don't just build interiors; we render reality. Experience a seamless fusion of architectural precision and 3D visualization.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-slate-950 rounded-full px-12 font-bold hover:bg-orange-500 transition-all">Start My 3D Plan</Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white rounded-full">View Portfolio</Button>
            </div>
          </motion.div>
        </section>

        {/* 2. KITCHEN + REAL IMAGE */}
        <section className="h-screen flex items-center justify-between px-6 md:px-20">
          <ScrollReveal direction="left">
            <FeatureWithImage 
              icon={<ChefHat />}
              title="Gourmet Kitchens"
              desc="Modular cabinets with anti-fingerprint laminates and Italian marble tops."
              img="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80"
            />
          </ScrollReveal>
        </section>

        {/* 3. TV UNIT + REAL IMAGE */}
        <section className="h-screen flex items-center justify-start px-6 md:px-20">
          <ScrollReveal direction="right">
            <FeatureWithImage 
              icon={<Tv />}
              title="Entertainment Hubs"
              desc="Acoustically optimized TV units with integrated ambient LED strips."
              img="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=800&q=80"
              reverse
            />
          </ScrollReveal>
        </section>

        {/* 4. MATERIAL SELECTION (NEW CONTENT) */}
        <section className="min-h-screen bg-white rounded-t-[5rem] py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
                  THE MATERIAL <br /> <span className="text-orange-600">LIBRARY.</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <MaterialItem icon={<Box />} title="Quartz & Stone" text="Scratch-resistant surfaces for lifelong durability." />
                  <MaterialItem icon={<Ruler />} title="Precision Carpentry" text="CNC-cut modules for 0mm error margin." />
                  <MaterialItem icon={<Sparkles />} title="Finishing" text="High-gloss PU and rustic charcoal textures." />
                  <MaterialItem icon={<Lightbulb />} title="Smart Lighting" text="App-controlled cove and task illumination." />
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1616489953149-7597b77d4221?auto=format&fit=crop&w=800&q=80" 
                  alt="Materials" 
                  className="rounded-[3rem] shadow-2xl"
                />
                <div className="absolute -bottom-10 -left-10 bg-slate-900 p-8 rounded-3xl text-white hidden md:block">
                  <p className="text-4xl font-bold">500+</p>
                  <p className="text-orange-500 font-bold text-sm">Texture Options</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FINAL STEPS */}
        <section className="py-32 bg-slate-900 text-white text-center">
          <ScrollReveal>
            <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter">YOUR VISION, <br /> OUR MISSION.</h2>
            <div className="flex flex-wrap justify-center gap-12 mb-16">
               <Step number="01" title="3D Concept" />
               <Step number="02" title="Material Selection" />
               <Step number="03" title="Execution" />
            </div>
            <Button size="lg" className="bg-orange-600 text-white px-16 py-8 text-xl rounded-full" onClick={() => navigate("/contact")}>
              Book Site Visit
            </Button>
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
};

/* ================= HELPER COMPONENTS ================= */

const FeatureWithImage = ({ icon, title, desc, img, reverse }) => (
  <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 max-w-6xl w-full`}>
    <div className="lg:w-1/2 bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
      <div className="text-orange-500 mb-6">{icon}</div>
      <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">{title}</h2>
      <p className="text-slate-300 text-lg leading-relaxed mb-6">{desc}</p>
      <div className="h-1 w-20 bg-orange-500 rounded-full" />
    </div>
    <div className="lg:w-1/2">
      <img src={img} alt={title} className="rounded-[3rem] shadow-2xl object-cover h-[400px] w-full" />
    </div>
  </div>
);

const MaterialItem = ({ icon, title, text }) => (
  <div className="flex items-start gap-4 p-6 rounded-3xl hover:bg-slate-50 transition-colors">
    <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">{icon}</div>
    <div>
      <h4 className="font-bold text-slate-900 text-xl mb-1">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

const Step = ({ number, title }) => (
  <div className="flex flex-col items-center">
    <span className="text-6xl font-black text-white/10 mb-2">{number}</span>
    <span className="text-xl font-bold text-orange-500">{title}</span>
  </div>
);

export default Home;