import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/config/db.js";
import Service from "../src/models/Service.model.js";
import User from "../src/models/User.model.js";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const services = [
  {
    title: "Bricks & Plaster Work",
    shortDescription: "Strong walls, perfect finish.",
    description:
      "Complete brickwork and plastering for homes and commercial sites with precise alignment, bonding, and smooth finishing.",
    category: "construction",
    price: 1200,
    priceType: "per_sqft",
    features: ["Quality bricks", "Even plaster finish", "Site supervision"],
  },
  {
    title: "Plumbing Work",
    shortDescription: "Reliable piping and fittings.",
    description:
      "Fresh and repair plumbing with premium fittings, leak tests, and clean routing for kitchens, bathrooms, and utility areas.",
    category: "construction",
    price: 1500,
    priceType: "fixed",
    features: ["Leak testing", "Branded fittings", "Clean routing"],
  },
  {
    title: "Waterproofing Work",
    shortDescription: "Keep walls and roofs leak-free.",
    description:
      "Terrace, bathroom, and exterior waterproofing with chemical coating, membrane application, and warranty options.",
    category: "construction",
    price: 1800,
    priceType: "fixed",
    features: ["Terrace treatment", "Bathroom sealing", "Warranty options"],
  },
  {
    title: "Gypsum Work",
    shortDescription: "Modern ceilings and partitions.",
    description:
      "False ceilings, gypsum partitions, and decorative designs with clean edges and premium boards.",
    category: "interior",
    price: 900,
    priceType: "per_sqft",
    features: ["False ceilings", "Partitions", "Designer options"],
  },
  {
    title: "Painting Work",
    shortDescription: "Interior and exterior finishes.",
    description:
      "Premium interior/exterior painting with surface prep, primer, texture, and long-lasting finish.",
    category: "construction",
    price: 800,
    priceType: "per_sqft",
    features: ["Surface prep", "Texture options", "Premium paint brands"],
  },
  {
    title: "Electrical Work",
    shortDescription: "Safe wiring and fixtures.",
    description:
      "Complete electrical setup, rewiring, earthing, and fixtures installation compliant with safety standards.",
    category: "construction",
    price: 2000,
    priceType: "fixed",
    features: ["Safety compliance", "Earthing", "Fixture install"],
  },
  {
    title: "Fabrication Work",
    shortDescription: "Metal structures and gates.",
    description:
      "Steel fabrication for gates, railings, sheds, and custom structures with finishing and paint.",
    category: "construction",
    price: 2500,
    priceType: "fixed",
    features: ["Custom designs", "Quality welding", "Anti-rust coating"],
  },
  {
    title: "Tile Work",
    shortDescription: "Floor and wall tiling.",
    description:
      "Precision tile laying for floors and walls with leveling, grout finishing, and pattern alignment.",
    category: "construction",
    price: 1100,
    priceType: "per_sqft",
    features: ["Leveling", "Clean grout", "Pattern alignment"],
  },
  {
    title: "Door & Window Work",
    shortDescription: "Installation and fitting.",
    description:
      "Wooden/UPVC/aluminum door and window installation with accurate fitting and finishing.",
    category: "construction",
    price: 2200,
    priceType: "fixed",
    features: ["Accurate fitting", "Multiple materials", "Finishing"],
  },
  {
    title: "Lock & Key Work",
    shortDescription: "Secure access solutions.",
    description:
      "New lock installation, replacement, and access solutions for homes and offices.",
    category: "construction",
    price: 700,
    priceType: "fixed",
    features: ["Replacement locks", "Secure fittings", "Quick service"],
  },
  {
    title: "Renovation Work",
    shortDescription: "Upgrade your existing space.",
    description:
      "End-to-end renovation planning and execution for homes, offices, and commercial spaces.",
    category: "renovation",
    price: 5000,
    priceType: "custom",
    features: ["Space planning", "Material selection", "On-time delivery"],
  },
  {
    title: "Interior Design Work",
    shortDescription: "Functional and stylish interiors.",
    description:
      "Complete interior design for living rooms, kitchens, bedrooms, and offices with 3D planning.",
    category: "interior",
    price: 6500,
    priceType: "custom",
    features: ["3D concepts", "Custom furniture", "Lighting design"],
  },
  {
    title: "Architecture Planning & RCC Work",
    shortDescription: "Plan and build strong structures.",
    description:
      "Architectural planning, structural drawings, and RCC execution for safe and efficient builds.",
    category: "architecture",
    price: 8000,
    priceType: "custom",
    features: ["Structural drawings", "RCC execution", "Site supervision"],
  },
  {
    title: "Property Buying & Selling",
    shortDescription: "Trusted property advisory.",
    description:
      "Residential and commercial property buying, selling, and verification with transparent support.",
    category: "real-estate",
    price: 0,
    priceType: "custom",
    features: ["Verified listings", "Site visits", "Documentation support"],
  },
];

const seedServices = async () => {
  await connectDB();

  const admin =
    (await User.findOne({ role: "admin" }).select("_id")) || null;
  if (!admin) {
    throw new Error("Admin user not found. Create admin first.");
  }

  for (const service of services) {
    await Service.findOneAndUpdate(
      { title: service.title },
      {
        ...service,
        slug: slugify(service.title),
        createdBy: admin._id,
        isActive: true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`Seeded ${services.length} services.`);
};

seedServices()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed to seed services:", err.message);
    process.exit(1);
  });
