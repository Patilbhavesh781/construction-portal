import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════
   FONT INJECTION
══════════════════════════════════════════════════ */
(() => {
  if (!document.getElementById("bc-fonts")) {
    const l = document.createElement("link");
    l.id = "bc-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito+Sans:wght@300;400;600;700;800&family=Playfair+Display:wght@400;700&display=swap";
    document.head.appendChild(l);
  }
})();

/* ══════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════ */
const C = {
  bg: "#0c0e12",
  surface: "#13161c",
  card: "#191c24",
  border: "#252930",
  gold: "#e8a020",
  goldLight: "#f5c060",
  orange: "#d4521a",
  white: "#f2efe9",
  muted: "#6e7380",
  light: "#a0a5b0",
  green: "#27ae60",
  blue: "#2980b9",
};

/* ══════════════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════════════ */
const GlobalCSS = () => {
  useEffect(() => {
    const s = document.createElement("style");
    s.id = "bc-global";
    s.textContent = `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:${C.bg};color:${C.white};font-family:'Nunito Sans',sans-serif;font-weight:400;overflow-x:hidden}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:${C.bg}}
      ::-webkit-scrollbar-thumb{background:${C.gold};border-radius:3px}
      a{text-decoration:none;color:inherit}
      button{cursor:pointer;font-family:'Nunito Sans',sans-serif}
      input,select,textarea{font-family:'Nunito Sans',sans-serif}

      @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes slideRight{from{transform:scaleX(0)}to{transform:scaleX(1)}}
      @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      @keyframes borderGlow{0%,100%{box-shadow:0 0 10px rgba(232,160,32,0.2)}50%{box-shadow:0 0 25px rgba(232,160,32,0.5)}}
      @keyframes ping{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}

      .fade-up{opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease}
      .fade-up.vis{opacity:1;transform:translateY(0)}
      .fade-in{opacity:0;transition:opacity 0.6s ease}
      .fade-in.vis{opacity:1}
      .slide-up{opacity:0;transform:translateY(50px);transition:opacity 0.8s ease,transform 0.8s ease}
      .slide-up.vis{opacity:1;transform:translateY(0)}

      .svc-card{transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}
      .svc-card:hover{transform:translateY(-8px);border-color:${C.gold}!important;box-shadow:0 20px 60px rgba(232,160,32,0.15)!important}
      .svc-card:hover .svc-icon-wrap{background:${C.gold}!important}
      .svc-card:hover .svc-icon-wrap span{filter:none!important}

      .nav-item{transition:color 0.2s}
      .nav-item:hover{color:${C.gold}!important}
      .nav-item.active{color:${C.gold}!important}

      .btn-gold{background:${C.gold};color:#000;transition:all 0.25s;border:none}
      .btn-gold:hover{background:${C.goldLight};transform:translateY(-2px);box-shadow:0 8px 24px rgba(232,160,32,0.35)}
      .btn-outline{border:2px solid ${C.gold};color:${C.gold};background:transparent;transition:all 0.25s}
      .btn-outline:hover{background:${C.gold};color:#000}
      .btn-dark{background:${C.card};color:${C.white};border:1px solid ${C.border};transition:all 0.25s}
      .btn-dark:hover{border-color:${C.gold};color:${C.gold}}

      .tab-btn{transition:all 0.25s}
      .tab-btn.active{background:${C.gold}!important;color:#000!important}
      .tab-btn:hover:not(.active){border-color:${C.gold}!important;color:${C.gold}!important}

      .proj-card{transition:all 0.3s}
      .proj-card:hover{transform:scale(1.02);box-shadow:0 20px 60px rgba(0,0,0,0.5)}
      .proj-card:hover .proj-overlay{opacity:1!important}

      .team-card{transition:all 0.3s}
      .team-card:hover{transform:translateY(-6px);border-color:${C.gold}!important}

      .faq-item{transition:all 0.3s}
      .faq-item:hover{border-color:rgba(232,160,32,0.3)!important}

      .contact-input{background:${C.card};border:1px solid ${C.border};color:${C.white};padding:14px 16px;width:100%;font-size:0.92rem;transition:border-color 0.2s;outline:none}
      .contact-input:focus{border-color:${C.gold}}
      .contact-input::placeholder{color:${C.muted}}

      .whatsapp-btn{animation:borderGlow 2s ease-in-out infinite}
      .live-dot{animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite}

      .progress-bar{background:linear-gradient(90deg,${C.gold},${C.orange});transform-origin:left;animation:slideRight 1.5s ease forwards}

      @media(max-width:1100px){
        .services-grid{grid-template-columns:repeat(3,1fr)!important}
        .hero-cols{grid-template-columns:1fr!important}
        .hero-visual{display:none!important}
        .about-cols{grid-template-columns:1fr!important}
        .why-grid{grid-template-columns:1fr 1fr!important}
        .contact-cols{grid-template-columns:1fr!important}
        .footer-grid{grid-template-columns:1fr 1fr!important}
        .nav-links{display:none!important}
      }
      @media(max-width:720px){
        .services-grid{grid-template-columns:repeat(2,1fr)!important}
        .why-grid{grid-template-columns:1fr!important}
        .stats-row{grid-template-columns:1fr 1fr!important}
        .testimonials-grid{grid-template-columns:1fr!important}
        .projects-grid{grid-template-columns:1fr!important}
        .team-grid{grid-template-columns:1fr 1fr!important}
        .footer-grid{grid-template-columns:1fr!important}
        .hero-stats{flex-direction:column;gap:16px!important}
        .section-pad{padding:64px 20px!important}
      }
    `;
    document.head.appendChild(s);
    return () => document.getElementById("bc-global")?.remove();
  }, []);
  return null;
};

/* ══════════════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════════════ */
const useScrollReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    const items = document.querySelectorAll(".fade-up,.fade-in,.slide-up");
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
};

