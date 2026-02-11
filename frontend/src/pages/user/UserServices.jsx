import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import ServiceCard from "../../components/cards/ServiceCard";
import Loader from "../../components/common/Loader";
import ServiceService from "../../services/service.service";
import { SERVICE_CATEGORIES } from "../../utils/constants";

const UserServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await ServiceService.getAllServices();
        setServices(data || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
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
      const matchesCategory = category === "all" || service.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [services, search, category]);

  return (
    <main className="bg-white w-full overflow-x-hidden">
      <section className="py-10 px-6 md:px-12 lg:px-16 border-b border-gray-100">
        <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-semibold">
          Services
        </span>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mt-4 leading-tight">
          Book Skilled Teams
        </h1>
      </section>

      <section className="py-10 px-6 md:px-12 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col gap-5">
          <div className="relative w-full lg:max-w-md">
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

      <section className="py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : filteredServices.length === 0 ? (
            <p className="text-gray-600 text-center">No services found for this filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  detailsPathBase="/user/services"
                  showAction
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default UserServices;
