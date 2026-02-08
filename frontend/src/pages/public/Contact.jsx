import React from "react";

const Contact = () => {
  return (
    <main className="bg-white w-full overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[60svh] flex items-center px-8 md:px-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=100"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative z-10 max-w-4xl">
          <span className="text-sm uppercase tracking-[0.4em] text-red-600 font-semibold">
            Contact
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mt-6 leading-tight">
            Let’s Start a <br />
            <span className="font-medium italic">Conversation</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl">
            Whether you’re exploring a new home or need more information,
            our team is here to help.
          </p>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">

          {/* LEFT: INFO */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Reach Out to Us
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
              Our sales and support teams are available to guide you through
              every step of your home-buying journey.
            </p>

            <div className="space-y-8 text-gray-700">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                  Corporate Office
                </p>
                <p className="text-lg">
                  JSW Homes Experience Centre <br />
                  Mumbai, Maharashtra, India
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                  Phone
                </p>
                <p className="text-lg">+91 98765 43210</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                  Email
                </p>
                <p className="text-lg">sales@jswhomes.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-gray-50 p-10 md:p-14">
            <h3 className="text-2xl font-light text-gray-900 mb-8">
              Send Us a Message
            </h3>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border-b border-gray-300 bg-transparent py-3 outline-none focus:border-gray-900 transition"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border-b border-gray-300 bg-transparent py-3 outline-none focus:border-gray-900 transition"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border-b border-gray-300 bg-transparent py-3 outline-none focus:border-gray-900 transition"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border-b border-gray-300 bg-transparent py-3 outline-none focus:border-gray-900 transition resize-none"
              />

              <button
                type="submit"
                className="mt-8 px-12 py-4 border border-gray-900 uppercase tracking-widest hover:bg-gray-900 hover:text-white transition"
              >
                Submit Enquiry
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ================= MAP / CTA ================= */}
      <section className="py-40 px-8 md:px-24 bg-gray-900 text-white text-center">
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          Experience Our Homes <br />
          <span className="font-medium italic">In Person</span>
        </h2>
        <p className="mt-8 text-gray-400 text-lg">
          Visit one of our experience centres to explore our developments.
        </p>
        <button className="mt-12 px-12 py-4 border border-white uppercase tracking-widest hover:bg-white hover:text-gray-900 transition">
          Book a Site Visit
        </button>
      </section>

    </main>
  );
};

export default Contact;