/* ══════════════════════════════════════════════════
   COUNTER HOOK
══════════════════════════════════════════════════ */
const useCounter = (target, duration = 2000, started = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
};

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const SERVICES = [
  {
    id: "pumping", icon: "🪣", name: "Pumping Work", color: "#2980b9",
    tagline: "Reliable Water Supply Solutions",
    short: "Complete water pump installation, motor repair & borewell systems.",
    desc: "We provide end-to-end water pump installation and maintenance solutions for residential and commercial properties. Our team specializes in submersible pumps, centrifugal pumps, pressure booster systems, and borewell motor installations.",
    features: ["Submersible pump installation", "Pressure booster systems", "Borewell motor repair", "Water tank automation", "Pump house construction", "AMC contracts available"],
    price: "₹2,500 – ₹25,000",
    time: "1–3 days",
    warranty: "1 Year",
    projects: 340,
  },
  {
    id: "bricks", icon: "🧱", name: "Bricks & Plaster Work", color: "#c0392b",
    tagline: "Strong Foundations, Perfect Finishes",
    short: "Structural masonry, plastering & wall finishing with premium materials.",
    desc: "Our masonry experts handle everything from load-bearing brick walls to decorative stonework. We use premium red bricks, AAC blocks, and fly ash bricks with certified cement and sand for lasting structural integrity.",
    features: ["Load-bearing wall construction", "AAC block work", "Internal & external plastering", "Texture finishes", "Stone cladding", "Partition walls"],
    price: "₹45 – ₹85 per sq.ft",
    time: "Varies by scope",
    warranty: "5 Years structural",
    projects: 620,
  },
  {
    id: "plumbing", icon: "🔧", name: "Plumbing Work", color: "#16a085",
    tagline: "Zero Leak Guarantee",
    short: "Complete plumbing installations, repairs, drainage & pipeline replacement.",
    desc: "From new installations to emergency repairs, our licensed plumbers handle all types of plumbing work. We use premium CPVC, UPVC, and stainless-steel pipes with ISI-marked fittings for long-lasting results.",
    features: ["Water supply line installation", "Drainage & sewage systems", "Bathroom fitting installation", "Hot & cold water piping", "Water heater installation", "Leak detection & repair"],
    price: "₹1,500 – ₹50,000",
    time: "1–7 days",
    warranty: "2 Years",
    projects: 890,
  },
  {
    id: "waterproofing", icon: "🛡️", name: "Waterproofing Work", color: "#2c3e50",
    tagline: "Permanent Protection Against Leaks",
    short: "Advanced waterproofing for roofs, basements, bathrooms & external walls.",
    desc: "We use cutting-edge waterproofing technologies including crystalline, polyurethane, and cementitious systems. Our solutions are tested to withstand extreme weather, providing 10+ year leak-free guarantees for roofs and structures.",
    features: ["Terrace/roof waterproofing", "Basement waterproofing", "Bathroom & wet area treatment", "External wall waterproofing", "Swimming pool treatment", "Expansion joint sealing"],
    price: "₹35 – ₹120 per sq.ft",
    time: "2–5 days",
    warranty: "10 Years",
    projects: 510,
  },
  {
    id: "gypsum", icon: "🏛️", name: "Gypsum Work", color: "#8e44ad",
    tagline: "Elegant Ceilings & Partitions",
    short: "False ceilings, partition walls, POP finishes & decorative gypsum boards.",
    desc: "Transform your spaces with our expert gypsum work. From ornate POP designs to modern clean-line false ceilings, we create stunning architectural details. We work with premium brands like Saint-Gobain and Gyproc.",
    features: ["POP false ceiling design", "Grid false ceiling", "L-shaped & cove ceilings", "Gypsum partition walls", "Wall paneling & wainscoting", "Decorative cornices & moldings"],
    price: "₹55 – ₹150 per sq.ft",
    time: "3–10 days",
    warranty: "3 Years",
    projects: 440,
  },
  {
    id: "painting", icon: "🎨", name: "Painting Work", color: "#e74c3c",
    tagline: "Colors That Last Decades",
    short: "Interior & exterior painting, texture finishes, weather coat applications.",
    desc: "Our certified painting team transforms spaces with premium paints from Asian Paints, Berger, and Dulux. We offer texture finishes, Venetian plaster, exterior weather shield, and custom color consulting for perfect results.",
    features: ["Interior emulsion painting", "Exterior weather coat", "Texture & stucco finishes", "Epoxy floor coating", "Wood polish & varnish", "Waterproof exterior paint"],
    price: "₹12 – ₹45 per sq.ft",
    time: "2–7 days",
    warranty: "5 Years exterior",
    projects: 1200,
  },
  {
    id: "electrical", icon: "⚡", name: "Electrical Work", color: "#f39c12",
    tagline: "Safe, Certified & Smart",
    short: "Full wiring, panel upgrades, lighting installations & smart home setups.",
    desc: "Our BESCOM-certified electricians handle complete electrical installations with ISI-marked materials. From basic house wiring to full smart home automation with voice control, EV charger installation, and solar panel integration.",
    features: ["Complete house wiring", "MCB panel installation", "LED lighting design", "Smart home automation", "EV charger installation", "Solar panel wiring & inverter"],
    price: "₹25,000 – ₹2,50,000",
    time: "2–14 days",
    warranty: "2 Years",
    projects: 780,
  },
  {
    id: "fabrication", icon: "🔩", name: "Fabrication Work", color: "#7f8c8d",
    tagline: "Custom Metal Craftsmanship",
    short: "Custom steel & metal fabrication — grills, gates, railings & staircases.",
    desc: "Our workshop fabricates custom mild steel, stainless steel, and wrought iron structures. From decorative grills to industrial-grade staircases, every piece is precision-welded and powder-coated for durability.",
    features: ["Window & door grills", "Main gate & compound gate", "Staircase railings", "Balcony railings", "Steel almirah & storage", "Industrial shelving & mezzanine"],
    price: "₹180 – ₹650 per kg",
    time: "3–15 days",
    warranty: "3 Years",
    projects: 380,
  },
  {
    id: "tiles", icon: "⬛", name: "Tile Work", color: "#1abc9c",
    tagline: "Precision Tiling, Stunning Results",
    short: "Floor, wall & bathroom tiling with precision grouting & designer tiles.",
    desc: "Expert tile laying for every surface — large format vitrified floors, subway tiles, mosaic patterns, and outdoor anti-skid tiles. We work with leading brands like Kajaria, Nitco, and RAK Ceramics for perfect alignment.",
    features: ["Vitrified & ceramic floor tiles", "Bathroom wall tiles", "Kitchen backsplash", "Outdoor & anti-skid tiles", "Swimming pool tiles", "Large format 120×120cm slabs"],
    price: "₹30 – ₹80 per sq.ft (labour)",
    time: "2–10 days",
    warranty: "2 Years",
    projects: 960,
  },
  {
    id: "doors", icon: "🚪", name: "Door & Window Work", color: "#d35400",
    tagline: "Secure Entries, Beautiful Openings",
    short: "Wooden, UPVC & aluminium door/window installation & security upgrades.",
    desc: "Complete door and window solutions — from solid teak wood doors to energy-efficient UPVC double-glazed windows. We also offer security doors, fire-rated doors, and customised French windows and bay windows.",
    features: ["Teak & engineered wood doors", "UPVC windows & doors", "Aluminium sliding windows", "Mosquito mesh fitting", "Security steel doors", "Glass partition walls"],
    price: "₹8,000 – ₹85,000 per unit",
    time: "1–7 days",
    warranty: "3 Years",
    projects: 520,
  },
  {
    id: "lockkey", icon: "🔐", name: "Lock & Key Work", color: "#2ecc71",
    tagline: "Maximum Security at Every Entry",
    short: "Lock installation, smart lock upgrades, key duplication & locksmith services.",
    desc: "We install and service all types of locking systems — from traditional mortise locks to biometric smart locks with mobile app control. Emergency locksmith services available 24/7.",
    features: ["Digital & biometric locks", "CCTV & video door phones", "Master key systems", "Emergency lockout service", "Safe installation", "Access control systems"],
    price: "₹500 – ₹35,000",
    time: "Same day",
    warranty: "1 Year",
    projects: 290,
  },
  {
    id: "renovation", icon: "🔨", name: "Renovation Work", color: "#e67e22",
    tagline: "Breathing New Life Into Old Spaces",
    short: "Full-home & room renovations — modernize with structural or cosmetic upgrades.",
    desc: "Complete renovation management from design to delivery. We handle structural changes, room additions, kitchen and bathroom remodels, flooring upgrades, and complete home makeovers within budget and schedule.",
    features: ["Complete home renovation", "Kitchen & bathroom remodel", "Structural wall removal", "Room additions", "Flooring replacement", "Ceiling renovation"],
    price: "₹500 – ₹1,500 per sq.ft",
    time: "2 weeks – 3 months",
    warranty: "2 Years",
    projects: 430,
  },
  {
    id: "interior", icon: "🛋️", name: "Interior Design Work", color: "#9b59b6",
    tagline: "Spaces That Tell Your Story",
    short: "Concept to completion interior design — furniture, lighting, decor & space planning.",
    desc: "Our award-winning interior designers create personalised spaces that blend aesthetics with functionality. We handle everything from initial concept and 3D visualization to procurement and installation of every element.",
    features: ["3D design visualization", "Modular kitchen design", "Custom furniture & joinery", "Lighting design", "Soft furnishings & decor", "Turnkey project execution"],
    price: "₹800 – ₹3,500 per sq.ft",
    time: "4 weeks – 6 months",
    warranty: "1 Year",
    projects: 280,
  },
  {
    id: "architecture", icon: "📐", name: "Architecture & RCC Work", color: "#3498db",
    tagline: "Engineered to Last Generations",
    short: "RCC structural design, architectural drawings, site planning & approvals.",
    desc: "Our licensed architects and structural engineers provide comprehensive building design services. From residential bungalows to multi-storey apartments, we handle approvals, structural calculations, and site supervision.",
    features: ["Building plan & approvals", "RCC structural design", "3D architectural renders", "Site supervision", "Vastu-compliant planning", "Turnkey construction"],
    price: "₹15 – ₹45 per sq.ft",
    time: "Project-based",
    warranty: "As per contract",
    projects: 190,
  },
  {
    id: "property", icon: "🏘️", name: "Property Buy & Sell", color: "#27ae60",
    tagline: "Trusted Real Estate Advisory",
    short: "Real estate advisory, property valuation, buying & selling with legal support.",
    desc: "Our RERA-registered property consultants help you buy, sell, or rent properties at the best prices. We offer title verification, valuation reports, home loan assistance, and complete legal documentation support.",
    features: ["Free property valuation", "RERA-registered agency", "Legal title verification", "Home loan assistance", "NRI property services", "Investment advisory"],
    price: "1–2% brokerage",
    time: "15–60 days",
    warranty: "N/A",
    projects: 320,
  },
];

