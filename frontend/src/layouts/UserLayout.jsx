import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import UserSidebar from "../components/dashboard/UserSidebar";
import Button from "../components/common/Button";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen overflow-hidden flex bg-white">
      {/* Sidebar */}
      <UserSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-red-600 font-semibold">
                User Area
              </p>
              <h1 className="text-lg md:text-xl font-light text-gray-900">
                Client Dashboard
              </h1>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
