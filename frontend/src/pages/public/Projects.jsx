import React from "react";

const projects = [
  {
    name: "Urban Living Estates",
    location: "Mumbai, India",
    type: "Residential Apartments",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=100",
  },
  {
    name: "Green Horizon",
    location: "Pune, India",
    type: "Integrated Township",
    image: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=100",
  },
  {
    name: "Sky Garden Residences",
    location: "Nashik, India",
    type: "Luxury Residences",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=100",
  },
  {
    name: "The Grand Atrium",
    location: "Bengaluru, India",
    type: "Premium Housing",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=100",
  },
];

const Projects = () => {
  return (
    <main className="bg-white w-full overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[60svh] flex items-center px-8 md:px-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100"
          alt="Projects"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative z-10 max-w-4xl">
          <span className="text-sm uppercase tracking-[0.4em] text-red-600 font-semibold">
            Projects
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mt-6 leading-tight">
            Crafted Spaces for <br />
            <span className="font-medium italic">Modern Living</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl">
            Discover thoughtfully designed residential developments built with
            quality, responsibility, and long-term value in mind.
          </p>
        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

          {projects.map((project, i) => (
            <div key={i} className="group">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-[420px] object-cover transform group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
              </div>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {project.location}
                </p>
                <h3 className="text-2xl font-light text-gray-900">
                  {project.name}
                </h3>
                <p className="mt-2 text-gray-600 text-lg">
                  {project.type}
                </p>

                <button className="mt-6 text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline">
                  View Project
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-40 px-8 md:px-24 bg-gray-900 text-white text-center">
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          Discover Your <br />
          <span className="font-medium italic">Next Home</span>
        </h2>
        <p className="mt-8 text-gray-400 text-lg">
          Explore residences designed for comfort, sustainability, and long-term value.
        </p>
        <button className="mt-12 px-12 py-4 border border-white uppercase tracking-widest hover:bg-white hover:text-gray-900 transition">
          Enquire Now
        </button>
      </section>

    </main>
  );
};

export default Projects;