const PROJECTS = [
  { title: "3BHK Villa Renovation", location: "Sangli", cat: "Renovation", cost: "₹18.5L", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=80", duration: "45 days" },
  { title: "Commercial Complex Waterproofing", location: "Kolhapur", cat: "Waterproofing", cost: "₹4.2L", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80", duration: "12 days" },
  { title: "Luxury Interior Design", location: "Pune", cat: "Interior", cost: "₹32L", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80", duration: "90 days" },
  { title: "Residential Electrical Upgrade", location: "Miraj", cat: "Electrical", cost: "₹1.8L", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80", duration: "7 days" },
  { title: "New Build Architecture", location: "Karad", cat: "Architecture", cost: "₹65L", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80", duration: "8 months" },
  { title: "Full Home Painting", location: "Islampur", cat: "Painting", cost: "₹2.4L", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700&q=80", duration: "14 days" },
];

const TESTIMONIALS = [
  { name: "Rahul Patil", role: "Homeowner, Sangli", rating: 5, text: "BuildCraft completely transformed our 20-year-old home. The renovation team was professional, punctual, and the quality of work exceeded our expectations. The project manager kept us updated daily. Highly recommend!", avatar: "RP", service: "Renovation" },
  { name: "Sunita Mane", role: "Property Owner, Kolhapur", rating: 5, text: "Our terrace had been leaking for 3 years. Multiple contractors failed but BuildCraft's waterproofing team fixed it permanently in just 4 days. Their 10-year warranty gives total peace of mind.", avatar: "SM", service: "Waterproofing" },
  { name: "Amol Kulkarni", role: "Software Engineer, Pune", rating: 5, text: "Got my entire apartment interior designed by BuildCraft. The 3D visualization was perfect and the actual work matched exactly. Modular kitchen, false ceiling, custom furniture — all flawless. Worth every rupee.", avatar: "AK", service: "Interior Design" },
  { name: "Priya Deshmukh", role: "Business Owner, Miraj", rating: 5, text: "We needed a complete electrical overhaul for our office. BuildCraft handled it over a weekend so we didn't lose working days. Professional, certified, and their smart lighting setup is amazing!", avatar: "PD", service: "Electrical" },
  { name: "Vijay Kore", role: "Doctor, Karad", rating: 5, text: "Hired them for architecture and construction of my new clinic. From plan approvals to RCC work and finishing — everything was supervised daily. Completed 2 weeks ahead of schedule!", avatar: "VK", service: "Architecture" },
  { name: "Neha Sawant", role: "Teacher, Sangli", rating: 4, text: "Great tile work in our new bathroom. The team was neat, fast and the final finish looks premium. Minor grouting touch-up was needed but they came back immediately without any hassle.", avatar: "NS", service: "Tiles" },
];

const TEAM = [
  { name: "Suresh Patil", role: "Founder & Civil Engineer", exp: "22 yrs", icon: "👷", speciality: "Structural Design, RCC" },
  { name: "Mahesh Kulkarni", role: "Senior Architect", exp: "15 yrs", icon: "📐", speciality: "Residential & Commercial Design" },
  { name: "Pradeep Jadhav", role: "Interior Design Head", exp: "12 yrs", icon: "🛋️", speciality: "Luxury Interiors, 3D Design" },
  { name: "Ravi Shinde", role: "Site Supervisor", exp: "18 yrs", icon: "🏗️", speciality: "Project Execution, Quality Control" },
];

const FAQS = [
  { q: "How do I get a cost estimate for my project?", a: "Simply fill our enquiry form or call us. We'll schedule a free site visit within 24 hours, assess your requirements, and provide a detailed written estimate within 48 hours — completely free, no obligation." },
  { q: "Are your workers trained and background verified?", a: "Yes. All our technicians and laborers undergo technical training, have ISI-certified skill cards, and are background-verified through police verification. We carry full workmen compensation insurance." },
  { q: "Do you provide a warranty on your work?", a: "Absolutely. All our services come with written warranties ranging from 1 year (lock & key) to 10 years (waterproofing). Our structural work carries a 5-year warranty by default." },
  { q: "Can you handle the complete project from planning to finishing?", a: "Yes! We offer full turnkey project management. From architectural design, building approvals, construction, interior design, to final handover — one company, zero hassle." },
  { q: "What areas do you service?", a: "We primarily serve Sangli, Kolhapur, Miraj, Karad, Islampur, Satara, and surrounding areas within 60km. For large projects, we can mobilize teams anywhere in Maharashtra." },
  { q: "Do you use original branded materials?", a: "We use only ISI-marked and branded materials — Asian Paints, Kajaria Tiles, Saint-Gobain Gypsum, L&T Cement, Astral Pipes, and Anchor Electricals. Invoices from suppliers are shared transparently." },
  { q: "What are your working hours?", a: "Our office is open Monday to Saturday, 8 AM to 8 PM. Site work is conducted between 8 AM to 6 PM. Emergency services (plumbing leaks, electrical faults, lockout) are available 24/7." },
  { q: "How do you ensure cleanliness on-site?", a: "Our teams use protective sheets, clean up debris daily, and do a complete site cleanup on project completion. We have a strict zero-mess policy for occupied homes." },
];

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
const px = (v) => `${v}px`;
const Section = ({ id, children, style = {} }) => (
  <section id={id} className="section-pad" style={{ padding: "96px 64px", ...style }}>{children}</section>
);
const MaxW = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1300, margin: "0 auto", ...style }}>{children}</div>
);
const Label = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
    <span style={{ width: 28, height: 2, background: C.gold, display: "block" }} />
    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.78rem", letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold }}>{children}</span>
    <span style={{ width: 28, height: 2, background: C.gold, display: "block" }} />
  </div>
);
const H2 = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.2rem,4vw,4rem)", lineHeight: 1, letterSpacing: "0.02em", ...style }}>{children}</h2>
);
const Stars = ({ n = 5 }) => (
  <span style={{ color: C.gold, letterSpacing: 2 }}>{Array(n).fill("★").join("")}{Array(5 - n).fill("☆").join("")}</span>
);

