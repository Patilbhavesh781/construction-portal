import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth"; // Optional: if using context for auth

// React 18 root rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Wrap with AuthProvider if using context for global auth state */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
