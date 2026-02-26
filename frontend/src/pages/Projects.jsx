import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Compass, Funnel, Home, IndianRupee, MapPin, Ruler } from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/jsw/Footer";
import ContactCTASection from "@/components/jsw/ContactCTASection";
import Loader from "@/components/common/Loader";
import ProjectService from "@/services/project.service";
import fallbackImage from "@/assets/Apartment3.jpeg";

const PAGE_SIZE = 8;
const FLOOR_OPTIONS = ["G+1", "G+2", "G+3", "G+4", "G+5"];
const PLOT_OPTIONS = ["30x40 sq. ft", "30x50 sq. ft", "40x50 sq. ft", "40x60 sq. ft", "30x60 sq. ft"];

const getImage = (project) => project.images?.[0]?.url || project.images?.[0] || fallbackImage;
const getCity = (project) => project.location?.city || project.location?.address || "Not specified";
const getFloor = (project) => project.floor || project.floors || project.structure?.floor || "G+1";
const getPlot = (project) => project.plotDimension || project.plot_dimension || project.landArea || "30x40 sq. ft";
const getFacing = (project) => project.facing || project.direction || "Not specified";

const getBudgetLabel = (project) => {
  if (project.budgetRange) return String(project.budgetRange);
  if (project.budget == null) return "--";
  const lakhs = Number(project.budget) / 100000;
  if (!Number.isFinite(lakhs) || lakhs <= 0) return "--";
  const low = Math.floor(lakhs / 10) * 10;
  const high = low + 10;
  return `${low}-${high}L`;
};