/* ══════════════════════════════════════════════════
   LIVE CLOCK + DATE
══════════════════════════════════════════════════ */
const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const isOpen = time.getDay() !== 0 && time.getHours() >= 8 && time.getHours() < 20;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: isOpen ? C.green : "#e74c3c", display: "inline-block", boxShadow: `0 0 8px ${isOpen ? C.green : "#e74c3c"}` }} />
        <span style={{ fontSize: "0.78rem", color: isOpen ? C.green : "#e74c3c", fontWeight: 700, letterSpacing: "0.05em" }}>
          {isOpen ? "OPEN NOW" : "CLOSED"}
        </span>
      </div>
      <span style={{ fontSize: "0.78rem", color: C.muted }}>
        {days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}
      </span>
      <span style={{ fontSize: "0.78rem", color: C.light, fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>
        🕐 {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </span>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   TOPBAR
══════════════════════════════════════════════════ */
const TopBar = () => (
  <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "8px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
    <LiveClock />
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <span style={{ fontSize: "0.78rem", color: C.light }}>📞 <a href="tel:+919999999999" style={{ color: C.gold, fontWeight: 700 }}>+91 99999 99999</a></span>
      <span style={{ fontSize: "0.78rem", color: C.light }}>✉️ <a href="mailto:hello@buildcraft.in" style={{ color: C.light }}>hello@buildcraft.in</a></span>
      <span style={{ fontSize: "0.78rem", color: C.muted }}>📍 Sangli, Maharashtra</span>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════ */
const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Home", "Services", "Projects", "About", "Contact"];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: scrolled ? "rgba(12,14,18,0.98)" : C.surface,
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.border}`,
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("Home")}>
          <div style={{ width: 38, height: 38, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", color: "#000", clipPath: "polygon(10% 0%,90% 0%,100% 10%,100% 90%,90% 100%,10% 100%,0% 90%,0% 10%)" }}>BC</div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", letterSpacing: "0.08em" }}>
            Build<span style={{ color: C.gold }}>Craft</span>
          </span>
        </div>
        <ul className="nav-links" style={{ display: "flex", gap: 4, listStyle: "none" }}>
          {links.map(l => (
            <li key={l}>
              <button className={`nav-item${page === l ? " active" : ""}`} onClick={() => setPage(l)} style={{
                background: "none", border: "none", padding: "8px 16px", fontSize: "0.88rem", fontWeight: 700,
                letterSpacing: "0.05em", color: page === l ? C.gold : C.light, cursor: "pointer",
                borderRadius: 4, position: "relative",
              }}>
                {l}
                {page === l && <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 2, background: C.gold, borderRadius: 2 }} />}
              </button>
            </li>
          ))}
        </ul>
        <button className="btn-gold" onClick={() => setPage("Contact")} style={{
          padding: "10px 26px", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em",
          textTransform: "uppercase", borderRadius: 4,
        }}>Free Quote</button>
        {/* mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: C.white, fontSize: "1.5rem" }} className="mobile-toggle">☰</button>
      </div>
    </nav>
  );
};

/* ══════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════ */
const Marquee = () => {
  const items = SERVICES.map(s => `${s.icon} ${s.name}`);
  const all = [...items, ...items];
  return (
    <div style={{ background: C.gold, overflow: "hidden", padding: "11px 0", borderTop: `2px solid ${C.goldLight}` }}>
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee 40s linear infinite" }}>
        {all.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.9rem", letterSpacing: "0.2em", color: "#000", padding: "0 28px", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "0.45rem", opacity: 0.5 }}>◆</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   STAT COUNTER CARD
══════════════════════════════════════════════════ */
const StatCard = ({ icon, target, suffix = "", label, color, started }) => {
  const count = useCounter(target, 2500, started);
  return (
    <div className="fade-up" style={{ textAlign: "center", padding: "28px 16px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, borderTop: `3px solid ${color}` }}>
      <div style={{ fontSize: "2.2rem", marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", color, lineHeight: 1 }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: "0.82rem", color: C.muted, marginTop: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   HERO (HOME PAGE)
══════════════════════════════════════════════════ */
const Hero = ({ setPage }) => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef();
  const [activeImg, setActiveImg] = useState(0);
  const imgs = [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80",
  ];
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveImg(p => (p + 1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* BG Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {imgs.map((img, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: i === activeImg ? 1 : 0,
            transition: "opacity 1.2s ease",
            filter: "brightness(0.25) saturate(0.7)",
          }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,14,18,0.95) 0%, rgba(12,14,18,0.7) 60%, rgba(12,14,18,0.4) 100%)" }} />
      </div>

      {/* Slide indicators */}
      <div style={{ position: "absolute", bottom: 24, right: 64, zIndex: 10, display: "flex", gap: 8 }}>
        {imgs.map((_, i) => (
          <button key={i} onClick={() => setActiveImg(i)} style={{ width: i === activeImg ? 28 : 8, height: 8, borderRadius: 4, background: i === activeImg ? C.gold : C.border, border: "none", cursor: "pointer", transition: "all 0.3s" }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1300, margin: "0 auto", padding: "100px 64px 80px" }}>
        <div style={{ maxWidth: 780 }}>
          <div className="hero-animate-1" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, animation: "fadeUp 0.7s 0.1s both" }}>
            <span style={{ width: 36, height: 2, background: C.gold, display: "block" }} />
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.78rem", letterSpacing: "0.45em", textTransform: "uppercase", color: C.gold }}>Maharashtra's #1 Home Construction Service</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.5rem,8vw,8rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: 28, animation: "fadeUp 0.7s 0.25s both" }}>
            We Build<br />
            <span style={{ color: C.gold }}>Your Dreams</span><br />
            Into Homes
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: C.light, maxWidth: 560, marginBottom: 40, animation: "fadeUp 0.7s 0.4s both" }}>
            15+ specialized construction services under one roof. RERA-registered, licensed professionals, ISI-certified materials. From a leaking tap to a complete new build — we handle it all.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.7s 0.55s both" }}>
            <button className="btn-gold" onClick={() => setPage("Contact")} style={{ padding: "16px 40px", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>
              🏠 Get Free Quote
            </button>
            <button className="btn-outline" onClick={() => setPage("Projects")} style={{ padding: "14px 36px", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>
              📸 View Projects
            </button>
          </div>

          <div className="hero-stats" ref={statsRef} style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 40, borderTop: `1px solid ${C.border}`, animation: "fadeUp 0.7s 0.7s both" }}>
            {[
              [3200, "+", "Projects Completed"],
              [15, "+", "Years Experience"],
              [98, "%", "Client Satisfaction"],
              [200, "+", "Expert Team Members"],
            ].map(([n, s, l]) => {
              const c = useCounter(n, 2200, statsVisible);
              return (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: C.gold, lineHeight: 1 }}>{c}{s}</div>
                  <div style={{ fontSize: "0.73rem", color: C.muted, marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{l}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature badges */}
      <div style={{ position: "relative", zIndex: 2, background: "rgba(19,22,28,0.95)", borderTop: `1px solid ${C.border}`, padding: "18px 64px" }}>
        <MaxW>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[["✅","Licensed & RERA Registered"],["🛡️","10-Year Waterproofing Warranty"],["⚡","24/7 Emergency Service"],["💳","Flexible Payment Plans"],["📋","Free Site Inspection"]].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.83rem", color: C.light }}>
                <span>{ic}</span><span style={{ fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>
        </MaxW>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   SERVICES SECTION / PAGE
══════════════════════════════════════════════════ */
const ServicesSection = ({ setPage, setSelectedService, full = false }) => {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Construction", "Finishing", "Design", "Property"];
  const catMap = {
    "Construction": ["pumping","bricks","plumbing","waterproofing","fabrication","tiles"],
    "Finishing": ["gypsum","painting","doors","lockkey"],
    "Design": ["renovation","interior","architecture"],
    "Property": ["property"],
  };
  const filtered = filter === "All" ? SERVICES : SERVICES.filter(s => (catMap[filter] || []).includes(s.id));
  const display = full ? filtered : SERVICES.slice(0, 8);

  return (
    <Section id="services" style={{ background: C.surface }}>
      <MaxW>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
          <Label>Our Expertise</Label>
          <H2>15 Specialized Services</H2>
          <p style={{ fontSize: "0.95rem", color: C.muted, marginTop: 14, maxWidth: 560, margin: "14px auto 0" }}>
            From emergency repairs to full construction projects. All services backed by certified professionals and written warranties.
          </p>
        </div>

        {full && (
          <div className="fade-up" style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} className={`tab-btn${filter === c ? " active" : ""}`} onClick={() => setFilter(c)} style={{
                padding: "8px 22px", background: "none", border: `1px solid ${C.border}`,
                color: C.light, fontSize: "0.83rem", fontWeight: 700, letterSpacing: "0.05em", borderRadius: 20, cursor: "pointer",
              }}>{c}</button>
            ))}
          </div>
        )}

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {display.map((svc, i) => (
            <div key={svc.id} className="svc-card fade-up" style={{ animationDelay: `${i * 0.06}s`, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "28px 22px", cursor: "pointer", position: "relative", overflow: "hidden" }}
              onClick={() => { setSelectedService(svc); setPage("ServiceDetail"); }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: svc.color, borderRadius: "10px 10px 0 0" }} />
              <div className="svc-icon-wrap" style={{ width: 52, height: 52, background: `${svc.color}22`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.7rem", marginBottom: 16, transition: "background 0.3s" }}>
                <span style={{ filter: "saturate(1.2)" }}>{svc.icon}</span>
              </div>
              <div style={{ fontFamily: "'Nunito Sans',sans-serif", fontWeight: 800, fontSize: "0.95rem", color: C.white, marginBottom: 8, letterSpacing: "0.02em" }}>{svc.name}</div>
              <div style={{ fontSize: "0.8rem", lineHeight: 1.65, color: C.muted, marginBottom: 14 }}>{svc.short}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.76rem", color: svc.color, fontWeight: 700 }}>📋 {svc.projects}+ projects</span>
                <span style={{ fontSize: "0.76rem", color: C.gold, fontWeight: 700 }}>View →</span>
              </div>
            </div>
          ))}
        </div>

        {!full && (
          <div className="fade-up" style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-outline" onClick={() => setPage("Services")} style={{ padding: "14px 40px", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>
              View All 15 Services →
            </button>
          </div>
        )}
      </MaxW>
    </Section>
  );
};

/* ══════════════════════════════════════════════════
   SERVICE DETAIL PAGE
══════════════════════════════════════════════════ */
const ServiceDetail = ({ svc, setPage }) => {
  useScrollReveal();
  if (!svc) return null;
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${svc.color}22 0%, ${C.surface} 100%)`, borderBottom: `1px solid ${C.border}`, padding: "80px 64px" }}>
        <MaxW>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <button onClick={() => setPage("Services")} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: "0.85rem" }}>← All Services</button>
            <span style={{ color: C.border }}>/</span>
            <span style={{ fontSize: "0.85rem", color: C.gold }}>{svc.name}</span>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: 80, height: 80, background: `${svc.color}30`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", flexShrink: 0 }}>{svc.icon}</div>
            <div>
              <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", lineHeight: 1, color: C.white }}>{svc.name}</h1>
              <p style={{ fontSize: "1.1rem", color: svc.color, fontWeight: 700, marginTop: 6 }}>{svc.tagline}</p>
            </div>
          </div>
        </MaxW>
      </div>

      <Section style={{ background: C.bg }}>
        <MaxW>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48 }}>
            <div>
              {/* About */}
              <div className="fade-up" style={{ marginBottom: 40 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: C.white, marginBottom: 16 }}>About This Service</h3>
                <p style={{ fontSize: "1rem", lineHeight: 1.85, color: C.light }}>{svc.desc}</p>
              </div>
              {/* Features */}
              <div className="fade-up" style={{ marginBottom: 40 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: C.white, marginBottom: 20 }}>What's Included</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {svc.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                      <span style={{ color: svc.color, fontWeight: 700, fontSize: "1.1rem" }}>✓</span>
                      <span style={{ fontSize: "0.88rem", color: C.light }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Process */}
              <div className="fade-up">
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: C.white, marginBottom: 20 }}>Our Process</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {["Free Site Assessment","Detailed Quotation","Material Sourcing","Expert Execution","Quality Inspection","Final Handover & Warranty"].map((step, i) => (
                    <div key={step} style={{ display: "flex", gap: 16, paddingBottom: i < 5 ? 24 : 0, position: "relative" }}>
                      {i < 5 && <div style={{ position: "absolute", left: 20, top: 40, bottom: 0, width: 1, background: C.border }} />}
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${svc.color}22`, border: `2px solid ${svc.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", color: svc.color, zIndex: 1 }}>{i + 1}</div>
                      <div style={{ paddingTop: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: C.white }}>{step}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Quick info */}
              <div className="fade-up" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 24, marginBottom: 20, borderTop: `3px solid ${svc.color}` }}>
                <h4 style={{ fontWeight: 800, fontSize: "1rem", color: C.white, marginBottom: 20 }}>Service Details</h4>
                {[["💰","Starting Price",svc.price],["⏱️","Typical Duration",svc.time],["🛡️","Warranty",svc.warranty],["📋","Projects Done",`${svc.projects}+`]].map(([ic,k,v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: "0.85rem", color: C.muted }}>{ic} {k}</span>
                    <span style={{ fontSize: "0.88rem", color: C.gold, fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
              {/* CTA */}
              <div className="fade-up" style={{ background: `linear-gradient(135deg, ${svc.color}22, ${C.card})`, border: `1px solid ${svc.color}44`, borderRadius: 10, padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>🏠</div>
                <h4 style={{ fontWeight: 800, fontSize: "1rem", color: C.white, marginBottom: 8 }}>Ready to Get Started?</h4>
                <p style={{ fontSize: "0.83rem", color: C.muted, marginBottom: 20 }}>Free site visit + written estimate within 24 hours</p>
                <button className="btn-gold" onClick={() => setPage("Contact")} style={{ width: "100%", padding: "14px", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 6 }}>Get Free Quote</button>
                <a href="tel:+919999999999" style={{ display: "block", marginTop: 12, color: C.gold, fontSize: "0.88rem", fontWeight: 700, textDecoration: "none" }}>📞 Call +91 99999 99999</a>
              </div>

              {/* Rating */}
              <div className="fade-up" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, marginTop: 20, textAlign: "center" }}>
                <Stars n={5} />
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: C.gold, lineHeight: 1, marginTop: 6 }}>4.9</div>
                <div style={{ fontSize: "0.78rem", color: C.muted }}>Based on 120+ reviews</div>
              </div>
            </div>
          </div>
        </MaxW>
      </Section>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════ */
const Projects = ({ full = false, setPage }) => {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...Array.from(new Set(PROJECTS.map(p => p.cat)))];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
  const display = full ? filtered : PROJECTS.slice(0, 6);
  return (
    <Section id="projects" style={{ background: full ? C.bg : C.bg }}>
      <MaxW>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>Our Portfolio</Label>
          <H2>Featured Projects</H2>
          <p style={{ fontSize: "0.95rem", color: C.muted, marginTop: 12 }}>Real work, real results. Browse our completed projects across Maharashtra.</p>
        </div>
        {full && (
          <div className="fade-up" style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} className={`tab-btn${filter === c ? " active" : ""}`} onClick={() => setFilter(c)} style={{ padding: "8px 22px", background: "none", border: `1px solid ${C.border}`, color: C.light, fontSize: "0.83rem", fontWeight: 700, letterSpacing: "0.05em", borderRadius: 20, cursor: "pointer" }}>{c}</button>
            ))}
          </div>
        )}
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {display.map((p, i) => (
            <div key={p.title} className="proj-card fade-up" style={{ borderRadius: 10, overflow: "hidden", position: "relative", animationDelay: `${i * 0.1}s` }}>
              <img src={p.img} alt={p.title} style={{ width: "100%", height: 220, objectFit: "cover", display: "block", filter: "brightness(0.75) saturate(0.9)" }} />
              <div className="proj-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20 }}>
                <span style={{ fontSize: "0.72rem", color: C.gold, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.cat}</span>
                <p style={{ fontSize: "0.85rem", color: C.muted, marginTop: 4 }}>Duration: {p.duration}</p>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)", padding: "20px 16px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: C.white }}>{p.title}</div>
                    <div style={{ fontSize: "0.78rem", color: C.muted }}>📍 {p.location}</div>
                  </div>
                  <div style={{ background: C.gold, color: "#000", padding: "4px 10px", borderRadius: 4, fontSize: "0.78rem", fontWeight: 800 }}>{p.cost}</div>
                </div>
              </div>
              <div style={{ position: "absolute", top: 12, left: 12 }}>
                <span style={{ background: C.gold, color: "#000", padding: "3px 10px", borderRadius: 10, fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.05em" }}>{p.cat}</span>
              </div>
            </div>
          ))}
        </div>
        {!full && (
          <div className="fade-up" style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-outline" onClick={() => setPage("Projects")} style={{ padding: "14px 40px", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4 }}>
              View All Projects →
            </button>
          </div>
        )}
      </MaxW>
    </Section>
  );
};

