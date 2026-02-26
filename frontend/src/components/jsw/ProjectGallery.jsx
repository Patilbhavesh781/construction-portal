import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectService from "@/services/project.service";
import apartment1 from "@/assets/Apartment1.jpeg";
import apartment2 from "@/assets/Apartment2.jpeg";
import apartment3 from "@/assets/Apartment3.jpeg";
import apartment4 from "@/assets/Apartment4.jpeg";
import apartment5 from "@/assets/Apartment5.jpeg";

const fallbackProjects = [
  {
    id: 1,
    title: "Vishwanathan's Residence",
    description:
      "It is a modern, minimal, thoughtfully designed home that blends practicality and style.",
    image: apartment1,
  },
  {
    id: 2,
    title: "Melbin's Residence",
    description: "Open spaces, natural light, and a soft elegant vibe throughout the home.",
    image: apartment2,
  },
  {
    id: 3,
    title: "Gopinath's Residence",
    description: "Functional layout crafted for comfort and contemporary living.",
    image: apartment3,
  },
  {
    id: 4,
    title: "Haris's Residence",
    description: "A classy structure built with high-quality finishes and clean aesthetics.",
    image: apartment4,
  },
  {
    id: 5,
    title: "Harish's Residence",
    description: "Designed with care, attention to detail, and timeless architectural elements.",
    image: apartment5,
  },
];

const ProjectGallery = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectService.getAllProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch projects for home gallery:", error);
      }
    };

    fetchProjects();
  }, []);

  const displayProjects = useMemo(() => {
    if (projects.length === 0) {
      return fallbackProjects.map((p) => ({
        id: p.id,
        _id: null,
        title: p.title,
        description: p.description,
        image: p.image,
      }));
    }

    return projects.map((p, idx) => ({
      id: p._id || idx,
      _id: p._id || null,
      title: p.title || "Untitled project",
      description: p.shortDescription || p.description || "Project details coming soon.",
      image: p.images?.[0]?.url || p.images?.[0] || apartment3,
    }));
  }, [projects]);

  useEffect(() => {
    if (current >= displayProjects.length) {
      setCurrent(0);
    }
  }, [current, displayProjects.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? displayProjects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === displayProjects.length - 1 ? 0 : prev + 1));
  };

  const getIndex = (index) => {
    if (index < 0) return displayProjects.length - 1;
    if (index >= displayProjects.length) return 0;
    return index;
  };

  return (
    <section className="bg-[#F5F5EF] py-20 w-full">
      <div className="max-w-[1440px] mx-auto px-4 xl:px-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl xl:text-4xl font-semibold text-[#0B0F19]">Our project gallery</h2>
          <p className="text-[#6B7280] mt-4 text-sm xl:text-lg">
            Discover homes built with care, quality, and attention to detail.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="hidden xl:block absolute left-0 w-[18%] h-[450px] opacity-60">
            <img
              src={displayProjects[getIndex(current - 1)].image}
              className="w-full h-full object-cover rounded-xl"
              alt=""
            />
          </div>

          <div className="relative w-full xl:w-[60%] h-[350px] xl:h-[500px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500">
            <img
              src={displayProjects[current].image}
              alt={displayProjects[current].title}
              className="w-full h-full object-cover"
            />

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white w-11 h-11 rounded-full shadow-md flex items-center justify-center text-xl"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white w-11 h-11 rounded-full shadow-md flex items-center justify-center text-xl"
            >
              ›
            </button>
          </div>

          <div className="hidden xl:block absolute right-0 w-[18%] h-[450px] opacity-60">
            <img
              src={displayProjects[getIndex(current + 1)].image}
              className="w-full h-full object-cover rounded-xl"
              alt=""
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <span className="text-4xl text-gray-400">"</span>
        </div>

        <div className="text-center mt-4 max-w-3xl mx-auto">
          <p className="text-[#4B5563] text-sm xl:text-lg leading-relaxed">
            {displayProjects[current].description}
          </p>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {displayProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? "w-8 bg-black" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="border border-black px-10 py-3 rounded-lg hover:bg-black hover:text-white transition-all duration-300"
            onClick={() =>
              displayProjects[current]?._id
                ? navigate(`/projects/${displayProjects[current]._id}`)
                : navigate("/projects")
            }
          >
            Explore more projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
