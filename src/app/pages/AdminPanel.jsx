import React, { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardHeader } from "../components/Cards";
import { InfluButton } from "../components/InfluButton";
import { StatusBadge } from "../components/StatusBadge";
function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const pendingVerifications = [
    {
      name: "EcoBeauty Co",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      type: "Brand",
      industry: "Beauty",
      email: "contact@ecobeauty.com"
    },
    {
      name: "BravoTech",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      type: "Brand",
      industry: "Technology",
      email: "info@bravotech.com"
    },
    {
      name: "FakeFashion123",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      type: "Influencer",
      industry: "Fashion",
      email: "fake@fashion.com"
    }
  ];
  const stats = [
    { label: "Total Users", value: "1,234" },
    { label: "Pending Verifications", value: "23" },
    { label: "Active Campaigns", value: "156" },
    { label: "Reported Accounts", value: "8" }
  ];
  const handleVerify = (name) => {
    console.log("Verify:", name);
  };
  const handleReject = (name) => {
    console.log("Reject:", name);
  };
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: "admin",
      userName: "Admin",
      notificationCount: 5,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827] mb-2" }, "Admin Panel"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Manage users, verifications, and platform settings.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, stats.map((stat) => /* @__PURE__ */ React.createElement(Card, { key: stat.label }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("p", { className: "text-3xl font-bold text-[#111827] mb-1" }, stat.value), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, stat.label))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveTab("users"),
        className: `px-6 py-3 font-medium transition-colors relative ${activeTab === "users" ? "text-[#3b82f6]" : "text-[#6b7280] hover:text-[#111827]"}`
      },
      "Users",
      activeTab === "users" && /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" })
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveTab("reports"),
        className: `px-6 py-3 font-medium transition-colors relative ${activeTab === "reports" ? "text-[#3b82f6]" : "text-[#6b7280] hover:text-[#111827]"}`
      },
      "Reports",
      activeTab === "reports" && /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" })
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveTab("settings"),
        className: `px-6 py-3 font-medium transition-colors relative ${activeTab === "settings" ? "text-[#3b82f6]" : "text-[#6b7280] hover:text-[#111827]"}`
      },
      "Settings",
      activeTab === "settings" && /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" })
    ))), activeTab === "users" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Pending Brand Verifications" }), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 text-sm font-semibold text-[#6b7280]" }, "User"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 text-sm font-semibold text-[#6b7280]" }, "Type"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 text-sm font-semibold text-[#6b7280]" }, "Industry"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 text-sm font-semibold text-[#6b7280]" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "text-right py-3 px-4 text-sm font-semibold text-[#6b7280]" }, "Actions"))), /* @__PURE__ */ React.createElement("tbody", null, pendingVerifications.map((user, index) => /* @__PURE__ */ React.createElement("tr", { key: index, className: "border-b border-[#e5e7eb] hover:bg-[#f9fafb]" }, /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: user.image,
        alt: user.name,
        className: "w-10 h-10 rounded-full object-cover"
      }
    ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, user.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, user.email)))), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-[#6b7280]" }, user.type), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4 text-[#6b7280]" }, user.industry), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement(StatusBadge, { status: "pending" })), /* @__PURE__ */ React.createElement("td", { className: "py-4 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-end gap-2" }, /* @__PURE__ */ React.createElement(
      InfluButton,
      {
        variant: "success",
        size: "sm",
        onClick: () => handleVerify(user.name)
      },
      "Verify"
    ), /* @__PURE__ */ React.createElement(
      InfluButton,
      {
        variant: "danger",
        size: "sm",
        onClick: () => handleReject(user.name)
      },
      "Reject"
    ))))))))), activeTab === "reports" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Reported Accounts" }), /* @__PURE__ */ React.createElement("div", { className: "text-center py-12" }, /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "No reports to review at this time."))), activeTab === "settings" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Platform Settings" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Email Notifications"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Send system notifications to users")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "sr-only peer", defaultChecked: true }), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Auto-Verify Influencers"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Automatically verify influencers with verified badges on social platforms")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "sr-only peer" }), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" }))))))
  );
}
export {
  AdminPanel
};