/* ══════════════════════════════════════════════════
   WHY US
══════════════════════════════════════════════════ */
const WhyUs = () => (
  <Section style={{ background: C.surface }}>
    <MaxW>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }} className="about-cols">
        {/* Image collage */}
        <div className="fade-in" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <img src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=500&q=80" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 8, filter: "brightness(0.7)" }} alt="" />
          <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 8, filter: "brightness(0.7)", marginTop: 24 }} alt="" />
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8, filter: "brightness(0.7)", marginTop: -24 }} alt="" />
          <img src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80" style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8, filter: "brightness(0.7)" }} alt="" />
          <div style={{ position: "absolute", bottom: -20, right: -20, background: C.gold, color: "#000", padding: "20px 24px", borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", lineHeight: 1 }}>15+</div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em" }}>YEARS TRUSTED</div>
          </div>
        </div>

        {/* Content */}
        <div className="fade-up">
          <Label>Why Choose BuildCraft</Label>
          <H2 style={{ marginBottom: 20 }}>Built on Trust,<br />Backed by Skill</H2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: C.muted, marginBottom: 32 }}>
            We're not just another contractor. With 15+ years in Maharashtra's construction industry, we've built a reputation for quality, transparency, and reliability that homeowners trust completely.
          </p>

          {/* Skill bars */}
          {[
            ["Customer Satisfaction", 98, C.green],
            ["On-Time Completion", 94, C.gold],
            ["Quality Assurance Score", 97, C.blue],
            ["Client Repeat Rate", 78, C.orange],
          ].map(([label, pct, color]) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: "0.85rem", color: C.light, fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: "0.85rem", color, fontWeight: 700 }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                <div className="progress-bar" style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)`, borderRadius: 3 }} />
              </div>
            </div>
          ))}

          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 32 }}>
            {[
              ["✅","Licensed & Insured","Fully licensed contractors with workmen compensation insurance."],
              ["📋","Detailed Quotations","Itemized cost breakdowns — no hidden charges, ever."],
              ["🔧","Premium Materials","ISI-certified & branded materials with purchase receipts."],
              ["⚡","24/7 Emergency","Round-the-clock support for urgent plumbing, electrical, lockouts."],
            ].map(([ic, title, desc]) => (
              <div key={title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 14px" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>{ic}</div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: C.white, marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: "0.78rem", color: C.muted, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxW>
  </Section>
);

/* ══════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════ */
const Testimonials = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <Section style={{ background: C.bg }}>
      <MaxW>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
          <Label>Client Reviews</Label>
          <H2>What Homeowners Say</H2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 12 }}>
            <Stars n={5} />
            <span style={{ fontSize: "0.88rem", color: C.muted }}>4.9/5 based on 620+ verified reviews</span>
          </div>
        </div>

        {/* Featured large */}
        <div className="fade-up" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "40px 48px", marginBottom: 24, borderLeft: `4px solid ${C.gold}` }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1rem,2vw,1.4rem)", lineHeight: 1.75, color: C.light, fontStyle: "italic", marginBottom: 28 }}>
            "{TESTIMONIALS[active].text}"
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", color: "#000", flexShrink: 0 }}>{TESTIMONIALS[active].avatar}</div>
            <div>
              <div style={{ fontWeight: 800, color: C.white }}>{TESTIMONIALS[active].name}</div>
              <div style={{ fontSize: "0.8rem", color: C.muted }}>{TESTIMONIALS[active].role}</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <Stars n={TESTIMONIALS[active].rating} />
              <div style={{ fontSize: "0.75rem", color: C.muted, marginTop: 2 }}>Service: {TESTIMONIALS[active].service}</div>
            </div>
          </div>
        </div>

        {/* dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? C.gold : C.border, border: "none", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>

        {/* Grid */}
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="fade-up" style={{ background: C.card, border: `1px solid ${active === i ? C.gold : C.border}`, borderRadius: 10, padding: "22px 20px", cursor: "pointer", transition: "border-color 0.3s" }} onClick={() => setActive(i)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <Stars n={t.rating} />
                <span style={{ fontSize: "0.72rem", color: C.gold, fontWeight: 700 }}>{t.service}</span>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: C.muted, marginBottom: 16, fontStyle: "italic" }}>"{t.text.substring(0, 100)}..."</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.orange})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.9rem", color: "#000", flexShrink: 0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: C.white }}>{t.name}</div>
                  <div style={{ fontSize: "0.74rem", color: C.muted }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MaxW>
    </Section>
  );
};

/* ══════════════════════════════════════════════════
   TEAM
══════════════════════════════════════════════════ */
const Team = () => (
  <Section style={{ background: C.surface }}>
    <MaxW>
      <div className="fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
        <Label>Our People</Label>
        <H2>Meet the Experts</H2>
      </div>
      <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {TEAM.map((m, i) => (
          <div key={m.name} className="team-card fade-up" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "28px 20px", textAlign: "center", animationDelay: `${i * 0.1}s` }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}44, ${C.orange}44)`, border: `3px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 16px" }}>{m.icon}</div>
            <div style={{ fontWeight: 800, fontSize: "1rem", color: C.white, marginBottom: 4 }}>{m.name}</div>
            <div style={{ fontSize: "0.8rem", color: C.gold, fontWeight: 700, marginBottom: 8 }}>{m.role}</div>
            <div style={{ fontSize: "0.78rem", color: C.muted, marginBottom: 12 }}>{m.speciality}</div>
            <div style={{ background: `${C.gold}22`, borderRadius: 6, padding: "5px 12px", display: "inline-block", fontSize: "0.75rem", color: C.gold, fontWeight: 700 }}>{m.exp} Experience</div>
          </div>
        ))}
      </div>
    </MaxW>
  </Section>
);

/* ══════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════ */
const FAQ = ({ standalone = false }) => {
  const [open, setOpen] = useState(null);
  const items = standalone ? FAQS : FAQS.slice(0, 5);
  return (
    <Section style={{ background: standalone ? C.bg : C.surface }}>
      <MaxW>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>Got Questions</Label>
          <H2>Frequently Asked Questions</H2>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {items.map((faq, i) => (
            <div key={i} className="faq-item fade-up" style={{ border: `1px solid ${open === i ? C.gold : C.border}`, borderRadius: 8, marginBottom: 10, overflow: "hidden", transition: "border-color 0.3s", animationDelay: `${i * 0.07}s` }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "18px 22px", background: open === i ? `${C.gold}11` : C.card, border: "none", color: C.white, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{faq.q}</span>
                <span style={{ color: C.gold, fontSize: "1.2rem", transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "none", flexShrink: 0, marginLeft: 12 }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 22px 20px", background: `${C.gold}08`, animation: "fadeIn 0.3s ease" }}>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: C.light }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </MaxW>
    </Section>
  );
};

/* ══════════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════════ */
const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", service: "", budget: "", message: "", time: "" });
  const [status, setStatus] = useState("idle");

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const submit = () => {
    if (!form.name || !form.phone) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <Section id="contact" style={{ background: C.bg }}>
      <MaxW>
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 60 }}>
          <Label>Talk To Us</Label>
          <H2>Get Your Free Quote</H2>
          <p style={{ fontSize: "0.95rem", color: C.muted, marginTop: 12 }}>Free site visit + detailed written estimate within 24–48 hours. No obligation, no hidden charges.</p>
        </div>

        <div className="contact-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60, alignItems: "start" }}>
          {/* Info */}
          <div>
            {/* Live availability */}
            <div className="fade-up" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 20px", marginBottom: 24, borderTop: `3px solid ${C.green}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ position: "relative", width: 10, height: 10 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: C.green, display: "block" }} />
                  <span className="live-dot" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: C.green, display: "block" }} />
                </span>
                <span style={{ fontWeight: 800, color: C.green, fontSize: "0.88rem" }}>Available Right Now</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: C.muted }}>Our team is online and ready to help. Typical response time: <strong style={{ color: C.white }}>under 30 minutes</strong></p>
            </div>

            <div className="fade-up" style={{ marginBottom: 24 }}>
              {[
                { icon: "📞", label: "Call / WhatsApp", value: "+91 99999 99999", sub: "Mon–Sat, 8AM–8PM", action: "tel:+919999999999", color: C.green },
                { icon: "💬", label: "WhatsApp Chat", value: "Chat with us instantly", sub: "Fastest response", action: "#", color: C.green },
                { icon: "📧", label: "Email", value: "hello@buildcraft.in", sub: "Reply within 4 hours", action: "mailto:hello@buildcraft.in", color: C.blue },
                { icon: "📍", label: "Office Address", value: "123 Builder's Lane, Sangli", sub: "Maharashtra 416416", color: C.gold },
              ].map(({ icon, label, value, sub, action, color }) => (
                <div key={label} style={{ display: "flex", gap: 14, padding: "14px 16px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 10, cursor: action ? "pointer" : "default" }}
                  onClick={() => action && (window.location.href = action)}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: "0.74rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.92rem", color: C.white }}>{value}</div>
                    <div style={{ fontSize: "0.75rem", color: C.muted }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service areas */}
            <div className="fade-up" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px" }}>
              <div style={{ fontWeight: 800, fontSize: "0.9rem", color: C.white, marginBottom: 14 }}>📍 Service Areas</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Sangli", "Kolhapur", "Miraj", "Karad", "Islampur", "Satara", "Ichalkaranji", "Tasgaon", "Vita"].map(city => (
                  <span key={city} style={{ background: `${C.gold}18`, border: `1px solid ${C.gold}33`, color: C.gold, padding: "4px 10px", borderRadius: 12, fontSize: "0.76rem", fontWeight: 700 }}>{city}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="fade-up">
            {status === "sent" ? (
              <div style={{ background: `${C.green}18`, border: `2px solid ${C.green}`, borderRadius: 12, padding: "48px 40px", textAlign: "center" }}>
                <div style={{ fontSize: "4rem", marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: C.green, marginBottom: 12 }}>Request Submitted!</h3>
                <p style={{ color: C.light, fontSize: "1rem", lineHeight: 1.7 }}>Thank you, <strong style={{ color: C.white }}>{form.name}</strong>! Our team will contact you at <strong style={{ color: C.white }}>{form.phone}</strong> within 30 minutes to schedule your free site visit.</p>
                <button className="btn-gold" onClick={() => setStatus("idle")} style={{ marginTop: 24, padding: "12px 32px", borderRadius: 6, fontSize: "0.88rem", fontWeight: 700 }}>Submit Another Request</button>
              </div>
            ) : (
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "36px 32px" }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.2rem", color: C.white, marginBottom: 24 }}>Tell Us About Your Project</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                  {[["Full Name *", "name", "text", "Rahul Sharma"], ["Phone / WhatsApp *", "phone", "tel", "+91 98765 43210"]].map(([label, key, type, ph]) => (
                    <div key={key}>
                      <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: 6 }}>{label}</label>
                      <input className="contact-input" type={type} placeholder={ph} value={form[key]} onChange={e => set(key, e.target.value)} style={{ borderRadius: 6 }} />
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                  {[["Email Address", "email", "email", "you@email.com"], ["City / Location", "city", "text", "Sangli / Kolhapur..."]].map(([label, key, type, ph]) => (
                    <div key={key}>
                      <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: 6 }}>{label}</label>
                      <input className="contact-input" type={type} placeholder={ph} value={form[key]} onChange={e => set(key, e.target.value)} style={{ borderRadius: 6 }} />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: 6 }}>Service Required *</label>
                  <select className="contact-input" value={form.service} onChange={e => set("service", e.target.value)} style={{ borderRadius: 6 }}>
                    <option value="">— Select a service —</option>
                    {SERVICES.map(s => <option key={s.id} value={s.name}>{s.icon} {s.name}</option>)}
                    <option value="Multiple Services">Multiple Services / Full Project</option>
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: 6 }}>Approximate Budget</label>
                    <select className="contact-input" value={form.budget} onChange={e => set("budget", e.target.value)} style={{ borderRadius: 6 }}>
                      <option value="">Select budget range</option>
                      {["Under ₹25,000","₹25,000 – ₹1 Lakh","₹1L – ₹5L","₹5L – ₹20L","₹20L – ₹50L","₹50L+","Not Sure Yet"].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: 6 }}>Preferred Visit Time</label>
                    <select className="contact-input" value={form.time} onChange={e => set("time", e.target.value)} style={{ borderRadius: 6 }}>
                      <option value="">Select time</option>
                      {["Morning (8–11 AM)","Mid-day (11AM–2PM)","Afternoon (2–5 PM)","Evening (5–8 PM)","Weekends Only","ASAP – Emergency"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, display: "block", marginBottom: 6 }}>Project Details</label>
                  <textarea className="contact-input" rows={4} placeholder="Describe your project — size, current issues, specific requirements, timeline, or anything else we should know..." value={form.message} onChange={e => set("message", e.target.value)} style={{ borderRadius: 6, resize: "vertical" }} />
                </div>

                <button className="btn-gold" onClick={submit} style={{ width: "100%", padding: "16px", fontSize: "0.95rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {status === "sending" ? (
                    <><span style={{ width: 16, height: 16, border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} /> Submitting...</>
                  ) : "🏠 Submit Free Quote Request"}
                </button>
                <p style={{ fontSize: "0.76rem", color: C.muted, textAlign: "center", marginTop: 12 }}>By submitting, you agree to receive a call/WhatsApp from our team. We never spam.</p>
              </div>
            )}
          </div>
        </div>
      </MaxW>
    </Section>
  );
};

