import React from "react";

const About = () => {
  return (
    <main className="bg-white w-full overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[70svh] flex items-center px-8 md:px-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100"
          alt="Premium Homes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="relative z-10 max-w-4xl">
          <span className="text-sm uppercase tracking-[0.4em] text-red-600 font-semibold">
            About Us
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mt-6 leading-tight">
            Building Homes That <br />
            <span className="font-medium italic">Stand the Test of Time</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl">
            We create thoughtfully planned residential developments rooted in
            quality, responsibility, and long-term value.
          </p>
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section className="py-32 px-8 md:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Our Philosophy
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Our approach goes beyond construction. Every project is guided by
              responsible planning, intelligent design, and a focus on enhancing
              everyday living experiences.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=100"
            alt="Design Philosophy"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </section>

      {/* ================= LEGACY ================= */}
      <section className="py-32 px-8 md:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=100"
            alt="Residential Development"
            className="w-full h-[420px] object-cover"
          />

          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              A Legacy of Trust
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12">
              Over the years, our developments have earned the trust of thousands
              of families through consistent delivery, transparency, and
              uncompromising quality standards.
            </p>

            <div className="grid grid-cols-2 gap-10">
              {[
                { label: "Years of Experience", value: "25+" },
                { label: "Homes Delivered", value: "10,000+" },
                { label: "Cities", value: "12" },
                { label: "Sq. Ft. Developed", value: "45 Mn+" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-light text-red-600">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESIGN & SUSTAINABILITY ================= */}
      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <img
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=100"
            alt="Sustainable Design"
            className="w-full h-[420px] object-cover"
          />

          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Designed With Responsibility
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Sustainability is embedded into every phase of development — from
              site planning and material selection to energy-efficient systems
              and long-term environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-32 px-8 md:px-24 bg-gray-50 text-center">
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-20">
          Our Core Values
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
          {[
            {
              title: "Integrity",
              desc: "Transparent processes and ethical practices at every stage.",
            },
            {
              title: "Quality",
              desc: "Superior materials, precision execution, and lasting value.",
            },
            {
              title: "Responsibility",
              desc: "Building communities that respect people and the planet.",
            },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-40 px-8 md:px-24 text-center bg-gray-900 text-white">
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          Shaping the Future of <br />
          <span className="font-medium italic">Urban Living</span>
        </h2>
        <p className="mt-8 text-gray-400 text-lg">
          Discover homes designed for modern lifestyles and long-term value.
        </p>
        <button className="mt-12 px-12 py-4 border border-white uppercase tracking-widest hover:bg-white hover:text-gray-900 transition">
          Explore Our Projects
        </button>
      </section>

    </main>
  );
};

export default About;
