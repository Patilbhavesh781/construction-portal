import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import apartment4 from "@/assets/Apartment4.jpeg";
import apartment5 from "@/assets/Apartment5.jpeg";
import apartment6 from "@/assets/Apartment6.jpeg";
import apartment7 from "@/assets/Apartment7.jpeg";

const testimonials = [
  {
    name: "Mr. Gururaj Naik",
    text: "BuildPro’s expert team guided me at every step. Their quality gave me total confidence throughout the journey.",
    image: apartment4,
  },
  {
    name: "Mr. Hariharasudan",
    text: "BuildPro exceeded our expectations! The construction quality and timely delivery were remarkable. Truly a dream home.",
    image: apartment5,
  },
  {
    name: "Mr. Suryanarayanan",
    text: "Most people struggle with delays or contractors. BuildPro made my journey smooth and hassle-free.",
    image: apartment6,
  },
  {
    name: "Mr. Santosh",
    text: "With BuildPro, we didn’t just build a home - we gained trust, care, and peace of mind.",
    image: apartment7,
  },
];

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));

  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-[#FCFCF7] py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Happy customers, real stories
          </h2>
          <p className="text-gray-500 mt-3">
            Don’t believe us? See what our customers have to say.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6 transition-all duration-500">
            {testimonials
              .slice(current, current + 3)
              .concat(
                current + 3 > testimonials.length
                  ? testimonials.slice(0, (current + 3) % testimonials.length)
                  : []
              )
              .map((item, index) => (
                <div
                  key={index}
                  className="relative h-[420px] rounded-xl overflow-hidden shadow-md"
                >
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm text-white p-6 flex flex-col items-center text-center">
                    <Quote className="w-6 h-6 mb-3 opacity-80" />
                    <p className="text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                    <p className="mt-3 font-medium">{item.name}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow items-center justify-center"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow items-center justify-center"
          >
            <ChevronRight />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "bg-black w-6" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-10">
          <button className="border-2 border-black px-10 py-3 rounded-xl font-medium hover:bg-black hover:text-white transition">
            View more
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
