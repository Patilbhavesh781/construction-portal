import React, { Suspense, useRef, useState, useEffect } from "react";
import { Users, Target, ShieldCheck, Award, HardHat, Ruler, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// 3D
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls } from "@react-three/drei";

// UI Components
import FadeIn from "../../components/animations/FadeIn";
import ScrollReveal from "../../components/animations/ScrollReveal";
import Button from "../../components/common/Button";

/* ================= 3D ARCHITECTURAL MODEL ================= */
function BlueprintModel({ scroll }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Model rotates and scales based on scroll depth
      meshRef.current.rotation.y = scroll * Math.PI * 2;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Pillar */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 4, 1.5]} />
        <meshStandardMaterial color="#f97316" wireframe={scroll < 0.3} />
      </mesh>
      {/* Surrounding Structure */}
      <mesh position={[0, -1.5, 0]} receiveShadow>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Floating Elements */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
         <mesh position={[2, 1, 0]}>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial color="#ffffff" emissive="#f97316" emissiveIntensity={0.5} />
         </mesh>
      </Float>
    </group>
  );
}

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [currentScroll, setCurrentScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setCurrentScroll(v));

  return (
    <div ref={containerRef} className="w-full bg-white selection:bg-orange-100">
      
      {/* ================= 1. HERO SECTION (Full Width) ================= */}
      <section className="relative h-screen flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <PresentationControls global snap rotation={[0, 0.3, 0]}>
                <BlueprintModel scroll={currentScroll} />
              </PresentationControls>
              <Environment preset="city" />
            </Suspense>
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-20 w-full grid grid-cols-1 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-600/20 text-orange-500 text-xs font-black uppercase tracking-widest mb-6">
                Established 2012
              </span>
              <h1 className="text-6xl md:text-9xl font-black text-white leading-none mb-8 tracking-tighter">
                WE BUILD <br /> <span className="text-orange-600 italic">LEGACIES.</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">
                BuildPro is more than a construction company. We are a team of 
                visionaries using 3D technology to redefine how India lives.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-orange-600 rounded-full px-12" onClick={() => navigate("/contact")}>
                  Talk to our Engineers
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================= 2. THE PHILOSOPHY (Split View) ================= */}
      <section className="py-32 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
                <img 
                    src="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&w=1200&q=80" 
                    alt="Architecture" 
                    className="rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute -bottom-10 -right-10 bg-slate-900 p-10 rounded-[2rem] text-white shadow-2xl hidden xl:block">
                   <p className="text-5xl font-black text-orange-600">12+</p>
                   <p className="text-sm font-bold uppercase tracking-widest opacity-60">Years of Precision</p>
                </div>
            </div>

            <ScrollReveal direction="right">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
                    ENGINEERING <br /> MEETS EMOTION.
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    Based in Nashik, BuildPro provides a unified workflow for construction. 
                    From the first architectural sketch to the final interior coat, 
                    we ensure that structural integrity is never sacrificed for aesthetic beauty.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-orange-600">
                        <HardHat size={32} className="text-orange-600 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">Master Civil Work</h4>
                        <p className="text-xs text-slate-500">ISI Grade materials and expert R.C.C management.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-slate-900">
                        <Ruler size={32} className="text-slate-900 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">3D Visual Planning</h4>
                        <p className="text-xs text-slate-500">Every project is pre-built in VR to eliminate errors.</p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
      </section>

      {/* ================= 3. CORE VALUES (Full Width Dark) ================= */}
      <section className="py-32 bg-slate-950 text-white rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">OUR DNA.</h2>
            <p className="text-slate-500 text-xl">The pillars that make us Nashik's choice for elite homes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard icon={<ShieldCheck size={40}/>} title="Absolute Trust" desc="Transparent billing and itemized material lists with no hidden costs." />
            <ValueCard icon={<Award size={40}/>} title="Bespoke Quality" desc="Hand-picked interior finishes and architectural standards that exceed norms." />
            <ValueCard icon={<Users size={40}/>} title="Client Centric" desc="Your vision is our blueprint. We iterate until you are 100% satisfied." />
          </div>
        </div>
      </section>

      {/* ================= 4. MAP / LOCATION (Full Width) ================= */}
      <section className="py-32 bg-white text-center px-6">
         <ScrollReveal>
            <h2 className="text-4xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter">NASHIK'S PRIDE.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto mb-16">
                From College Road to Pathardi Phata, we have been building 
                the future skyline of our city one brick at a time.
            </p>
            <div className="relative h-[500px] rounded-[4rem] overflow-hidden bg-slate-100 border border-slate-200">
               
               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4">
                     <Building className="text-orange-600" />
                     <p className="text-slate-900 font-bold">Studio: Elite Plaza, Nashik</p>
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>

      {/* ================= 5. CTA SECTION ================= */}
      <section className="py-24 bg-orange-600 text-white text-center">
        <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">JOIN THE ELITE.</h2>
        <p className="text-orange-100 text-xl mb-12">Start your premium construction journey with BuildPro today.</p>
        <div className="flex justify-center gap-6">
            <Button size="lg" className="bg-white text-orange-600 px-12 py-8 text-xl rounded-full" onClick={() => navigate("/contact")}>
                Book Site Visit
            </Button>
        </div>
      </section>

    </div>
  );
};

/* ================= HELPER COMPONENT ================= */
const ValueCard = ({ icon, title, desc }) => (
    <motion.div 
        whileHover={{ y: -20 }}
        className="p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center flex flex-col items-center"
    >
        <div className="text-orange-500 mb-8">{icon}</div>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
);

export default About;