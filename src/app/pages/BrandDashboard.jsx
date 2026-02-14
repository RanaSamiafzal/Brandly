import React from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardHeader, ProfileCard } from "../components/Cards";
import { InfluButton } from "../components/InfluButton";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";
function BrandDashboard() {
  const navigate = useNavigate();
  const mockInfluencers = [
    {
      name: "Sara_Lifestyle",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      platform: "Instagram",
      followers: "50k",
      category: "Lifestyle",
      verified: true
    },
    {
      name: "DanTechGeek",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      platform: "Youtube",
      followers: "120k",
      category: "Technology",
      verified: true
    },
    {
      name: "FitWithMaya",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      platform: "Instagram",
      followers: "75k",
      category: "Fitness",
      verified: true
    }
  ];
  const stats = [
    {
      icon: FileText,
      label: "Total Requests",
      value: "24",
      color: "text-[#3b82f6]",
      bgColor: "bg-[#eff6ff]"
    },
    {
      icon: CheckCircle,
      label: "Active Campaigns",
      value: "8",
      color: "text-[#10b981]",
      bgColor: "bg-[#d1fae5]"
    },
    {
      icon: Clock,
      label: "Pending Approvals",
      value: "3",
      color: "text-[#f59e0b]",
      bgColor: "bg-[#fef3c7]"
    },
    {
      icon: Users,
      label: "Influencers Found",
      value: "156",
      color: "text-[#6b7280]",
      bgColor: "bg-[#f3f4f6]"
    }
  ];
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: "brand",
      userName: "BravoTech",
      notificationCount: 3,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827] mb-2" }, "Welcome, BravoTech!"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Here's what's happening with your campaigns today.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, stats.map((stat) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ React.createElement(Card, { key: stat.label }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center` }, /* @__PURE__ */ React.createElement(Icon, { className: `w-6 h-6 ${stat.color}` })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, stat.label), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-[#111827]" }, stat.value))));
    })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(
      CardHeader,
      {
        title: "Recommended Influencers",
        action: /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm", onClick: () => navigate("/search") }, "View All")
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, mockInfluencers.map((influencer) => /* @__PURE__ */ React.createElement(
      ProfileCard,
      {
        key: influencer.name,
        ...influencer,
        onViewProfile: () => console.log("View profile:", influencer.name)
      }
    )))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Recent Activity" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4 pb-4 border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-[#10b981] rounded-full mt-2" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#111827]" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold" }, "EllaStyle"), " accepted your collaboration request"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-[#6b7280]" }, "2 hours ago"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4 pb-4 border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-[#3b82f6] rounded-full mt-2" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#111827]" }, "New influencer match found for your campaign"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-[#6b7280]" }, "5 hours ago"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-[#f59e0b] rounded-full mt-2" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#111827]" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold" }, "TechGuruMike"), " is reviewing your request"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-[#6b7280]" }, "1 day ago"))))))
  );
}
export {
  BrandDashboard
};
