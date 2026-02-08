import React, { Suspense, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Facebook, Instagram, Twitter, Linkedin, 
  Phone, Mail, MapPin, Send, ArrowUpRight
} from "lucide-react";

// 3D
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";

/* ================= 3D BACKGROUND ELEMENT ================= */
function FooterVisual() {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.1;
      meshRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusGeometry args={[10, 0.05, 16, 100]} />
        <meshStandardMaterial color="#f97316" wireframe opacity={0.2} transparent />
      </mesh>
    </Float>
  );
}

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="relative bg-[#0a0f1a] text-slate-400 pt-24 pb-10 overflow-hidden border-t border-white/5">
      
      {/* 1. BACKGROUND 3D CANVAS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <FooterVisual />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* TOP SECTION: NEWSLETTER / LOGO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-3 mb-6 group cursor-pointer" onClick={() => navigate("/")}>
                   <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl transition-transform group-hover:rotate-12">B</div>
                   <h2 className="text-3xl font-black text-white tracking-tighter">Build<span className="text-orange-500">Pro</span></h2>
                </div>
                <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                    Engineering Nashik's skyline with high-fidelity 3D planning and sustainable construction practices.
                </p>
            </motion.div>

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Send size={18} className="text-orange-500" /> Stay Updated
                </h4>
                <p className="text-sm text-slate-500 mb-6">Get our latest project case studies directly in your inbox.</p>
                <div className="flex gap-2">
                    <input type="email" placeholder="email@example.com" className="bg-slate-900 border-white/10 rounded-xl px-4 py-3 w-full text-white focus:ring-1 focus:ring-orange-500 outline-none" />
                    <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all">Join</button>
                </div>
            </div>
        </div>

        {/* MIDDLE SECTION: LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 border-t border-white/5 pt-20">
          
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Navigation</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink to={link.path} className="group flex items-center gap-1 hover:text-orange-500 transition-colors">
                    {link.name} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Expertise</h3>
            <ul className="grid grid-cols-1 gap-4 text-sm">
                {["3D Interior", "R.C.C Work", "Modular Kitchens", "Renovations"].map(s => (
                    <li key={s} className="hover:text-white transition-colors cursor-pointer">• {s}</li>
                ))}
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Nashik Studio</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-white/5 p-3 rounded-xl text-orange-500"><MapPin size={20} /></div>
                <span className="text-sm leading-relaxed">Elite Plaza, College Road, <br/> Nashik, Maharashtra 422005</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/5 p-3 rounded-xl text-orange-500"><Phone size={20} /></div>
                <a href="tel:+919876543210" className="text-sm hover:text-white transition-colors">+91 98765 43210</a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-10">
          <div className="flex gap-4">
             {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all">
                    <Icon size={18} />
                </a>
             ))}
          </div>
          
          <div className="text-center md:text-right">
             <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em] mb-2">© {currentYear} BuildPro Construction Group</p>
             <div className="flex gap-6 justify-center md:justify-end text-[10px] font-black text-slate-500 uppercase">
                <a href="#" className="hover:text-orange-500">Privacy Policy</a>
                <a href="#" className="hover:text-orange-500">Terms of Service</a>
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;