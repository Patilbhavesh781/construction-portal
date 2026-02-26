import { useState } from "react";
import formBackground from "@/assets/Apartment7.jpeg";

export default function ContactCTASection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "Pune",
    timeline: "3-6 months",
    ownPlot: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <section className="relative w-full py-20 flex justify-center">

      {/* Background Image */}
      <img
        src={formBackground}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-6xl px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
            You Dream. We Deliver.
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Ready to build your dream home? Schedule a free consultation to start your journey today.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 max-w-4xl mx-auto">
          <form className="space-y-6">

            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7F11]"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7F11]"
                required
              />
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7F11]"
                required
              />

              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7F11]"
              >
                <option>Pune</option>
                <option>Bengaluru</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-6">

              <select
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7F11]"
              >
                <option>0-3 months</option>
                <option>3-6 months</option>
                <option>More than 6 months</option>
                <option>Not sure</option>
              </select>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  Do you own a plot?
                </span>

                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="ownPlot"
                    value="Yes"
                    onChange={handleChange}
                    className="accent-[#FC7F11]"
                  />
                  Yes
                </label>

                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="ownPlot"
                    value="No"
                    onChange={handleChange}
                    className="accent-[#FC7F11]"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                onChange={handleChange}
                className="mt-1 accent-[#FC7F11]"
                required
              />
              <p>
                I agree to{" "}
                <span className="text-[#FC7F11]">Privacy Policy</span> and{" "}
                <span className="text-[#FC7F11]">
                  Terms & Conditions
                </span>
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-[#FC7F11] hover:bg-[#e46f0f] text-white font-medium px-12 py-3 rounded-lg transition"
              >
                Book a meeting
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
