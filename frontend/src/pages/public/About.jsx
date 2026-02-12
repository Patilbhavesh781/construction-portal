import React from "react";

const About = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* ================= HERO ================= */}
      <section className="grid md:grid-cols-2 min-h-[80vh]">
        
        {/* LEFT */}
        <div className="flex flex-col justify-center px-16 bg-gray-100">
          <h1 className="text-4xl font-bold mb-4">
            Discover the <br /> creators of your
          </h1>
          <p className="text-gray-600">
            We’re dedicated to transforming spaces.
          </p>
        </div>

        {/* RIGHT */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="Hero"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* ================= OUR JOURNEY ================= */}
      <section className="py-20 text-center px-6">
        <h2 className="text-2xl font-semibold mb-4">
          Our Journey
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 mb-10">
          Started as a small team, we’ve evolved into a trusted partner in
          residential construction and design, helping homeowners realize their visions.
        </p>

        <div className="max-w-4xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="Journey"
            className="rounded-lg shadow"
          />
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="py-16 text-center bg-gray-100">
        <h2 className="text-2xl font-semibold mb-10">
          Our Achievements
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold">2023</h3>
            <p className="text-sm text-gray-500">Year Established</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-sm text-gray-500">Users Trust Design Hub</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">$50M</h3>
            <p className="text-sm text-gray-500">In Projects</p>
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Team</h2>
        <p className="text-gray-600 mb-10">
          Meet the minds behind our innovative designs
        </p>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            "Emma Johnson",
            "David Brown",
            "Sophia White",
            "James Smith",
            "Lucas Green",
            "Ava Taylor",
            "Mia Wilson",
            "Ethan Davis",
            "Alex Johnson",
            "Maria Gomez",
            "David Smith",
            "Emma Brown",
          ].map((name, index) => (
            <div key={index} className="text-center">
              <img
                src={`https://source.unsplash.com/300x300/?person,${index}`}
                alt={name}
                className="rounded-lg mb-3"
              />
              <h4 className="text-sm font-semibold">{name}</h4>
              <p className="text-xs text-gray-500">Team Member</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BLUE BANNER ================= */}
      <section className="bg-indigo-600 text-white py-20 px-16">
        <h2 className="text-3xl font-bold">
          Our team and <br /> partners
        </h2>
      </section>

      {/* ================= JOIN TEAM ================= */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Join our team
        </h2>

        <p className="text-gray-600 mb-10">
          We’re looking for passionate individuals to help shape beautiful homes.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Interior Designer",
            "Construction",
            "Design Engineer",
            "Quality Assurance",
            "Site Supervisor",
            "?",
          ].map((role, index) => (
            <div key={index} className="bg-white shadow p-8 rounded">
              <h3 className="font-semibold mb-3">{role}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Discover more
              </p>
              <button className="text-sm underline">
                Discover more
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LOCATIONS ================= */}
      <section className="py-20 text-center bg-gray-100 px-6">
        <h2 className="text-2xl font-semibold mb-4">
          Our locations
        </h2>

        <p className="text-gray-600 mb-10">
          Visit us to discuss your dream project in person!
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white shadow p-6 rounded">
            <h4 className="font-semibold">New York</h4>
            <p className="text-sm text-gray-500">
              123 Building Ave New York, NY 10001
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h4 className="font-semibold">Los Angeles</h4>
            <p className="text-sm text-gray-500">
              456 Design Blvd Los Angeles, CA 90001
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-black text-white text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">
          Start your project
        </h2>

        <p className="text-gray-400 mb-8">
          No obligation. Schedule your consultation today.
        </p>

        <div className="flex justify-center gap-6">
          <button className="bg-white text-black px-6 py-2 rounded">
            Get Started
          </button>
          <button className="border border-white px-6 py-2 rounded">
            Contact Support
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 text-center py-6 text-xs">
        © 2025 BuildCraft Homes. All rights reserved.
      </footer>

    </div>
  );
};

export default About;
