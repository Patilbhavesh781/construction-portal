import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import PropertyCard from "../../components/cards/PropertyCard";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import PropertyService from "../../services/property.service";

const Properties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all"); // sale | rent
  const [category, setCategory] = useState("all"); // residential | commercial
  const [priceRange, setPriceRange] = useState("all"); // all | <50L | 50L-1Cr | >1Cr

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await PropertyService.getAllProperties();
        setProperties(res || []);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title?.toLowerCase().includes(search.toLowerCase()) ||
        property.location?.city
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        property.location?.address
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "all" || property.purpose === type;

      const matchesCategory =
        category === "all" || property.type === category;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-50l" && property.price < 5000000) ||
        (priceRange === "50l-1cr" &&
          property.price >= 5000000 &&
          property.price <= 10000000) ||
        (priceRange === "above-1cr" && property.price > 10000000);

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesPrice
      );
    });
  }, [properties, search, type, category, priceRange]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Properties
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Buy, sell, or rent residential and commercial properties with
              confidence and transparency.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setType("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                type === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setType("sale")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                type === "sale"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setType("rent")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                type === "rent"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              For Rent
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setCategory("apartment")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "apartment"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Apartment
            </button>
            <button
              onClick={() => setCategory("house")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "house"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              House
            </button>
            <button
              onClick={() => setCategory("villa")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "villa"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Villa
            </button>
            <button
              onClick={() => setCategory("commercial")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "commercial"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Commercial
            </button>
            <button
              onClick={() => setCategory("land")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "land"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Land
            </button>
            <button
              onClick={() => setCategory("office")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === "office"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Office
            </button>
          </div>

          {/* Price Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPriceRange("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                priceRange === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Prices
            </button>
            <button
              onClick={() => setPriceRange("under-50l")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                priceRange === "under-50l"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Under ₹50L
            </button>
            <button
              onClick={() => setPriceRange("50l-1cr")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                priceRange === "50l-1cr"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ₹50L - ₹1Cr
            </button>
            <button
              onClick={() => setPriceRange("above-1cr")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                priceRange === "above-1cr"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Above ₹1Cr
            </button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">
                No properties found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setType("all");
                  setCategory("all");
                  setPriceRange("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <ScrollReveal key={property._id}>
                  <PropertyCard property={property} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Looking to Buy, Sell, or Rent a Property?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Our experts are here to help you find the perfect property or get
              the best deal.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                size="lg"
                onClick={() => navigate("/contact")}
              >
                Contact Our Experts
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/services")}
              >
                Explore Services
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Properties;
