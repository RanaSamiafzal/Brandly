import React from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, ProfileCard } from "../components/Cards";
import { Select } from "../components/FormComponents";
import { Search } from "lucide-react";
import { setCategory, setFollowers, setPlatform } from "../features/searchFiltersSlice";
import { useGetInfluencersQuery } from "../services/influencersApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
function SearchInfluencers() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.searchFilters);
  const { data: influencers = [], isFetching } = useGetInfluencersQuery(filters);
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: "brand",
      userName: "BravoTech",
      notificationCount: 3,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827] mb-2" }, "Find the Perfect Influencers for Your Brand"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Search and connect with top influencers to boost your campaigns.")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Category",
        options: [
          { value: "", label: "All Categories" },
          { value: "lifestyle", label: "Lifestyle" },
          { value: "technology", label: "Technology" },
          { value: "fitness", label: "Fitness" },
          { value: "beauty", label: "Beauty" },
          { value: "travel", label: "Travel" },
          { value: "food", label: "Food" },
          { value: "health", label: "Health" }
        ],
        value: filters.category,
        onChange: (e) => dispatch(setCategory(e.target.value))
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Platform",
        options: [
          { value: "", label: "All Platforms" },
          { value: "instagram", label: "Instagram" },
          { value: "youtube", label: "YouTube" },
          { value: "twitter", label: "Twitter" },
          { value: "tiktok", label: "TikTok" }
        ],
        value: filters.platform,
        onChange: (e) => dispatch(setPlatform(e.target.value))
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Followers",
        options: [
          { value: "", label: "Any" },
          { value: "10k-50k", label: "10k - 50k" },
          { value: "50k-100k", label: "50k - 100k" },
          { value: "100k+", label: "100k+" }
        ],
        value: filters.followers,
        onChange: (e) => dispatch(setFollowers(e.target.value))
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex items-end mb-4" }, /* @__PURE__ */ React.createElement("button", { className: "w-full px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement(Search, { className: "w-5 h-5" }), isFetching ? "Searching..." : "Search")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold text-[#111827] mb-4" }, "Found ", influencers.length, " Influencers"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, influencers.map((influencer) => /* @__PURE__ */ React.createElement(
      ProfileCard,
      {
        key: influencer.name,
        ...influencer,
        onViewProfile: () => console.log("View profile:", influencer.name)
      }
    )))))
  );
}
export {
  SearchInfluencers
};
