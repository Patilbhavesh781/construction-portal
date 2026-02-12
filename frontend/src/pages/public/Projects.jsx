import React from "react";

const Projects = () => {
  return (
    <div className="font-sans text-gray-900">

      {/* ================= HERO ================= */}
      <section className="bg-gray-100 px-16 py-20 grid md:grid-cols-2 items-center gap-10">

        {/* LEFT TEXT */}
        <div>
          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            LUXURY <br /> VILLA
          </h1>

          <p className="text-lg mb-6">
            Explore this stunning luxury villa with elegant finishes.
          </p>

          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="bg-black text-white px-3 py-1 rounded-full">
              View
            </span>
            <span className="bg-gray-300 px-3 py-1 rounded-full">
              Residential
            </span>
            <span>15 min read</span>
          </div>

          <button className="bg-black text-white px-6 py-2 rounded-md">
            See more
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-end">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
            alt="Luxury"
            className="rounded-[50%] w-[500px] h-[400px] object-cover"
          />
        </div>
      </section>

      {/* ================= PROJECT GRID ================= */}
      <section className="px-16 py-20 grid md:grid-cols-2 gap-10">

        {/* LEFT BIG CARD */}
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow">
          <img
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
            alt="Office"
            className="h-64 w-full object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              OFFICE SPACE DESIGN
            </h3>
            <div className="flex justify-between text-sm text-gray-600 mt-4">
              <span className="bg-black text-white px-3 py-1 rounded-full">
                Projects
              </span>
              <span>10 min read</span>
            </div>
          </div>
        </div>

        {/* RIGHT SMALL CARDS */}
        <div className="space-y-6">
          {[
            {
              title: "Elegant storefront",
              time: "8 min read",
              img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
            },
            {
              title: "Innovative design solutions",
              time: "12 min read",
              img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
            },
            {
              title: "Stunning homes built to last.",
              time: "9 min read",
              img: "https://images.unsplash.com/photo-1494526585095-c41746248156",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl flex overflow-hidden shadow"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-40 h-32 object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PORTFOLIO ICON ROW ================= */}
      <section className="px-16 py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-10">
          In our portfolio <br /> PROJECT
        </h2>

        <div className="flex flex-wrap justify-center gap-10 text-sm">
          {[
            "Residential",
            "Commercial",
            "Renovations",
            "Luxury Homes",
            "Modern",
            "Key Features",
            "Details",
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gray-300 w-16 h-16 rounded-lg mb-2"></div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section className="px-16 py-20">
        <h2 className="text-4xl font-bold mb-10">
          Projects <span className="font-extrabold">Featured</span>
        </h2>

        <div className="grid md:grid-cols-5 gap-6">
          {[
            "Elegant Urban Home",
            "Contemporary",
            "Chic Apartment",
            "Stunning Backyard",
            "Modern Kitchen",
          ].map((title, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl overflow-hidden shadow"
            >
              <img
                src={`https://source.unsplash.com/400x300/?home,${index}`}
                alt={title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-sm">{title}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Functional and stylish design.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STAY UPDATED ================= */}
      <section className="px-16 py-20 bg-gray-100 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600">
            Your dream home awaits
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 border p-2 rounded"
          />
          <button className="bg-black text-white px-6 rounded">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  );
};

export default Projects;
