import React, { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card } from "../components/Cards";
import { Select } from "../components/FormComponents";
import { InfluButton } from "../components/InfluButton";
import { StatusBadge } from "../components/StatusBadge";
import { Search, UserPlus, MoreVertical, Ban, CheckCircle, Trash2, Mail } from "lucide-react";
function AdminUsers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeMenu, setActiveMenu] = useState(null);
  const users = [
    {
      id: "1",
      name: "BravoTech",
      email: "contact@bravotech.com",
      role: "brand",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      campaigns: 8
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "influencer",
      status: "active",
      joinDate: "2024-02-10",
      lastActive: "1 day ago",
      followers: 125e3
    },
    {
      id: "3",
      name: "TechCorp",
      email: "hello@techcorp.com",
      role: "brand",
      status: "pending",
      joinDate: "2024-02-08",
      lastActive: "3 hours ago",
      campaigns: 0
    },
    {
      id: "4",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      role: "influencer",
      status: "active",
      joinDate: "2024-01-20",
      lastActive: "5 hours ago",
      followers: 89e3
    },
    {
      id: "5",
      name: "FashionHub",
      email: "team@fashionhub.com",
      role: "brand",
      status: "suspended",
      joinDate: "2023-12-05",
      lastActive: "2 weeks ago",
      campaigns: 3
    },
    {
      id: "6",
      name: "Emma Davis",
      email: "emma.davis@email.com",
      role: "influencer",
      status: "pending",
      joinDate: "2024-02-09",
      lastActive: "1 hour ago",
      followers: 45e3
    }
  ];
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });
  const handleSuspendUser = (userId) => {
    console.log("Suspending user:", userId);
    setActiveMenu(null);
  };
  const handleActivateUser = (userId) => {
    console.log("Activating user:", userId);
    setActiveMenu(null);
  };
  const handleDeleteUser = (userId) => {
    console.log("Deleting user:", userId);
    setActiveMenu(null);
  };
  const handleSendEmail = (userId) => {
    console.log("Sending email to user:", userId);
    setActiveMenu(null);
  };
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: "admin",
      userName: "Admin",
      notificationCount: 5,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827]" }, "User Management"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Manage all users on the platform")), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary" }, /* @__PURE__ */ React.createElement(UserPlus, { className: "w-4 h-4 mr-2" }), "Add User")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        placeholder: "Search users...",
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        className: "w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
      }
    )), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "",
        value: roleFilter,
        onChange: (e) => setRoleFilter(e.target.value),
        options: [
          { value: "all", label: "All Roles" },
          { value: "brand", label: "Brands" },
          { value: "influencer", label: "Influencers" }
        ]
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "",
        value: statusFilter,
        onChange: (e) => setStatusFilter(e.target.value),
        options: [
          { value: "all", label: "All Status" },
          { value: "active", label: "Active" },
          { value: "pending", label: "Pending" },
          { value: "suspended", label: "Suspended" }
        ]
      }
    ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "User"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Role"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Stats"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Join Date"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Last Active"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Actions"))), /* @__PURE__ */ React.createElement("tbody", null, filteredUsers.map((user) => /* @__PURE__ */ React.createElement("tr", { key: user.id, className: "border-b border-[#f3f4f6] hover:bg-[#f9fafb]" }, /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-medium text-[#111827]" }, user.name), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-[#6b7280]" }, user.email))), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("span", { className: "capitalize text-[#111827]" }, user.role)), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement(
      StatusBadge,
      {
        status: user.status === "active" ? "accepted" : user.status === "pending" ? "pending" : "rejected"
      }
    )), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "text-sm text-[#6b7280]" }, user.role === "brand" ? `${user.campaigns} campaigns` : `${(user.followers || 0).toLocaleString()} followers`)), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-[#6b7280]" }, user.joinDate), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-[#6b7280]" }, user.lastActive), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setActiveMenu(activeMenu === user.id ? null : user.id),
        className: "p-1 hover:bg-[#f3f4f6] rounded"
      },
      /* @__PURE__ */ React.createElement(MoreVertical, { className: "w-5 h-5 text-[#6b7280]" })
    ), activeMenu === user.id && /* @__PURE__ */ React.createElement("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#e5e7eb] z-10" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleSendEmail(user.id),
        className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-[#111827] hover:bg-[#f3f4f6]"
      },
      /* @__PURE__ */ React.createElement(Mail, { className: "w-4 h-4" }),
      "Send Email"
    ), user.status === "suspended" ? /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleActivateUser(user.id),
        className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-[#10b981] hover:bg-[#f3f4f6]"
      },
      /* @__PURE__ */ React.createElement(CheckCircle, { className: "w-4 h-4" }),
      "Activate User"
    ) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleSuspendUser(user.id),
        className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-[#f59e0b] hover:bg-[#f3f4f6]"
      },
      /* @__PURE__ */ React.createElement(Ban, { className: "w-4 h-4" }),
      "Suspend User"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => handleDeleteUser(user.id),
        className: "w-full flex items-center gap-2 px-4 py-2 text-sm text-[#ef4444] hover:bg-[#f3f4f6]"
      },
      /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4" }),
      "Delete User"
    ))))))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pt-4 border-t border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Showing ", filteredUsers.length, " of ", users.length, " users"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm" }, "Previous"), /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm" }, "Next")))))
  );
}
export {
  AdminUsers
};
