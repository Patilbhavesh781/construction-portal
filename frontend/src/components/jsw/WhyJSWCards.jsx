import subHeroImage from "../../assets/hero-home.jpg"; // change if needed

const features = [
  {
    title: "Designs matching vision",
    description:
      "Functional layouts that are unique to your lifestyle.",
  },
  {
    title: "High-quality materials",
    description:
      "No compromises. Only certified-grade materials.",
  },
  {
    title: "Price transparency",
    description:
      "Clear pricing with no surprises, just peace of mind.",
  },
  {
    title: "On-time delivery",
    description:
      "From planning to handover, our turnkey model stays on schedule.",
  },
];

export default function WhyJSWCards() {
  return (
    <section className="bg-[#F6F5EF] w-full py-16">
      <div className="container mx-auto px-4 xl:px-20 flex flex-col xl:flex-row gap-12 items-center">
        
        {/* Image Side */}
        <div className="relative w-full xl:w-1/2 h-[400px] xl:h-[580px] rounded-xl overflow-hidden">
          <img
            src={subHeroImage}
            alt="Why JSW One Homes"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content Side */}
        <div className="w-full xl:w-1/2">
          <h2 className="text-3xl xl:text-4xl font-semibold text-[#030712] mb-4">
            Why JSW One Homes
          </h2>
          <p className="text-[#6B7280] text-base xl:text-lg mb-10 max-w-xl">
            You build your dream home once. Build it right with JSW One Homes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#FFFDF3] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#030712] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}