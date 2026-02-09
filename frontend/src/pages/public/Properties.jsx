import React, { useEffect, useMemo, useState, Suspense } from "react";
import { Search, MapPin, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import Loader from "../../components/common/Loader";
import PropertyService from "../../services/property.service";

function Property360Preview({ imageUrl }) {
  const texture = useLoader(
    THREE.TextureLoader,
    imageUrl ||
      "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=2070"
  );

  return (
    <mesh>
      <sphereGeometry args={[5, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview3D, setPreview3D] = useState(null);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await PropertyService.getAllProperties();
        setProperties(res || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.location?.city?.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "all" || p.purpose === type;
      const matchesCategory = category === "all" || p.type === category;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [properties, search, type, category]);

  return (
    <main className="bg-white w-full overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-[60svh] flex items-center px-8 md:px-24 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-35">
          <Canvas camera={{ position: [0, 0, 0.1] }}>
            <Suspense fallback={null}>
              <Property360Preview />
              <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-white/40" />

        <div className="relative z-10 max-w-4xl">
          <span className="text-sm uppercase tracking-[0.4em] text-red-600 font-semibold">
            Properties
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mt-6 leading-tight">
            Explore Homes <br />
            <span className="font-medium italic">Built for Modern Living</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl">
            Browse curated properties for sale or rent with reliable
            documentation and verified listings.
          </p>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="py-20 px-8 md:px-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search city or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["all", "sale", "rent"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold border ${
                  type === t
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-red-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 flex flex-wrap gap-3">
          {["all", "apartment", "villa", "plot", "commercial"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold border ${
                category === c
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ================= PROPERTIES GRID ================= */}
      <section className="py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : filteredProperties.length === 0 ? (
            <p className="text-gray-600 text-center">
              No properties found for this filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {filteredProperties.map((property) => {
                const imageUrl =
                  property.images?.[0]?.url ||
                  property.images?.[0] ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100";

                return (
                  <div key={property._id} className="group">
                    <div className="relative overflow-hidden h-[420px]">
                      {preview3D === property._id ? (
                        <div className="h-full w-full bg-black">
                          <Canvas camera={{ position: [0, 0, 0.1] }}>
                            <Suspense fallback={null}>
                              <Property360Preview imageUrl={imageUrl} />
                              <OrbitControls enableZoom={false} />
                            </Suspense>
                          </Canvas>
                          <button
                            onClick={() => setPreview3D(null)}
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition"
                          >
                            Close
                          </button>
                        </div>
                      ) : (
                        <>
                          <img
                            src={imageUrl}
                            alt={property.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                          <button
                            onClick={() => setPreview3D(property._id)}
                            className="absolute bottom-4 right-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition"
                          >
                            <Globe size={14} /> 360 View
                          </button>
                        </>
                      )}
                    </div>

                    <div className="mt-8">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                        {property.purpose || "sale"}
                      </p>
                      <h3 className="text-2xl font-light text-gray-900">
                        {property.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-gray-600 text-lg">
                        <MapPin className="w-4 h-4" />
                        <span>{property.location?.city}</span>
                      </div>
                      <p className="mt-2 text-gray-600 text-lg">
                        ₹{property.price?.toLocaleString()}
                      </p>

                      <button
                        className="mt-6 text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline"
                        onClick={() =>
                          navigate(`/properties/${property._id}`)
                        }
                      >
                        View Property
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-40 px-8 md:px-24 bg-gray-900 text-white text-center">
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          Find Your <br />
          <span className="font-medium italic">Next Address</span>
        </h2>
        <p className="mt-8 text-gray-400 text-lg">
          Connect with our team to list or book a property visit.
        </p>
        <button className="mt-12 px-12 py-4 border border-white uppercase tracking-widest hover:bg-white hover:text-gray-900 transition">
          Enquire Now
        </button>
      </section>
    </main>
  );
};

export default Properties;
