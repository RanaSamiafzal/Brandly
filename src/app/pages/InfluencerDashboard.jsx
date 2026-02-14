import React from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardHeader } from "../components/Cards";
import { InfluButton } from "../components/InfluButton";
import { StatusBadge } from "../components/StatusBadge";
import { TrendingUp, DollarSign, Target, Calendar, Clock, ExternalLink } from "lucide-react";
function InfluencerDashboard() {
  const navigate = useNavigate();
  const stats = [
    { title: "Active Campaigns", value: "5", icon: Target, color: "bg-[#3b82f6]" },
    { title: "Total Earnings", value: "$12,450", icon: DollarSign, color: "bg-[#10b981]" },
    { title: "Pending Requests", value: "8", icon: Clock, color: "bg-[#f59e0b]" },
    { title: "Completed", value: "23", icon: TrendingUp, color: "bg-[#8b5cf6]" }
  ];
  const activeCampaigns = [
    {
      id: "1",
      brand: "BravoTech",
      title: "Summer Product Launch",
      category: "Technology",
      deadline: "2024-03-15",
      payment: "$2,500",
      status: "in-progress",
      progress: 65
    },
    {
      id: "2",
      brand: "FashionHub",
      title: "Spring Collection 2024",
      category: "Fashion",
      deadline: "2024-03-20",
      payment: "$1,800",
      status: "in-progress",
      progress: 40
    },
    {
      id: "3",
      brand: "FitLife",
      title: "Fitness Challenge Campaign",
      category: "Fitness",
      deadline: "2024-03-25",
      payment: "$1,500",
      status: "in-progress",
      progress: 80
    }
  ];
  const pendingRequests = [
    {
      id: "1",
      brand: "TechCorp",
      title: "AI Product Review",
      category: "Technology",
      payment: "$3,000",
      date: "2024-02-08"
    },
    {
      id: "2",
      brand: "BeautyBrand",
      title: "Skincare Routine Video",
      category: "Beauty",
      payment: "$2,200",
      date: "2024-02-09"
    },
    {
      id: "3",
      brand: "TravelCo",
      title: "Destination Review",
      category: "Travel",
      payment: "$4,500",
      date: "2024-02-10"
    }
  ];
  const recentEarnings = [
    { campaign: "Winter Fashion Campaign", brand: "StyleHub", amount: "$2,800", date: "2024-02-05" },
    { campaign: "Tech Review Series", brand: "GadgetWorld", amount: "$3,200", date: "2024-01-28" },
    { campaign: "Fitness Product Launch", brand: "FitLife", amount: "$1,900", date: "2024-01-15" }
  ];
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: "influencer",
      userName: "Sarah Johnson",
      notificationCount: 8,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827]" }, "Welcome back, Sarah! \u{1F44B}"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Here's what's happening with your collaborations today.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, stats.map((stat, index) => /* @__PURE__ */ React.createElement(Card, { key: index }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280] mb-1" }, stat.title), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-bold text-[#111827]" }, stat.value)), /* @__PURE__ */ React.createElement("div", { className: `${stat.color} p-3 rounded-lg` }, /* @__PURE__ */ React.createElement(stat.icon, { className: "w-6 h-6 text-white" })))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(
      CardHeader,
      {
        title: "Active Campaigns",
        action: /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm", onClick: () => navigate("/requests") }, "View All")
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, activeCampaigns.map((campaign) => /* @__PURE__ */ React.createElement("div", { key: campaign.id, className: "border border-[#e5e7eb] rounded-lg p-4 hover:border-[#3b82f6] transition-colors" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-[#111827]" }, campaign.title), /* @__PURE__ */ React.createElement(StatusBadge, { status: "accepted" })), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280] mb-2" }, campaign.brand, " \u2022 ", campaign.category), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 text-sm text-[#6b7280]" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4" }), "Due: ", campaign.deadline), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(DollarSign, { className: "w-4 h-4" }), campaign.payment))), /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm" }, /* @__PURE__ */ React.createElement(ExternalLink, { className: "w-4 h-4 mr-2" }), "View Details")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-sm mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#6b7280]" }, "Progress"), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-[#111827]" }, campaign.progress, "%")), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-[#e5e7eb] rounded-full h-2" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "bg-[#3b82f6] h-2 rounded-full transition-all",
        style: { width: `${campaign.progress}%` }
      }
    ))))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(
      CardHeader,
      {
        title: "Pending Requests",
        action: /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm", onClick: () => navigate("/requests") }, "View All")
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, pendingRequests.map((request) => /* @__PURE__ */ React.createElement("div", { key: request.id, className: "border border-[#e5e7eb] rounded-lg p-4 hover:border-[#3b82f6] transition-colors" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium text-[#111827] mb-1" }, request.title), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, request.brand)), /* @__PURE__ */ React.createElement(StatusBadge, { status: "pending" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-sm" }, /* @__PURE__ */ React.createElement("span", { className: "text-[#6b7280]" }, request.category), /* @__PURE__ */ React.createElement("span", { className: "font-medium text-[#10b981]" }, request.payment)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-3" }, /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", size: "sm", className: "flex-1" }, "Accept"), /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm", className: "flex-1" }, "Decline")))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Recent Earnings" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, recentEarnings.map((earning, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "flex items-center justify-between py-3 border-b border-[#f3f4f6] last:border-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827] mb-1" }, earning.campaign), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, earning.brand, " \u2022 ", earning.date)), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-[#10b981]" }, earning.amount)))), /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-[#111827]" }, "Total This Month"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-[#10b981] text-lg" }, "$7,900")))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Performance Overview" }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-[#eff6ff] rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-bold text-[#3b82f6] mb-1" }, "4.8"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-[#6b7280]" }, "Average Rating")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-[#f0fdf4] rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-bold text-[#10b981] mb-1" }, "96%"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-[#6b7280]" }, "Completion Rate")), /* @__PURE__ */ React.createElement("div", { className: "text-center p-4 bg-[#fef3c7] rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-bold text-[#f59e0b] mb-1" }, "3.2 days"), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-[#6b7280]" }, "Avg Response Time")))))
  );
}
export {
  InfluencerDashboard
};
