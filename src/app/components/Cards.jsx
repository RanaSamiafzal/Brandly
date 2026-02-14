import React from "react";
import { cn } from "./ui/utils";
import { InfluButton } from "./InfluButton";
import { StatusBadge } from "./StatusBadge";
import { Instagram, Youtube, Twitter, Users } from "lucide-react";
function Card({ children, className }) {
  return /* @__PURE__ */ React.createElement("div", { className: cn("bg-white rounded-lg border border-[#e5e7eb] p-6", className) }, children);
}
function CardHeader({ title, action, className }) {
  return /* @__PURE__ */ React.createElement("div", { className: cn("flex items-center justify-between mb-4", className) }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-[#111827]" }, title), action);
}
function ProfileCard({
  name,
  image,
  platform,
  followers,
  category,
  verified,
  onViewProfile,
  className
}) {
  const platformIcons = {
    Instagram,
    Youtube,
    Twitter,
    TikTok: Users
  };
  const PlatformIcon = platformIcons[platform] || Users;
  return /* @__PURE__ */ React.createElement(Card, { className: cn("hover:shadow-lg transition-shadow", className) }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center text-center" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: image,
      alt: name,
      className: "w-20 h-20 rounded-full object-cover mb-3"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-[#111827]" }, name), verified && /* @__PURE__ */ React.createElement(StatusBadge, { status: "verified" })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1 text-sm text-[#6b7280] mb-1" }, /* @__PURE__ */ React.createElement(PlatformIcon, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", null, platform)), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280] mb-1" }, followers, " followers"), category && /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#9ca3af] mb-3" }, category), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", size: "sm", onClick: onViewProfile }, "View Profile")));
}
function RequestCard({
  influencerName,
  influencerImage,
  campaignTitle,
  budget,
  timeline,
  status,
  onViewDetails,
  className
}) {
  return /* @__PURE__ */ React.createElement(Card, { className: cn("hover:shadow-md transition-shadow", className) }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: influencerImage,
      alt: influencerName,
      className: "w-12 h-12 rounded-full object-cover"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-[#111827]" }, influencerName), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, campaignTitle)), /* @__PURE__ */ React.createElement(StatusBadge, { status })), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 text-sm text-[#6b7280] mb-3" }, /* @__PURE__ */ React.createElement("span", null, "Budget: ", budget), /* @__PURE__ */ React.createElement("span", null, "Timeline: ", timeline)), /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", size: "sm", onClick: onViewDetails }, "View Details"))));
}
export {
  Card,
  CardHeader,
  ProfileCard,
  RequestCard
};
