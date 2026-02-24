import React from "react";
import { Outlet } from "react-router-dom";

// Previous public layout wrappers (kept commented intentionally):
// import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";
// import ScrollReveal from "../components/animations/ScrollReveal";

const PublicLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