/* ══════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════ */
const About = ({ setPage }) => {
  const [statsVis, setStatsVis] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useScrollReveal();
  return (
    <div>
      {/* Page hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.surface} 0%, ${C.bg} 100%)`, padding: "80px 64px", borderBottom: `1px solid ${C.border}` }}>
        <MaxW>
          <Label>Our Story</Label>
          <H2 style={{ marginBottom: 20 }}>About BuildCraft</H2>
          <p style={{ fontSize: "1.05rem", color: C.muted, maxWidth: 600, lineHeight: 1.85 }}>
            Founded in 2010 in Sangli, Maharashtra, BuildCraft has grown from a 3-person masonry team to a full-service construction company trusted by 3,200+ families.
          </p>
        </MaxW>
      </div>

      {/* Mission/Vision */}
      <Section style={{ background: C.bg }}>
        <MaxW>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              { icon: "🎯", title: "Our Mission", text: "To deliver exceptional construction services with complete transparency, using the best materials and certified professionals — making quality construction accessible to every family in Maharashtra." },
              { icon: "🌟", title: "Our Vision", text: "To become Maharashtra's most trusted construction brand by 2030, known for integrity, innovation, and unmatched quality across every service we offer." },
              { icon: "💎", title: "Our Values", text: "Transparency in every quote. Accountability on every site. Respect for every client's home. These aren't just words — they're the principles we hire and train by." },
            ].map(({ icon, title, text }) => (
              <div className="fade-up" key={title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 28 }}>
                <div style={{ fontSize: "2rem", marginBottom: 14 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: C.gold, marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: C.muted }}>{text}</p>
              </div>
            ))}
          </div>
        </MaxW>
      </Section>

      {/* Stats */}
      <Section ref={ref} style={{ background: C.surface }}>
        <MaxW>
          <div className="stats-row" ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[["🏗️",3200,"+ Projects"],["👷",200,"+ Team Members"],["🏆",15,"+ Years"],["⭐",98,"% Satisfaction"]].map(([ic,n,l]) => (
              <StatCard key={l} icon={ic} target={n} suffix={l.startsWith("+") ? "+" : "%"} label={l.replace(/[+%]/g,"")} color={C.gold} started={statsVis} />
            ))}
          </div>
        </MaxW>
      </Section>

      <WhyUs />
      <Team />
      <FAQ standalone />
    </div>
  );
};

