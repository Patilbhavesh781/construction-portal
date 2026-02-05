import React, { useEffect, useMemo, useState } from "react";
import { Search, Filter, MapPin, Layers, CheckCircle2, LayoutGrid, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import ProjectCard from "../../components/cards/ProjectCard";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import getProjects from "../../services/project.service";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await getProjects();
        setProjects(res?.data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title?.toLowerCase().includes(search.toLowerCase()) ||
        project.location?.toLowerCase().includes(search.toLowerCase());

      const matchesType = type === "all" || project.type === type;
      const matchesStatus = status === "all" || project.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [projects, search, type, status]);

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Section - Dark Industrial Theme */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1 rounded-full bg-orange-600/20 text-orange-400 text-sm font-semibold tracking-wide uppercase mb-4 border border-orange-600/30">
                Portfolio
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Our <span className="text-orange-500">Architectural</span> Legacy.
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                From structural masterpieces to bespoke interiors, explore how we've helped shape residential and commercial spaces across India.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Modern Integrated Filter Bar */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Input */}
            <div className="relative w-full lg:w-1/3 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="text"
                placeholder="Search projects or cities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all shadow-sm"
              />
            </div>

            {/* Category Selectors */}
            <div className="flex items-center gap-3 overflow-x-auto w-full no-scrollbar">
              <div className="flex p-1 bg-slate-200/50 rounded-2xl">
                {["all", "residential", "commercial", "interior", "renovation"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      type === t
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              
              <div className="h-8 w-px bg-slate-300 mx-2 hidden md:block" />

              <div className="flex p-1 bg-slate-200/50 rounded-2xl">
                {["all", "completed", "ongoing"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      status === s
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid with Stats Overlay */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader size="lg" />
              <p className="mt-4 text-slate-500 font-medium">Loading our finest works...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-slate-100">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <LayoutGrid className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No projects match your filter</h3>
              <p className="text-slate-500 mb-8">Try adjusting your filters or search terms.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setType("all");
                  setStatus("all");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project, idx) => (
                <ScrollReveal key={project._id} delay={idx * 0.05}>
                  <div className="group relative">
                    <ProjectCard project={project} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="py-24 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-white text-4xl font-bold mb-8">Every project follows a <span className="text-orange-500">certified</span> lifecycle.</h2>
              
              <div className="space-y-6">
                {[
                  { icon: Clock, title: "Upcoming", desc: "Rigorous planning, Vastu checks, and architectural blueprinting." },
                  { icon: Layers, title: "Ongoing", desc: "Real-time site management and grade-A material procurement." },
                  { icon: CheckCircle2, title: "Completed", desc: "Final quality audit and seamless handover to the client." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-slate-800/40 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" 
                alt="Architecture Planning" 
                className="rounded-[3rem] shadow-2xl relative z-10"
              />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600 rounded-full blur-[80px] opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-[3.5rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-orange-900/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Inspired by our work?</h2>
            <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto opacity-90">
              Let's discuss how we can bring this level of craftsmanship to your next dream project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 border-none px-12 rounded-full font-bold"
                onClick={() => navigate("/contact")}
              >
                Book a Site Visit
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 rounded-full px-12"
                onClick={() => navigate("/services")}
              >
                Learn Our Process
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;