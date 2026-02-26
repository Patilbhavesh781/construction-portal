import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Funnel, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/jsw/Footer";
import ContactCTASection from "@/components/jsw/ContactCTASection";
import Loader from "@/components/common/Loader";
import ServiceService from "@/services/service.service";
import fallbackImage from "@/assets/Apartment1.jpeg";

const PAGE_SIZE = 8;

const normalize = (v) => String(v ?? "").trim();

const getCategory = (service) => normalize(service.category || "Uncategorized");

const getImage = (service) => service.images?.[0]?.url || service.images?.[0] || fallbackImage;

const FilterSection = ({ title, options, selected, onToggle, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="w-full">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between py-2 text-left">
        <span className="text-[#262626] font-medium leading-7 tracking-[0.2px]">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="flex flex-col gap-2 mt-2">
          {options.map((option) => {
            const active = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => onToggle(option)}
                className="flex items-center gap-2 py-1 text-left hover:opacity-70 transition-opacity"
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${active ? "bg-[#FC7F11] border-[#FC7F11]" : "bg-white border-[#D1D5DB]"}`} />
                <span className="text-sm text-[#464646]">{option}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F6F5EF] rounded-2xl overflow-hidden border border-[#F1F1F1]">
      <img src={getImage(service)} alt={service.title} className="w-full h-[220px] object-cover" />
      <div className="p-4 xl:p-6 flex flex-col gap-2">
        <h2 className="text-xl font-medium text-[#030712] leading-7">{service.title}</h2>
        <p className="text-[#70737A] line-clamp-2 text-xs xl:text-base leading-5 tracking-[0.2px]">
          {service.shortDescription || service.description || "BuildPro service solution tailored to your requirement."}
        </p>

        <button
          type="button"
          onClick={() => navigate(`/services/${service._id}`)}
          className="mt-3 h-10 rounded-lg bg-[#FC7F11] text-white text-sm font-medium hover:bg-[#e87109] transition-colors"
        >
          View details
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await ServiceService.getAllServices();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const p = Number(searchParams.get("page") || 1);
    if (p !== page) setPage(p);
  }, [searchParams, page]);

  const categoryOptions = useMemo(() => Array.from(new Set(services.map(getCategory))).sort(), [services]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const category = getCategory(service);
      return selectedCategories.length === 0 || selectedCategories.includes(category);
    });
  }, [services, selectedCategories]);

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const paginatedServices = filteredServices.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    if (safePage !== page) {
      setPage(safePage);
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("page", String(safePage));
        return params;
      });
    }
  }, [safePage, page, setSearchParams]);

  const toggleValue = (setter, values, value) => {
    setter(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
    setPage(1);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", "1");
      return params;
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPage(1);
    setSearchParams({ page: "1" });
  };

  return (
    <main className="bg-[#FCFCF7] flex flex-col items-center w-full">
      <Navbar />

      <section className="w-full bg-[#FCFCF7] flex flex-col items-center pt-24">
        <div className="flex flex-col items-start justify-start gap-5 px-4 py-10 w-full max-w-[768px] xl:max-w-[1440px] xl:p-20 xl:gap-10">
          <h1 className="text-[#030712] text-3xl text-left font-medium leading-10 tracking-[0.32px] xl:text-5xl">Services gallery</h1>

          <div className="w-full flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="text-xs text-[#FC7F11] font-medium xl:hidden flex items-center justify-center bg-[#FAF0DC] py-2 px-3 rounded-lg gap-1"
            >
              <Funnel className="w-3 h-3" /> Filter
            </button>
          </div>

          <div className="flex justify-start xl:gap-10 items-start w-full">
            <aside className="hidden xl:flex flex-col p-6 items-start bg-[#F6F5EF] rounded-xl w-[320px] gap-8 sticky top-28">
              <span className="flex justify-between w-full items-center">
                <p className="text-[#262626] font-medium leading-8 tracking-[0.24px] text-xl">Filters</p>
                <button type="button" onClick={resetFilters} className="text-sm text-[#FC7F11] hover:opacity-80">
                  Reset
                </button>
              </span>
              <FilterSection
                title="Categories"
                options={categoryOptions}
                selected={selectedCategories}
                onToggle={(v) => toggleValue(setSelectedCategories, selectedCategories, v)}
              />
            </aside>

            <div className="w-full">
              {loading ? (
                <div className="py-20 flex justify-center w-full">
                  <Loader size="lg" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-y-5 xl:grid-cols-2 xl:gap-y-10 xl:gap-x-10">
                    {paginatedServices.map((service) => (
                      <ServiceCard key={service._id} service={service} />
                    ))}
                  </div>

                  {paginatedServices.length === 0 && (
                    <div className="py-12 text-center text-[#70737A]">No services found for selected filters.</div>
                  )}

                  <div className="flex items-center justify-center gap-1 mt-12 xl:mt-20">
                    <button
                      type="button"
                      disabled={safePage === 1}
                      onClick={() => setSearchParams({ page: String(safePage - 1) })}
                      className={`px-2 py-1 xl:px-3 xl:py-2 text-sm xl:text-base font-medium border border-[#F1F1F1] rounded-l-[4px] ${
                        safePage === 1 ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-[#262626] bg-white hover:bg-gray-50"
                      }`}
                    >
                      <ChevronLeft className="inline-block w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).slice(0, 5).map((_, idx) => {
                        const p = idx + 1;
                        const active = p === safePage;
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setSearchParams({ page: String(p) })}
                            className={`px-2 py-1 xl:px-3 xl:py-2 text-sm xl:text-base font-medium border border-[#F1F1F1] ${
                              active ? "bg-[#FC7F11] text-white" : "text-[#262626] bg-white hover:bg-gray-50"
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                      {totalPages > 5 && <span className="px-2 py-1 text-gray-500">...</span>}
                    </div>

                    <button
                      type="button"
                      disabled={safePage === totalPages}
                      onClick={() => setSearchParams({ page: String(safePage + 1) })}
                      className={`px-2 py-1 xl:px-3 xl:py-2 text-sm xl:text-base font-medium border border-[#F1F1F1] rounded-r-[4px] ${
                        safePage === totalPages ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-[#262626] bg-white hover:bg-gray-50"
                      }`}
                    >
                      <ChevronRight className="inline-block w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <ContactCTASection />
      </section>

      <Footer />

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] xl:hidden">
          <button type="button" aria-label="Close filter" className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[90%] max-w-[360px] bg-[#FCFCF7] shadow-xl p-5 overflow-y-auto">
            <div className="flex justify-between items-center">
              <p className="text-[#262626] text-xl font-medium">Filters</p>
              <button type="button" onClick={resetFilters} className="text-sm text-[#FC7F11]">
                Reset
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <FilterSection
                title="Categories"
                options={categoryOptions}
                selected={selectedCategories}
                onToggle={(v) => toggleValue(setSelectedCategories, selectedCategories, v)}
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 h-11 w-full rounded-lg bg-[#FC7F11] text-white font-medium"
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Services;
