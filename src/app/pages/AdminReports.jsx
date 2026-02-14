import React, { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardHeader } from "../components/Cards";
import { Select } from "../components/FormComponents";
import { InfluButton } from "../components/InfluButton";
import { Download, TrendingUp, Users, DollarSign, Target } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
function AdminReports() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("month");
  const userGrowthData = [
    { month: "Jan", brands: 45, influencers: 89 },
    { month: "Feb", brands: 52, influencers: 112 },
    { month: "Mar", brands: 61, influencers: 145 },
    { month: "Apr", brands: 78, influencers: 178 },
    { month: "May", brands: 95, influencers: 210 },
    { month: "Jun", brands: 115, influencers: 256 }
  ];
  const campaignData = [
    { month: "Jan", completed: 34, active: 12, pending: 8 },
    { month: "Feb", completed: 41, active: 15, pending: 6 },
    { month: "Mar", completed: 52, active: 18, pending: 10 },
    { month: "Apr", completed: 68, active: 22, pending: 7 },
    { month: "May", completed: 79, active: 25, pending: 9 },
    { month: "Jun", completed: 91, active: 28, pending: 11 }
  ];
  const revenueData = [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 15800 },
    { month: "Mar", revenue: 18200 },
    { month: "Apr", revenue: 22400 },
    { month: "May", revenue: 26700 },
    { month: "Jun", revenue: 31200 }
  ];
  const categoryDistribution = [
    { name: "Fashion", value: 35 },
    { name: "Technology", value: 28 },
    { name: "Beauty", value: 18 },
    { name: "Fitness", value: 12 },
    { name: "Other", value: 7 }
  ];
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  const stats = [
    {
      title: "Total Revenue",
      value: "$126,800",
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-[#10b981]"
    },
    {
      title: "Total Users",
      value: "1,245",
      change: "+18.2%",
      icon: Users,
      color: "bg-[#3b82f6]"
    },
    {
      title: "Active Campaigns",
      value: "89",
      change: "+8.3%",
      icon: Target,
      color: "bg-[#f59e0b]"
    },
    {
      title: "Completion Rate",
      value: "87.5%",
      change: "+5.1%",
      icon: TrendingUp,
      color: "bg-[#8b5cf6]"
    }
  ];
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: "admin",
      userName: "Admin",
      notificationCount: 5,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827]" }, "Analytics & Reports"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Platform performance and insights")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "",
        value: timeRange,
        onChange: (e) => setTimeRange(e.target.value),
        options: [
          { value: "week", label: "Last Week" },
          { value: "month", label: "Last Month" },
          { value: "quarter", label: "Last Quarter" },
          { value: "year", label: "Last Year" }
        ]
      }
    ), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary" }, /* @__PURE__ */ React.createElement(Download, { className: "w-4 h-4 mr-2" }), "Export Report"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, stats.map((stat, index) => /* @__PURE__ */ React.createElement(Card, { key: index }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280] mb-1" }, stat.title), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-bold text-[#111827] mb-1" }, stat.value), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#10b981]" }, stat.change, " from last period")), /* @__PURE__ */ React.createElement("div", { className: `${stat.color} p-3 rounded-lg` }, /* @__PURE__ */ React.createElement(stat.icon, { className: "w-6 h-6 text-white" })))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "User Growth" }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(BarChart, { data: userGrowthData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "month", stroke: "#6b7280" }), /* @__PURE__ */ React.createElement(YAxis, { stroke: "#6b7280" }), /* @__PURE__ */ React.createElement(
      Tooltip,
      {
        contentStyle: {
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px"
        }
      }
    ), /* @__PURE__ */ React.createElement(Legend, null), /* @__PURE__ */ React.createElement(Bar, { dataKey: "brands", fill: "#3b82f6", name: "Brands" }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "influencers", fill: "#10b981", name: "Influencers" })))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Campaign Status Overview" }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(LineChart, { data: campaignData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "month", stroke: "#6b7280" }), /* @__PURE__ */ React.createElement(YAxis, { stroke: "#6b7280" }), /* @__PURE__ */ React.createElement(
      Tooltip,
      {
        contentStyle: {
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px"
        }
      }
    ), /* @__PURE__ */ React.createElement(Legend, null), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "completed", stroke: "#10b981", name: "Completed" }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "active", stroke: "#3b82f6", name: "Active" }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "pending", stroke: "#f59e0b", name: "Pending" })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Category Distribution" }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(
      Pie,
      {
        data: categoryDistribution,
        cx: "50%",
        cy: "50%",
        labelLine: false,
        label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
        outerRadius: 100,
        fill: "#8884d8",
        dataKey: "value"
      },
      categoryDistribution.map((entry, index) => /* @__PURE__ */ React.createElement(Cell, { key: `cell-${index}`, fill: COLORS[index % COLORS.length] }))
    ), /* @__PURE__ */ React.createElement(Tooltip, null))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Revenue Trends" }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(LineChart, { data: revenueData }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "month", stroke: "#6b7280" }), /* @__PURE__ */ React.createElement(YAxis, { stroke: "#6b7280" }), /* @__PURE__ */ React.createElement(
      Tooltip,
      {
        contentStyle: {
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px"
        },
        formatter: (value) => `$${value.toLocaleString()}`
      }
    ), /* @__PURE__ */ React.createElement(Legend, null), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "revenue", stroke: "#10b981", strokeWidth: 2, name: "Revenue" })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Recent Platform Activity" }), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Date"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Event"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "User"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Category"), /* @__PURE__ */ React.createElement("th", { className: "text-left py-3 px-4 font-semibold text-[#111827]" }, "Value"))), /* @__PURE__ */ React.createElement("tbody", null, [
      {
        date: "2024-02-10",
        event: "Campaign Completed",
        user: "BravoTech",
        category: "Technology",
        value: "$2,500"
      },
      {
        date: "2024-02-10",
        event: "New User Signup",
        user: "Emma Davis",
        category: "Fashion",
        value: "-"
      },
      {
        date: "2024-02-09",
        event: "Campaign Started",
        user: "FashionHub",
        category: "Fashion",
        value: "$1,800"
      },
      {
        date: "2024-02-09",
        event: "Verification Approved",
        user: "Mike Chen",
        category: "Fitness",
        value: "-"
      },
      {
        date: "2024-02-08",
        event: "Campaign Completed",
        user: "TechCorp",
        category: "Technology",
        value: "$3,200"
      }
    ].map((activity, index) => /* @__PURE__ */ React.createElement("tr", { key: index, className: "border-b border-[#f3f4f6] hover:bg-[#f9fafb]" }, /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-[#6b7280]" }, activity.date), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-[#111827]" }, activity.event), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-[#111827]" }, activity.user), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-[#6b7280]" }, activity.category), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 font-medium text-[#111827]" }, activity.value))))))))
  );
}
export {
  AdminReports
};
