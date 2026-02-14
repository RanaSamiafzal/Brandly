import React, { useState } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard,
  Search,
  FileText,
  Settings,
  Bell,
  LogOut,
  Shield,
  Users,
  BarChart,
  Menu,
  X,
  Plus
} from "lucide-react";
import { cn } from "./ui/utils";
import { NotificationPanel } from "./NotificationPanel";
function DashboardLayout({
  userRole,
  userName,
  userImage,
  notificationCount = 0,
  onLogout,
  children
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const brandNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Search, label: "Search Influencers", path: "/search" },
    { icon: FileText, label: "My Requests", path: "/requests" },
    { icon: Plus, label: "Create Campaign", path: "/create-campaign" },
    { icon: Settings, label: "Profile Settings", path: "/settings" }
  ];
  const influencerNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/influencer/dashboard" },
    { icon: FileText, label: "Collaboration Requests", path: "/requests" },
    { icon: Settings, label: "Edit Profile", path: "/profile" }
  ];
  const adminNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: BarChart, label: "Reports", path: "/admin/reports" },
    { icon: Settings, label: "Settings", path: "/admin/settings" }
  ];
  const navItems = userRole === "admin" ? adminNavItems : userRole === "brand" ? brandNavItems : influencerNavItems;
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-[#f9fafb]" }, /* @__PURE__ */ React.createElement("header", { className: "bg-white border-b border-[#e5e7eb] sticky top-0 z-40" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between px-6 py-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsSidebarOpen(!isSidebarOpen),
      className: "lg:hidden text-[#6b7280] hover:text-[#111827]"
    },
    isSidebarOpen ? /* @__PURE__ */ React.createElement(X, { className: "w-6 h-6" }) : /* @__PURE__ */ React.createElement(Menu, { className: "w-6 h-6" })
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(Shield, { className: "w-8 h-8 text-[#3b82f6]" }), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-[#111827]" }, userRole === "admin" ? "Admin Panel" : userRole === "brand" ? "Brand Dashboard" : "Influencer Dashboard"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsNotificationOpen(true),
      className: "relative p-2 text-[#6b7280] hover:text-[#111827]"
    },
    /* @__PURE__ */ React.createElement(Bell, { className: "w-6 h-6" }),
    notificationCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "absolute top-0 right-0 w-5 h-5 bg-[#ef4444] text-white text-xs rounded-full flex items-center justify-center" }, notificationCount)
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, userImage ? /* @__PURE__ */ React.createElement("img", { src: userImage, alt: userName, className: "w-10 h-10 rounded-full object-cover" }) : /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-semibold" }, userName.charAt(0).toUpperCase()), /* @__PURE__ */ React.createElement("span", { className: "hidden md:block text-sm font-medium text-[#111827]" }, userName))))), /* @__PURE__ */ React.createElement("div", { className: "flex" }, /* @__PURE__ */ React.createElement(
    "aside",
    {
      className: cn(
        "fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#e5e7eb] transform transition-transform lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        "top-[73px] lg:top-0"
      )
    },
    /* @__PURE__ */ React.createElement("nav", { className: "p-4 space-y-2" }, navItems.map((item) => {
      const Icon = item.icon;
      return /* @__PURE__ */ React.createElement(
        Link,
        {
          key: item.path,
          to: item.path,
          className: "flex items-center gap-3 px-4 py-3 text-[#6b7280] hover:bg-[#eff6ff] hover:text-[#3b82f6] rounded-lg transition-colors",
          onClick: () => setIsSidebarOpen(false)
        },
        /* @__PURE__ */ React.createElement(Icon, { className: "w-5 h-5" }),
        /* @__PURE__ */ React.createElement("span", null, item.label)
      );
    }), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onLogout,
        className: "w-full flex items-center gap-3 px-4 py-3 text-[#ef4444] hover:bg-[#fee2e2] rounded-lg transition-colors"
      },
      /* @__PURE__ */ React.createElement(LogOut, { className: "w-5 h-5" }),
      /* @__PURE__ */ React.createElement("span", null, "Logout")
    ))
  ), /* @__PURE__ */ React.createElement("main", { className: "flex-1 p-6 lg:p-8" }, children)), isSidebarOpen && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden",
      onClick: () => setIsSidebarOpen(false)
    }
  ), /* @__PURE__ */ React.createElement(
    NotificationPanel,
    {
      isOpen: isNotificationOpen,
      onClose: () => setIsNotificationOpen(false)
    }
  ));
}
export {
  DashboardLayout
};
