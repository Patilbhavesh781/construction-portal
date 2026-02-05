import React, { useEffect, useMemo, useState } from "react";
import { Search, MapPin, IndianRupee, Home, Building2, SlidersHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import PropertyCard from "../../components/cards/PropertyCard";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import getProperties from "../../services/property.service";

const Properties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all"); 
  const [category, setCategory] = useState("all"); 
  const [priceRange, setPriceRange] = useState("all"); 

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await getProperties();
        setProperties(res?.data || []);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title?.toLowerCase().includes(search.toLowerCase()) ||
        property.location?.toLowerCase().includes(search.toLowerCase());

      const matchesType = type === "all" || property.type === type;
      const matchesCategory = category === "all" || property.category === category;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-50l" && property.price < 5000000) ||
        (priceRange === "50l-1cr" && property.price >= 5000000 && property.price <= 10000000) ||
        (priceRange === "above-1cr" && property.price > 10000000);

      return matchesSearch && matchesType && matchesCategory && matchesPrice;
    });
  }, [properties, search, type, category, priceRange]);

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Section - Refined with Overlay */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-widest mb-4 border border-orange-500/30">
                Premium Listings
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Find Your <span className="text-orange-500">Perfect</span> Space.
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore a handpicked selection of residential and commercial properties verified by BuildPro experts for quality and legal compliance.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Advanced Filter Bar - Sticky & Glassmorphism */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            
            {/* Search Box */}
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="City, Neighborhood or Project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
              />
            </div>

            {/* Filter Pills Container */}
            <div className="flex items-center gap-4 overflow-x-auto w-full no-scrollbar pb-2 lg:pb-0">
                {/* Sale/Rent Toggle */}
                <div className="flex bg-slate-200/50 p-1 rounded-xl shrink-0">
                    {["all", "sale", "rent"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setType(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                                type === t ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Category Dropdown/Selector */}
                <div className="flex bg-slate-200/50 p-1 rounded-xl shrink-0">
                    {["all", "residential", "commercial"].map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                                category === c ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            {c === "all" ? "Any Type" : c}
                        </button>
                    ))}
                </div>

                {/* Price Range Pills */}
                <div className="flex gap-2 shrink-0">
                    {[
                        { label: "All Prices", value: "all" },
                        { label: "< ₹50L", value: "under-50l" },
                        { label: "₹50L - 1Cr", value: "50l-1cr" },
                        { label: "> 1Cr", value: "above-1cr" }
                    ].map((p) => (
                        <button
                            key={p.value}
                            onClick={() => setPriceRange(p.value)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                                priceRange === p.value 
                                ? "bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-200" 
                                : "bg-white border-slate-200 text-slate-600 hover:border-orange-300"
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-slate-900 font-bold text-xl flex items-center gap-2">
                <Building2 className="text-orange-600 w-6 h-6" />
                Showing {filteredProperties.length} Properties
             </h2>
             { (search || type !== "all" || category !== "all" || priceRange !== "all") && (
                <button 
                    onClick={() => { setSearch(""); setType("all"); setCategory("all"); setPriceRange("all"); }}
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                    <X className="w-4 h-4" /> Reset Filters
                </button>
             )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader size="lg" />
              <p className="mt-4 text-slate-500 animate-pulse">Scanning market listings...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-slate-100">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <SlidersHorizontal className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching properties</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">Try widening your price range or searching for a different location.</p>
              <Button variant="outline" onClick={() => setSearch("")}>See All Listings</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map((property, idx) => (
                <ScrollReveal key={property._id} delay={idx * 0.05}>
                  <PropertyCard property={property} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Guide - New Informational Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold">Why Buy Through BuildPro?</h2>
                    <p className="text-slate-400 text-lg">
                        We bridge the gap between complex real estate transactions and your peace of mind. Every property listed here undergoes a 3-tier check.
                    </p>
                    <div className="space-y-4">
                        {[
                            { t: "Legal Verification", d: "We ensure all property titles are clear and free from litigation.", i: <Home className="w-5 h-5" /> },
                            { t: "Fair Valuation", d: "Market-accurate pricing backed by data, not just speculation.", i: <IndianRupee className="w-5 h-5" /> },
                            { t: "Direct Assistance", d: "From site visits to registration, our experts accompany you.", i: <MapPin className="w-5 h-5" /> }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shrink-0">
                                    {item.i}
                                </div>
                                <div>
                                    <h4 className="font-bold">{item.t}</h4>
                                    <p className="text-sm text-slate-500">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <img 
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
                        alt="Property Handover" 
                        className="rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Trust Section / CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-[3.5rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-orange-900/30">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Need a Specialized Search?</h2>
                <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
                    If you can't find what you're looking for, our concierge team can source exclusive off-market properties for you.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                        size="lg" 
                        className="bg-white text-orange-600 hover:bg-slate-900 hover:text-white rounded-full px-12 font-bold transition-all border-none"
                        onClick={() => navigate("/contact")}
                    >
                        Contact Agent
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-white text-white hover:bg-white/10 rounded-full px-12"
                        onClick={() => navigate("/about")}
                    >
                        Our Process
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;