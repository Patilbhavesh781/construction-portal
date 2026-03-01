import { useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import apartment1 from "@/assets/Apartment1.jpeg";
import apartment2 from "@/assets/Apartment2.jpeg";
import apartment3 from "@/assets/Apartment3.jpeg";
import apartment4 from "@/assets/Apartment4.jpeg";

const centres = [
  {
    name: "Pune Centre",
    address:
      "",
    image: apartment1,
    map: "",
  },
  // {
  //   name: "Bengaluru Centre - 2",
  //   address:
  //     "2nd floor, No.18, Krishna Summit, Aswath Nagar, Marathahalli, Bengaluru - 560037",
  //   image: apartment2,
  //   map: "#",
  // },
  // {
  //   name: "Hyderabad Centre",
  //   address:
  //     "Kamala Towers, Near US Consulate, Begumpet, Hyderabad - 500003",
  //   image: apartment3,
  //   map: "#",
  // },
  // {
  //   name: "Bellary Centre",
  //   address: "1st floor, Infantry Road, Bellary - 583101",
  //   image: apartment4,
  //   map: "#",
  // },
];

export default function ExperienceCentres() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 340;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#F6F5EF] py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
            Our experience centres
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Visit our studio to connect with our team and begin your home-building journey with expert guidance.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {centres.map((centre, index) => (
              <div
                key={index}
                className="min-w-[280px] md:min-w-[300px] flex-shrink-0"
              >
                {/* Image */}
                <img
                  src={centre.image}
                  alt={centre.name}
                  className="rounded-xl w-full h-[190px] object-cover"
                />

                {/* Content */}
                <div className="mt-5 max-w-[85%]">
                  <h3 className="text-lg font-medium text-gray-900">
                    {centre.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {centre.address}
                  </p>

                  <a
                    href={centre.map}
                    className="inline-flex items-center gap-1 text-sm text-[#FC7F11] mt-3 font-medium"
                  >
                    {/* <MapPin size={14} />
                    Directions */}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white w-9 h-9 rounded-full items-center justify-center shadow"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white w-9 h-9 rounded-full items-center justify-center shadow"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 gap-2">
          <div className="w-6 h-2 bg-gray-400 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
    </section>
  );
}
