import React from "react";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* ================= HERO ================= */}
      <section
        className="h-screen bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Building Your Dream Home with Precision
          </h1>
          <p className="text-lg mb-6">
            Crafting spaces that inspire
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-700 transition">
              Get a Quote
            </button>
            <button className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition">
              Explore Plans
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-gray-100 py-16 text-center px-6">
        <h2 className="text-2xl font-semibold mb-4">
          About BuildCraft Homes
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 mb-10 text-sm">
          With over 10 years of experience, BuildCraft Homes is dedicated to delivering quality construction, on-time delivery, and modern designs.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold">Quality Construction</h3>
            <p className="text-sm text-gray-500 mt-2">
              We use the finest materials and craftsmanship.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold">On-Time Delivery</h3>
            <p className="text-sm text-gray-500 mt-2">
              Our projects are completed on schedule.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold">Modern Designs</h3>
            <p className="text-sm text-gray-500 mt-2">
              Our designs are cutting-edge and stylish.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-indigo-100 py-16 px-6">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Our Services
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Residential Construction",
              img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
            },
            {
              title: "Interior Design",
              img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
            },
            {
              title: "Renovation",
              img: "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d",
            },
            {
              title: "Architecture Planning",
              img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
            },
          ].map((service, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden shadow">
              <img
                src={service.img}
                alt={service.title}
                className="h-40 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-white text-sm font-semibold">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROJECT SHOWCASE ================= */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-center text-2xl font-semibold mb-8">
          Project Showcase
        </h2>

        <div className="flex justify-start gap-3 mb-8 max-w-6xl mx-auto">
          <button className="bg-indigo-600 text-white px-4 py-1 rounded">
            Villa
          </button>
          <button className="border px-4 py-1 rounded">
            Duplex
          </button>
          <button className="border px-4 py-1 rounded">
            Apartment
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Luxury Villa",
              img: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
            },
            {
              title: "Modern Duplex",
              img: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
            },
            {
              title: "City Apartment",
              img: "https://images.unsplash.com/photo-1600585154205-efc5a8d19b3e",
            },
          ].map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm">{project.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  A stunning property with premium features.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section className="bg-indigo-100 py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-10">
          Construction Plans
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-sm">2BHK Plan</h3>
            <p className="text-xs text-gray-500 mt-2">
              Starting at $150,000
            </p>
          </div>

          <div className="bg-indigo-600 text-white p-6 rounded shadow-lg scale-105">
            <h3 className="font-semibold text-sm">3BHK Plan</h3>
            <p className="text-xs mt-2">Starting at $200,000</p>
            <p className="text-xs mt-2">Most Popular</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-sm">Duplex Plan</h3>
            <p className="text-xs text-gray-500 mt-2">
              Starting at $300,000
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 text-center px-6">
        <h2 className="text-2xl font-semibold mb-10">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          <div>
            <h3 className="text-indigo-600 text-2xl font-bold">500+</h3>
            <p className="text-xs text-gray-500">Homes Built</p>
          </div>
          <div>
            <h3 className="text-indigo-600 text-2xl font-bold">10+</h3>
            <p className="text-xs text-gray-500">Years Experience</p>
          </div>
          <div>
            <h3 className="text-indigo-600 text-2xl font-bold">100%</h3>
            <p className="text-xs text-gray-500">Satisfaction</p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Testimonials
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {["Sarah Williams", "Mark Johnson", "Emily Chen"].map(
            (name, index) => (
              <div key={index} className="bg-white p-4 rounded shadow text-sm">
                <p>
                  "BuildCraft Homes exceeded our expectations with their attention to detail and quality work."
                </p>
                <p className="font-semibold mt-2">- {name}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-black text-white py-16 px-6">
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">

          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="Contact"
            className="rounded-lg"
          />

          <div>
            <h2 className="text-xl font-semibold mb-6">
              Contact Us
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 rounded bg-gray-800 text-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 rounded bg-gray-800 text-sm"
              />
              <textarea
                rows="3"
                placeholder="Your Message"
                className="w-full p-2 rounded bg-gray-800 text-sm"
              ></textarea>
              <button className="bg-indigo-600 px-4 py-2 rounded text-sm">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 text-center py-6 text-xs">
        © 2025 BuildCraft Homes. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;
