import React from "react";
import { Outlet } from "react-router-dom";
import { Menu, ShieldCheck } from "lucide-react";

import AdminSidebar from "../components/dashboard/AdminSidebar";
import Button from "../components/common/Button";
import FadeIn from "../components/animations/FadeIn";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <h1 className="text-lg font-semibold text-gray-800">
                Admin Dashboard
              </h1>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <FadeIn>
            <Outlet />
          </FadeIn>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
