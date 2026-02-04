import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import UserSidebar from "../components/dashboard/UserSidebar";
import Button from "../components/common/Button";
import FadeIn from "../components/animations/FadeIn";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <UserSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
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
            <h1 className="text-lg font-semibold text-gray-800">
              User Dashboard
            </h1>
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

export default UserLayout;
