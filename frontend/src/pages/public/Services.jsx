import React, { useEffect, useMemo, useState } from "react";
import {
  Hammer,
  Droplet,
  ShieldCheck,
  Brush,
  Zap,
  Wrench,
  Square,
  DoorOpen,
  Key,
  Home,
  Sofa,
  Ruler,
  Building2,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/common/Loader";
import ServiceService from "../../services/service.service";
import { SERVICE_CATEGORIES } from "../../utils/constants";

const Services = ({ detailsPathBase = "/services" }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const serviceTypes = [
    { title: "Bricks & Plaster Work", icon: Hammer, category: "construction" },
    { title: "Plumbing Work", icon: Droplet, category: "construction" },
    { title: "Waterproofing Work", icon: ShieldCheck, category: "construction" },
    { title: "Gypsum Work", icon: Square, category: "interior" },
    { title: "Painting Work", icon: Brush, category: "construction" },
    { title: "Electrical Work", icon: Zap, category: "construction" },
    { title: "Fabrication Work", icon: Wrench, category: "construction" },
    { title: "Tile Work", icon: Square, category: "construction" },
    { title: "Door & Window Work", icon: DoorOpen, category: "construction" },
    { title: "Lock & Key Work", icon: Key, category: "construction" },
    { title: "Renovation Work", icon: Home, category: "renovation" },
    { title: "Interior Design Work", icon: Sofa, category: "interior" },
    {
      title: "Architecture Planning & RCC Work",
      icon: Ruler,
      category: "architecture",
    },
    {
      title: "Property Buying & Selling",
      icon: Building2,
      category: "real-estate",
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await ServiceService.getAllServices();
        setServices(res || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.title?.toLowerCase().includes(search.toLowerCase()) ||
        service.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || service.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [services, search, category]);

  const getServiceImage = (service) =>
    service.images?.[0]?.url ||
    service.images?.[0] ||
    "https://images.unsplash.com/photo-1581092921461-eab10380bee1?auto=format&fit=crop&q=100";

  const getServiceMeta = (service) =>
    SERVICE_CATEGORIES.find((cat) => cat.value === service.category)?.label ||
    service.category ||
    "Service";

  return (
    <main className="bg-white w-full overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-[60svh] flex items-center px-8 md:px-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1738817628138-b794ed944ed5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative z-10 max-w-4xl">
          <span className="text-sm uppercase tracking-[0.4em] text-red-600 font-semibold">
            Services
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mt-6 leading-tight">
            Complete Construction <br />
            <span className="font-medium italic">and Design Services</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl">
            From core structural work to interiors and property services,
            everything under one roof.
          </p>
        </div>
      </section>

      {/* ================= SERVICE TYPES ================= */}
      <section className="py-32 px-8 md:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
              Service Types
            </h2>
            <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl">
              Choose any discipline and explore the details for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.title}
                  onClick={() => setCategory(type.category)}
                  className="flex items-center gap-4 p-6 bg-gray-50 border border-gray-100 hover:border-red-600 transition"
                >
                  <span className="w-12 h-12 flex items-center justify-center border border-gray-200 bg-white">
                    <Icon className="w-5 h-5 text-red-600" />
                  </span>
                  <span className="text-sm font-medium text-gray-900 text-left">
                    {type.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="py-20 px-8 md:px-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCategory("all")}
              className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold border ${
                category === "all"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-600"
              }`}
            >
              All
            </button>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold border ${
                  category === cat.value
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : filteredServices.length === 0 ? (
            <p className="text-gray-600 text-center">
              No services found for this filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {filteredServices.map((service) => (
                <div key={service._id} className="group">
                  <div className="relative overflow-hidden">
                    <img
                      src={getServiceImage(service)}
                      alt={service.title}
                      className="w-full h-[420px] object-cover transform group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                      {getServiceMeta(service)}
                    </p>
                    <h3 className="text-2xl font-light text-gray-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-gray-600 text-lg line-clamp-2">
                      {service.shortDescription || service.description}
                    </p>

                    <button
                      className="mt-6 text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline"
                      onClick={() => navigate(`${detailsPathBase}/${service._id}`)}
                    >
                      View Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-40 px-8 md:px-24 bg-gray-900 text-white text-center">
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          Ready to Plan Your <br />
          <span className="font-medium italic">Next Project</span>
        </h2>
        <p className="mt-8 text-gray-400 text-lg">
          Speak with our engineers for scope, pricing, and timelines.
        </p>
        <button className="mt-12 px-12 py-4 border border-white uppercase tracking-widest hover:bg-white hover:text-gray-900 transition">
          Enquire Now
        </button>
      </section>
    </main>
  );
};

export default Services;
