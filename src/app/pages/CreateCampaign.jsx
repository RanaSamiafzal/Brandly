import React, { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardHeader } from "../components/Cards";
import { Input, Textarea, Select } from "../components/FormComponents";
import { InfluButton } from "../components/InfluButton";
import { Plus, X, Calendar, DollarSign, Users, Target } from "lucide-react";
import { toast } from "sonner";
function CreateCampaign() {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({
    title: "",
    category: "technology",
    description: "",
    budget: "",
    timeline: "",
    deliverables: "",
    targetAudience: "",
    platforms: [],
    requirements: ""
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const handleInputChange = (e) => {
    setCampaignData({
      ...campaignData,
      [e.target.name]: e.target.value
    });
  };
  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  const handleSubmit = () => {
    if (!campaignData.title || !campaignData.description || !campaignData.budget) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Campaign created successfully!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1e3);
  };
  const platforms = [
    { id: "instagram", name: "Instagram", icon: "\u{1F4F7}" },
    { id: "youtube", name: "YouTube", icon: "\u25B6\uFE0F" },
    { id: "tiktok", name: "TikTok", icon: "\u{1F3B5}" },
    { id: "twitter", name: "Twitter/X", icon: "\u{1F426}" },
    { id: "facebook", name: "Facebook", icon: "\u{1F465}" },
    { id: "linkedin", name: "LinkedIn", icon: "\u{1F4BC}" }
  ];
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: "brand",
      userName: "BravoTech",
      notificationCount: 3,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827]" }, "Create New Campaign"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Define your campaign requirements and find the perfect influencer")), /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", onClick: () => navigate("/dashboard") }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4 mr-2" }), "Cancel")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Campaign Information" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Campaign Title",
        name: "title",
        value: campaignData.title,
        onChange: handleInputChange,
        placeholder: "e.g., Summer Product Launch 2024",
        required: true
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Category",
        name: "category",
        value: campaignData.category,
        onChange: handleInputChange,
        options: [
          { value: "technology", label: "Technology" },
          { value: "fashion", label: "Fashion" },
          { value: "beauty", label: "Beauty" },
          { value: "fitness", label: "Fitness" },
          { value: "food", label: "Food & Beverage" },
          { value: "travel", label: "Travel" },
          { value: "lifestyle", label: "Lifestyle" },
          { value: "gaming", label: "Gaming" }
        ]
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Budget (USD)",
        name: "budget",
        type: "number",
        value: campaignData.budget,
        onChange: handleInputChange,
        placeholder: "2500",
        required: true
      }
    )), /* @__PURE__ */ React.createElement(
      Textarea,
      {
        label: "Campaign Description",
        name: "description",
        value: campaignData.description,
        onChange: handleInputChange,
        placeholder: "Describe your campaign goals, brand message, and what you're looking for...",
        rows: 4,
        required: true
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Campaign Timeline",
        name: "timeline",
        value: campaignData.timeline,
        onChange: handleInputChange,
        placeholder: "e.g., 2 weeks, 1 month"
      }
    ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Target Platforms" }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3" }, platforms.map((platform) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: platform.id,
        onClick: () => togglePlatform(platform.id),
        className: `flex items-center gap-2 p-4 border-2 rounded-lg transition-all ${selectedPlatforms.includes(platform.id) ? "border-[#3b82f6] bg-[#eff6ff]" : "border-[#e5e7eb] hover:border-[#d1d5db]"}`
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, platform.icon),
      /* @__PURE__ */ React.createElement("span", { className: "font-medium text-[#111827]" }, platform.name)
    )))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Campaign Requirements" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(
      Textarea,
      {
        label: "Deliverables",
        name: "deliverables",
        value: campaignData.deliverables,
        onChange: handleInputChange,
        placeholder: "e.g., 3 Instagram posts, 1 YouTube video, 5 Stories...",
        rows: 3
      }
    ), /* @__PURE__ */ React.createElement(
      Textarea,
      {
        label: "Target Audience",
        name: "targetAudience",
        value: campaignData.targetAudience,
        onChange: handleInputChange,
        placeholder: "Describe your ideal audience demographics, interests, and characteristics...",
        rows: 3
      }
    ), /* @__PURE__ */ React.createElement(
      Textarea,
      {
        label: "Additional Requirements",
        name: "requirements",
        value: campaignData.requirements,
        onChange: handleInputChange,
        placeholder: "Any specific requirements, brand guidelines, or preferences...",
        rows: 3
      }
    ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Campaign Summary" }), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#3b82f6] p-2 rounded-lg" }, /* @__PURE__ */ React.createElement(Target, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Category"), /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-[#111827] capitalize" }, campaignData.category || "Not set"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#10b981] p-2 rounded-lg" }, /* @__PURE__ */ React.createElement(DollarSign, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Budget"), /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-[#111827]" }, campaignData.budget ? `$${campaignData.budget}` : "Not set"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#f59e0b] p-2 rounded-lg" }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Timeline"), /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-[#111827]" }, campaignData.timeline || "Not set"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#8b5cf6] p-2 rounded-lg" }, /* @__PURE__ */ React.createElement(Users, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Platforms"), /* @__PURE__ */ React.createElement("p", { className: "font-semibold text-[#111827]" }, selectedPlatforms.length || "0", " selected"))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 justify-end" }, /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", onClick: () => navigate("/dashboard") }, "Save as Draft"), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: handleSubmit }, /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4 mr-2" }), "Create Campaign")))
  );
}
export {
  CreateCampaign
};
