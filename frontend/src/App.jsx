import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // For notifications
import AppRoutes from "./routes/AppRoutes";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/animations.css";

/**
 * Root App Component
 * Wraps routes with Router and provides global utilities like notifications
 */
const App = () => {
  return (
    <Router>
      {/* Global notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
          },
        }}
      />

      {/* Main Routes */}
      <AppRoutes />
    </Router>
  );
};

export default App;