/* ══════════════════════════════════════════════════
   WHATSAPP FLOAT
══════════════════════════════════════════════════ */
const WhatsAppFloat = () => (
  <a href="https://wa.me/919999999999?text=Hello%20BuildCraft!%20I%20need%20a%20quote." target="_blank" rel="noopener noreferrer" className="whatsapp-btn"
    style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", boxShadow: "0 4px 24px rgba(37,211,102,0.4)", textDecoration: "none", transition: "transform 0.2s" }}>
    💬
  </a>
);

/* ══════════════════════════════════════════════════
   CALL TO ACTION BANNER
══════════════════════════════════════════════════ */
const CTABanner = ({ setPage }) => (
  <div style={{ background: `linear-gradient(135deg, ${C.gold} 0%, ${C.orange} 100%)`, padding: "72px 64px" }}>
    <MaxW>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.75rem", letterSpacing: "0.4em", color: "rgba(0,0,0,0.5)", marginBottom: 8 }}>LIMITED SLOTS AVAILABLE THIS MONTH</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,4vw,3.8rem)", lineHeight: 0.95, color: "#000" }}>Ready to Start<br />Your Project?</h2>
          <p style={{ fontSize: "1rem", color: "rgba(0,0,0,0.6)", marginTop: 10 }}>Free site visit • Detailed quotation • No commitment required</p>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button className="btn-dark" onClick={() => setPage("Contact")} style={{ padding: "16px 40px", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4, background: "#000", color: C.gold, border: "none" }}>
            Get Free Quote
          </button>
          <a href="tel:+919999999999" style={{ padding: "14px 36px", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "2px solid #000", color: "#000", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            📞 Call Now
          </a>
        </div>
      </div>
    </MaxW>
  </div>
);

/* ══════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════ */
const Footer = ({ setPage }) => (
  <footer style={{ background: "#080a0d", borderTop: `1px solid ${C.border}` }}>
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: "64px 64px 32px" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 48, paddingBottom: 48, borderBottom: `1px solid ${C.border}` }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, cursor: "pointer" }} onClick={() => setPage("Home")}>
            <div style={{ width: 38, height: 38, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.2rem", color: "#000", clipPath: "polygon(10% 0%,90% 0%,100% 10%,100% 90%,90% 100%,10% 100%,0% 90%,0% 10%)" }}>BC</div>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", letterSpacing: "0.08em" }}>Build<span style={{ color: C.gold }}>Craft</span></span>
          </div>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: C.muted, maxWidth: 320, marginBottom: 20 }}>Maharashtra's most trusted home construction service. RERA-registered, licensed professionals, 15+ years of quality craftsmanship across Sangli, Kolhapur, and beyond.</p>
          <div style={{ display: "flex", gap: 12 }}>
            {["📘","📸","▶️","🐦"].map(ic => (
              <span key={ic} style={{ width: 36, height: 36, border: `1px solid ${C.border}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1rem", transition: "border-color 0.2s" }}>{ic}</span>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "12px 16px", background: `${C.green}18`, border: `1px solid ${C.green}33`, borderRadius: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, display: "block" }} />
              <span style={{ fontSize: "0.78rem", color: C.green, fontWeight: 700 }}>RERA Registered: MH/12345/2024</span>
            </div>
            <div style={{ fontSize: "0.74rem", color: C.muted }}>ISO 9001:2015 Certified Quality Management</div>
          </div>
        </div>

        {/* Services */}
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold, marginBottom: 18 }}>Services</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {SERVICES.slice(0, 8).map(s => (
              <li key={s.id}><span onClick={() => {}} className="footer-link" style={{ fontSize: "0.83rem", color: C.muted, cursor: "pointer", transition: "color 0.2s" }}>{s.icon} {s.name}</span></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold, marginBottom: 18 }}>Company</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {["Home","Services","Projects","About Us","Contact","Careers","Blog"].map(l => (
              <li key={l}><span onClick={() => setPage(l.split(" ")[0])} className="footer-link" style={{ fontSize: "0.83rem", color: C.muted, cursor: "pointer" }}>{l}</span></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold, marginBottom: 18 }}>Get In Touch</div>
          {[["📞","Phone / WhatsApp","+91 99999 99999"],["📧","Email","hello@buildcraft.in"],["📍","Office","123 Builder's Lane, Sangli, MH 416416"],["⏰","Hours","Mon–Sat: 8AM–8PM | Emergency: 24/7"]].map(([ic,l,v]) => (
            <div key={l} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>{ic}</span>
              <div>
                <div style={{ fontSize: "0.72rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                <div style={{ fontSize: "0.83rem", color: C.light, marginTop: 2 }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: "0.78rem", color: C.muted }}>© 2025 <span style={{ color: C.gold }}>BuildCraft Construction Services</span>. All rights reserved. Crafted with ❤️ in Sangli, Maharashtra.</div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy","Terms of Service","Sitemap"].map(l => (
            <span key={l} style={{ fontSize: "0.77rem", color: C.muted, cursor: "pointer", transition: "color 0.2s" }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ══════════════════════════════════════════════════
   HOME PAGE (assembled)
══════════════════════════════════════════════════ */
const HomePage = ({ setPage, setSelectedService }) => {
  useScrollReveal();
  return (
    <>
      <Hero setPage={setPage} />
      <ServicesSection setPage={setPage} setSelectedService={setSelectedService} full={false} />
      <WhyUs />
      <Projects full={false} setPage={setPage} />
      <Testimonials />
      <CTABanner setPage={setPage} />
      <FAQ />
    </>
  );
};

/* ══════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("Home");
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderPage = () => {
    switch (page) {
      case "Home": return <HomePage setPage={navigate} setSelectedService={setSelectedService} />;
      case "Services": return (
        <div>
          <Section style={{ background: C.surface, paddingBottom: 0 }}>
            <MaxW>
              <div className="fade-up">
                <Label>All Services</Label>
                <H2 style={{ marginBottom: 16 }}>Everything We Offer</H2>
                <p style={{ fontSize: "0.95rem", color: C.muted, maxWidth: 550 }}>15 specialized construction & real estate services — all under one roof with certified professionals and written warranties.</p>
              </div>
            </MaxW>
          </Section>
          <ServicesSection setPage={navigate} setSelectedService={setSelectedService} full />
          <CTABanner setPage={navigate} />
        </div>
      );
      case "ServiceDetail": return <ServiceDetail svc={selectedService} setPage={navigate} />;
      case "Projects": return (
        <div>
          <Section style={{ background: C.surface, paddingBottom: 0 }}>
            <MaxW>
              <Label>Portfolio</Label>
              <H2 style={{ marginBottom: 16 }}>Our Work Speaks</H2>
              <p style={{ fontSize: "0.95rem", color: C.muted, maxWidth: 500 }}>Browse our completed projects across Maharashtra — real homes, real transformations.</p>
            </MaxW>
          </Section>
          <Projects full setPage={navigate} />
          <Testimonials />
          <CTABanner setPage={navigate} />
        </div>
      );
      case "About": return (
        <div><About setPage={navigate} /><CTABanner setPage={navigate} /></div>
      );
      case "Contact": return (
        <div>
          <Contact />
          <div style={{ background: C.surface }}>
            <Section style={{ paddingTop: 40, paddingBottom: 40 }}>
              <MaxW>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                  {[
                    { icon: "📞", title: "Call Us", desc: "+91 99999 99999", sub: "Mon–Sat 8AM–8PM", color: C.green },
                    { icon: "💬", title: "WhatsApp", desc: "Chat instantly", sub: "Fastest response", color: C.green },
                    { icon: "⚡", title: "Emergency", desc: "24/7 Available", sub: "Plumbing, Electrical, Lockout", color: C.orange },
                  ].map(({ icon, title, desc, sub, color }) => (
                    <div key={title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "22px 20px", textAlign: "center", borderTop: `3px solid ${color}` }}>
                      <div style={{ fontSize: "2rem", marginBottom: 10 }}>{icon}</div>
                      <div style={{ fontWeight: 800, color: C.white, marginBottom: 4 }}>{title}</div>
                      <div style={{ color, fontWeight: 700, fontSize: "0.95rem" }}>{desc}</div>
                      <div style={{ fontSize: "0.78rem", color: C.muted, marginTop: 4 }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </MaxW>
            </Section>
          </div>
        </div>
      );
      default: return <HomePage setPage={navigate} setSelectedService={setSelectedService} />;
    }
  };

  return (
    <>
      <GlobalCSS />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <TopBar />
        <Navbar page={page} setPage={navigate} />
        <Marquee />
        <main style={{ flex: 1 }}>{renderPage()}</main>
        <CTABanner setPage={navigate} />
        <Footer setPage={navigate} />
      </div>
      <WhatsAppFloat />
    </>
  );
}