const FilterSection = ({ title, options, selected, onToggle }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full flex justify-between items-center py-2 text-left focus:outline-none">
        <span className="text-[#262626] font-medium leading-7 tracking-[0.2px]">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="flex flex-col gap-2 mt-2">
          {options.map((option) => {
            const active = selected.includes(option);
            return (
              <button key={option} type="button" onClick={() => onToggle(option)} className="flex items-center gap-2 py-1 hover:opacity-70 transition-opacity text-left">
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

const ProjectCard = ({ project, onOpen }) => (
  <div className="w-full max-w-[440px] bg-[#F6F5EF] rounded-2xl border border-[#F1F1F1] overflow-hidden">
    <div className="w-full aspect-[11/7] overflow-hidden">
      <img alt={project.title} src={getImage(project)} className="w-full h-full object-cover" />
    </div>
    <div className="p-4 xl:p-6 flex flex-col gap-1 xl:gap-2">
      <h2 className="text-xl font-medium text-[#030712] leading-7">{project.title}</h2>
      <p className="text-[#70737A] line-clamp-2 text-xs leading-4 xl:text-base xl:leading-6 tracking-[0.36px]">
        {project.shortDescription || project.description || ""}
      </p>
      <p className="text-xs xl:text-base text-[#464646] pt-2 font-medium leading-5 tracking-[0.16px] flex items-center gap-1">
        <MapPin className="w-4 h-4 text-[#8C8F92]" />
        {getCity(project)}
      </p>
      <div className="flex flex-row flex-wrap gap-4 xl:gap-5 pt-1">
        <p className="text-[#464646] text-xs xl:text-base font-medium leading-5 tracking-[0.16px] flex items-center gap-1">
          <Home className="w-4 h-4 text-[#8C8F92]" />
          {getFloor(project)}
        </p>
        <p className="text-[#464646] text-xs xl:text-base font-medium leading-5 tracking-[0.16px] flex items-center gap-1">
          <Ruler className="w-4 h-4 text-[#8C8F92]" />
          {getPlot(project)}
        </p>
        <p className="text-[#464646] text-xs xl:text-base font-medium leading-5 tracking-[0.16px] flex items-center gap-1">
          <Compass className="w-4 h-4 text-[#8C8F92]" />
          {getFacing(project)}
        </p>
        <p className="text-[#464646] text-xs xl:text-base font-medium leading-5 tracking-[0.16px] flex items-center gap-1">
          <IndianRupee className="w-4 h-4 text-[#8C8F92]" />
          {getBudgetLabel(project)}
        </p>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-3 inline-flex items-center justify-center h-10 rounded-lg bg-[#FC7F11] text-white text-sm font-medium hover:bg-[#e8700e] transition-colors"
      >
        View details
      </button>
    </div>
  </div>
);

const Projects = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedFloors, setSelectedFloors] = useState([]);
  const [selectedPlots, setSelectedPlots] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await ProjectService.getAllProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const cityOptions = useMemo(() => Array.from(new Set(projects.map(getCity))).filter(Boolean).sort(), [projects]);
  const floorOptions = FLOOR_OPTIONS;
  const plotOptions = PLOT_OPTIONS;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const city = getCity(project);
      const floor = getFloor(project);
      const plot = getPlot(project);
      const cityOk = selectedCities.length === 0 || selectedCities.includes(city);
      const floorOk = selectedFloors.length === 0 || selectedFloors.includes(floor);
      const plotOk = selectedPlots.length === 0 || selectedPlots.includes(plot);
      return cityOk && floorOk && plotOk;
    });
  }, [projects, selectedCities, selectedFloors, selectedPlots]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pageItems = filteredProjects.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    if (safePage !== page) {
      setPage(safePage);
      setSearchParams({ page: String(safePage) });
    }
  }, [safePage, page, setSearchParams]);

  const toggle = (value, selected, setSelected) => {
    const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    setSelected(next);
    setSearchParams({ page: "1" });
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedCities([]);
    setSelectedFloors([]);
    setSelectedPlots([]);
    setSearchParams({ page: "1" });
    setPage(1);
  };

  const pageWindow = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3) return [1, 2, 3, 4, totalPages];
    if (safePage >= totalPages - 2) return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, safePage - 1, safePage, safePage + 1, totalPages];
  }, [safePage, totalPages]);

  return (
    <main className="bg-[#FCFCF7] flex flex-col items-center w-full">
      <Navbar />

      <section className="w-full bg-[#FCFCF7] flex flex-col items-center pt-24">
        <div className="flex flex-col items-start justify-start gap-5 px-4 py-10 w-full max-w-[768px] xl:max-w-[1440px] xl:p-20 xl:gap-10">
          <h1 className="text-[#030712] text-3xl text-left font-medium leading-10 tracking-[0.32px] xl:text-5xl">Project gallery</h1>

          <div className="w-full flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="text-xs text-[#FC7F11] font-medium xl:hidden flex items-center justify-center bg-[#FAF0DC] py-2 px-3 rounded-lg gap-1"
            >
              <Funnel className="w-3 h-3" />
              Filter
            </button>
          </div>

          <div className="flex justify-start xl:gap-10 items-start w-full">
            <div className="hidden xl:flex flex-col p-6 items-start bg-[#F6F5EF] rounded-xl w-[320px] gap-8">
              <span className="flex justify-between w-full items-center">
                <p className="text-[#262626] font-medium leading-8 tracking-[0.24px] text-xl">Filters</p>
                <button type="button" onClick={resetFilters} className="cursor-pointer hover:opacity-70 transition-opacity text-sm">
                  Reset
                </button>
              </span>
              <FilterSection title="Cities" options={cityOptions} selected={selectedCities} onToggle={(v) => toggle(v, selectedCities, setSelectedCities)} />
              <FilterSection title="Floors" options={floorOptions} selected={selectedFloors} onToggle={(v) => toggle(v, selectedFloors, setSelectedFloors)} />
              <FilterSection title="Plot dimensions" options={plotOptions} selected={selectedPlots} onToggle={(v) => toggle(v, selectedPlots, setSelectedPlots)} />
            </div>

            <div className="w-full">
              {loading ? (
                <div className="py-20 flex justify-center">
                  <Loader size="lg" />
                </div>
              ) : (
                <>
                  <div className="grid grid-col-1 justify-items-start gap-y-5 xl:grid-cols-2 xl:gap-y-10 xl:gap-x-10">
                    {pageItems.map((project) => (
                      <ProjectCard key={project._id} project={project} onOpen={() => navigate(`/projects/${project._id}`)} />
                    ))}
                  </div>

                  {pageItems.length === 0 && <div className="py-16 text-center text-[#70737A]">No projects found for selected filters.</div>}

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
                      {pageWindow.map((p, index) => {
                        const prev = pageWindow[index - 1];
                        const showGap = index > 0 && p - prev > 1;
                        return (
                          <div key={p} className="flex items-center gap-1">
                            {showGap && <span className="px-2 py-1 xl:px-3 xl:py-2 text-gray-500">...</span>}
                            <button
                              type="button"
                              onClick={() => setSearchParams({ page: String(p) })}
                              className={`px-2 py-1 xl:px-3 xl:py-2 text-sm xl:text-base font-medium border border-[#F1F1F1] ${
                                p === safePage ? "bg-[#FC7F11] text-white" : "text-[#262626] bg-white hover:bg-gray-50"
                              }`}
                            >
                              {p}
                            </button>
                          </div>
                        );
                      })}
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
          <button type="button" className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[90%] max-w-[360px] bg-[#FCFCF7] shadow-xl p-5 overflow-y-auto">
            <div className="flex justify-between w-full items-center">
              <p className="text-[#262626] font-medium text-xl">Filters</p>
              <button type="button" onClick={resetFilters} className="text-sm text-[#FC7F11]">
                Reset
              </button>
            </div>
            <div className="mt-5 space-y-3">
              <FilterSection title="Cities" options={cityOptions} selected={selectedCities} onToggle={(v) => toggle(v, selectedCities, setSelectedCities)} />
              <FilterSection title="Floors" options={floorOptions} selected={selectedFloors} onToggle={(v) => toggle(v, selectedFloors, setSelectedFloors)} />
              <FilterSection title="Plot dimensions" options={plotOptions} selected={selectedPlots} onToggle={(v) => toggle(v, selectedPlots, setSelectedPlots)} />
            </div>
            <button type="button" onClick={() => setMobileFiltersOpen(false)} className="mt-6 h-11 w-full rounded-lg bg-[#FC7F11] text-white font-medium">
              Apply filters
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;
