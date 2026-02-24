import { useState } from "react";
import heroImage from "@/assets/hero-home.jpg";

const projects = [
  {
    id: 1,
    title: "Vishwanathan’s Residence",
    description:
      "It’s a modern, minimal, thoughtfully designed home that blends practicality and style. This home keeps it classy with open spaces, natural light, and a soft, elegant vibe throughout.",
    image: heroImage,
  },
  {
    id: 2,
    title: "Melbin’s Residence",
    description:
      "Open spaces, natural light, and a soft elegant vibe throughout the home.",
    image: heroImage,
  },
  {
    id: 3,
    title: "Gopinath’s Residence",
    description:
      "Functional layout crafted for comfort and contemporary living.",
    image: heroImage,
  },
  {
    id: 4,
    title: "Haris’s Residence",
    description:
      "A classy structure built with high-quality finishes and clean aesthetics.",
    image: heroImage,
  },
  {
    id: 5,
    title: "Harish’s Residence",
    description:
      "Designed with care, attention to detail, and timeless architectural elements.",
    image: heroImage,
  },
];

const ProjectGallery = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  const getIndex = (index) => {
    if (index < 0) return projects.length - 1;
    if (index >= projects.length) return 0;
    return index;
  };

  return (
    <section className="bg-[#F5F5EF] py-20 w-full">
      <div className="max-w-[1440px] mx-auto px-4 xl:px-20">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl xl:text-4xl font-semibold text-[#0B0F19]">
            Our project gallery
          </h2>
          <p className="text-[#6B7280] mt-4 text-sm xl:text-lg">
            Discover homes built with care, quality, and attention to detail.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative flex items-center justify-center">

          {/* Left Preview Image */}
          <div className="hidden xl:block absolute left-0 w-[18%] h-[450px] opacity-60">
            <img
              src={projects[getIndex(current - 1)].image}
              className="w-full h-full object-cover rounded-xl"
              alt=""
            />
          </div>

          {/* Main Image */}
          <div className="relative w-full xl:w-[60%] h-[350px] xl:h-[500px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500">
            <img
              src={projects[current].image}
              alt={projects[current].title}
              className="w-full h-full object-cover"
            />

            {/* Arrows */}
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

          {/* Right Preview Image */}
          <div className="hidden xl:block absolute right-0 w-[18%] h-[450px] opacity-60">
            <img
              src={projects[getIndex(current + 1)].image}
              className="w-full h-full object-cover rounded-xl"
              alt=""
            />
          </div>
        </div>

        {/* Quote Icon */}
        <div className="flex justify-center mt-10">
          <span className="text-4xl text-gray-400">“</span>
        </div>

        {/* Description */}
        <div className="text-center mt-4 max-w-3xl mx-auto">
          <p className="text-[#4B5563] text-sm xl:text-lg leading-relaxed">
            {projects[current].description}
          </p>
        </div>

        {/* Slider Indicator (Pill Style) */}
        <div className="flex justify-center mt-8 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-black"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Explore Button */}
        <div className="flex justify-center mt-12">
          <button className="border border-black px-10 py-3 rounded-lg hover:bg-black hover:text-white transition-all duration-300">
            Explore more projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;