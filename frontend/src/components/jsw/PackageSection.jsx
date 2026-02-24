import { useState } from "react";

const packages = [
  {
    name: "Standard",
    price: 1499,
  },
  {
    name: "Premium",
    price: 1749,
  },
  {
    name: "Luxury",
    price: 2099,
  },
];

const sectionsList = [
  "Design",
  "Structure",
  "Flooring and dado",
  "Door and windows",
  "Plumbing accessories",
  "Painting",
  "Electrical",
  "Plumbing",
  "Railing and handrails",
];

export default function PackagesSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#F5F4EC] w-full py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-medium text-gray-900">
            Packages
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Discover the package that fits your needs.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Showing from <span className="text-orange-500 font-medium">Pune ›</span>
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {packages.map((pkg, pkgIndex) => (
            <div
              key={pkg.name}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              {/* Title */}
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                {pkg.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <p className="text-2xl font-semibold text-gray-900">
                  ₹ {pkg.price}
                </p>
                <p className="text-gray-400 text-sm">
                  per sq. ft (Ex GST)
                </p>
              </div>

              {/* Accordion Sections */}
              <div className="space-y-4">
                {sectionsList.map((section, sectionIndex) => {
                  const uniqueIndex = `${pkgIndex}-${sectionIndex}`;

                  return (
                    <div key={uniqueIndex} className="border-t pt-4">
                      <button
                        onClick={() =>
                          setOpenIndex(
                            openIndex === uniqueIndex ? null : uniqueIndex
                          )
                        }
                        className="w-full flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 text-xs">
                            {openIndex === uniqueIndex ? "-" : "+"}
                          </div>
                          <span className="text-gray-700 text-sm font-medium">
                            {section}
                          </span>
                        </div>
                      </button>

                      {openIndex === uniqueIndex && (
                        <div className="mt-3 pl-8 text-sm text-gray-500">
                          Details coming soon...
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center text-xs text-gray-500">
          The package pricing shown above is calculated on a considered Built-Up Area of 2500 Sqft.
          In case of change in Built-Up Area, the package pricing would change accordingly.
        </div>

      </div>
    </section>
  );
}