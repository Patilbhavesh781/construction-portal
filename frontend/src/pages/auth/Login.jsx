import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LoginForm from "../../components/forms/LoginForm";
import Button from "../../components/common/Button";
import Navbar from "../../components/common/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;
  const redirectTo =
    from && from !== "/" ? from : "/user/dashboard";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-24">
        <section className="relative min-h-[70svh] flex items-center px-8 md:px-24 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/40" />

          <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.4em] text-red-600 font-semibold">
                Login
              </span>
              <h1 className="text-5xl md:text-7xl font-light text-gray-900 mt-6 leading-tight">
                Welcome Back <br />
                <span className="font-medium italic">BuildPro</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-xl">
                Access your dashboard, manage bookings, and track your projects
                in one place.
              </p>
            </div>

            <div className="bg-white border border-gray-200 shadow-xl p-8 md:p-10">
              <LoginForm redirectTo={redirectTo} />

              <div className="mt-6">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
