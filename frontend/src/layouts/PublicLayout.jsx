import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollReveal from "../components/animations/ScrollReveal";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <ScrollReveal>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
