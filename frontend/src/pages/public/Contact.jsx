import React from "react";

const Contact = () => {
  return (
    <div className="font-sans text-gray-900">

      {/* ================= HERO ================= */}
      <section
        className="h-[70vh] bg-cover bg-center relative flex items-center px-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-white">
          <h1 className="text-5xl font-bold mb-4">Contact Us.</h1>
          <p className="text-lg">
            Let’s Build Something Great Together
          </p>
        </div>
      </section>

      {/* ================= GET IN TOUCH ================= */}
      <section className="py-20 px-16 bg-gray-100 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            We’re here to help you with your construction needs. Our dedicated
            team is ready to assist you in making your dream home a reality.
          </p>

          <img
            src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
            alt="Office"
            className="rounded-xl shadow mb-6"
          />
        </div>

        {/* RIGHT IMAGES */}
        <div className="grid grid-cols-1 gap-6">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c"
            alt="Meeting"
            className="rounded-xl shadow"
          />
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="Discussion"
            className="rounded-xl shadow"
          />
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section
        className="relative py-20 text-center text-black"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>

        <div className="relative px-16">
          <h2 className="text-3xl font-bold mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Expertise in Construction
              </h3>
              <p className="text-sm text-gray-700">
                We prioritize your vision and work closely with you to ensure
                your project meets the highest standards of quality and craftsmanship.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">
                Client Focused
              </h3>
              <p className="text-sm text-gray-700">
                Our team is committed to providing excellent service and support
                throughout your construction journey.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">
                Quality Assurance
              </h3>
              <p className="text-sm text-gray-700">
                Utilizing the latest building technologies, we ensure your project
                is efficient and up to date with industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= AVAILABLE POSITIONS ================= */}
      <section className="py-20 px-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-10">
          Available Positions
        </h2>

        {[
          {
            title: "Project Manager",
            desc: "Lead projects from concept to completion, ensuring timelines and budgets are met.",
          },
          {
            title: "Site Supervisor",
            desc: "Oversee daily operations on-site, ensuring safety protocols are followed.",
          },
          {
            title: "Estimator",
            desc: "Analyze project costs and prepare detailed estimates.",
          },
        ].map((job, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-6 rounded-lg shadow mb-6"
          >
            <div>
              <h4 className="font-semibold">{job.title}</h4>
              <p className="text-sm text-gray-600 mt-2">
                {job.desc}
              </p>
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded">
              Apply
            </button>
          </div>
        ))}
      </section>

      {/* ================= CTA BANNER ================= */}
      <section
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-between px-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581090700227-4c4f50c30e3c')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <h2 className="relative text-white text-4xl font-bold">
          Need Assistance with Your Project?
        </h2>

        <button className="relative bg-blue-600 text-white px-6 py-3 rounded">
          Contact Us
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-200 py-10 px-16 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <p>Connecting since 2021</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Contact</p>
          <p>Blog</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Testimonials</h4>
          <p>FAQs</p>
          <p>Join Our Team</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </footer>

    </div>
  );
};

export default Contact;
