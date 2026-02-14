import React, { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardHeader } from "../components/Cards";
import { Input, Select, Textarea } from "../components/FormComponents";
import { InfluButton } from "../components/InfluButton";
import { Camera, Save, X } from "lucide-react";
import { toast } from "sonner";
function ProfileSettings() {
  const navigate = useNavigate();
  const [userType] = useState("brand");
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop");
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: userType === "brand" ? "BravoTech" : "Sarah Johnson",
    email: "contact@bravotech.com",
    phone: "+1 (555) 123-4567",
    website: "https://bravotech.com",
    industry: "technology",
    location: "San Francisco, CA",
    description: "Leading technology brand focused on innovative solutions for modern businesses."
  });
  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://instagram.com/bravotech",
    youtube: "https://youtube.com/@bravotech",
    twitter: "https://twitter.com/bravotech",
    tiktok: "",
    followers: {
      instagram: "50000",
      youtube: "120000",
      twitter: "35000"
    }
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("followers-")) {
      const platform = name.replace("followers-", "");
      setSocialLinks({
        ...socialLinks,
        followers: {
          ...socialLinks.followers,
          [platform]: value
        }
      });
    } else {
      setSocialLinks({
        ...socialLinks,
        [name]: value
      });
    }
  };
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };
  const handleSaveSocial = () => {
    toast.success("Social links updated successfully!");
  };
  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }
    toast.success("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };
  const tabs = [
    { id: "profile", label: "Profile Information" },
    { id: "social", label: "Social Media" },
    { id: "security", label: "Security" }
  ];
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: userType,
      userName: profileData.name,
      notificationCount: 3,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827] mb-2" }, "Profile Settings"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Manage your account settings and preferences.")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 border-b border-[#e5e7eb]" }, tabs.map((tab) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        className: `px-6 py-3 font-medium transition-colors relative ${activeTab === tab.id ? "text-[#3b82f6]" : "text-[#6b7280] hover:text-[#111827]"}`
      },
      tab.label,
      activeTab === tab.id && /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" })
    )))), activeTab === "profile" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Profile Information" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: profileImage,
        alt: "Profile",
        className: "w-24 h-24 rounded-full object-cover border-4 border-[#e5e7eb]"
      }
    ), /* @__PURE__ */ React.createElement("label", { className: "absolute bottom-0 right-0 w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2563eb] transition-colors" }, /* @__PURE__ */ React.createElement(Camera, { className: "w-4 h-4 text-white" }), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleImageUpload
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold text-[#111827] mb-1" }, "Profile Picture"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280] mb-2" }, "Upload a new profile picture. Recommended size: 400x400px"), /* @__PURE__ */ React.createElement("label", { className: "cursor-pointer" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm text-[#3b82f6] hover:underline" }, "Upload new image"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleImageUpload
      }
    )))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: userType === "brand" ? "Brand Name" : "Full Name",
        name: "name",
        value: profileData.name,
        onChange: handleProfileChange,
        required: true
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Email",
        type: "email",
        name: "email",
        value: profileData.email,
        onChange: handleProfileChange,
        required: true
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Phone",
        type: "tel",
        name: "phone",
        value: profileData.phone,
        onChange: handleProfileChange
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Website",
        type: "url",
        name: "website",
        value: profileData.website,
        onChange: handleProfileChange
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: userType === "brand" ? "Industry" : "Category",
        name: "industry",
        value: profileData.industry,
        onChange: handleProfileChange,
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
        label: "Location",
        name: "location",
        value: profileData.location,
        onChange: handleProfileChange
      }
    )), /* @__PURE__ */ React.createElement(
      Textarea,
      {
        label: userType === "brand" ? "Company Description" : "Bio",
        name: "description",
        value: profileData.description,
        onChange: handleProfileChange,
        rows: 4
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: handleSaveProfile }, /* @__PURE__ */ React.createElement(Save, { className: "w-4 h-4 mr-2" }), "Save Changes"), /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", onClick: () => navigate("/dashboard") }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4 mr-2" }), "Cancel")))), activeTab === "social" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Social Media Links" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, userType === "brand" ? "Add your brand's social media profiles to increase visibility." : "Connect your social media accounts to showcase your reach and engagement."), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Instagram Profile",
        name: "instagram",
        value: socialLinks.instagram,
        onChange: handleSocialChange,
        placeholder: "https://instagram.com/yourusername"
      }
    ), userType === "influencer" && /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Instagram Followers",
        name: "followers-instagram",
        type: "number",
        value: socialLinks.followers.instagram,
        onChange: handleSocialChange,
        placeholder: "50000"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "YouTube Channel",
        name: "youtube",
        value: socialLinks.youtube,
        onChange: handleSocialChange,
        placeholder: "https://youtube.com/@yourchannel"
      }
    ), userType === "influencer" && /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "YouTube Subscribers",
        name: "followers-youtube",
        type: "number",
        value: socialLinks.followers.youtube,
        onChange: handleSocialChange,
        placeholder: "120000"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Twitter/X Profile",
        name: "twitter",
        value: socialLinks.twitter,
        onChange: handleSocialChange,
        placeholder: "https://twitter.com/yourusername"
      }
    ), userType === "influencer" && /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Twitter Followers",
        name: "followers-twitter",
        type: "number",
        value: socialLinks.followers.twitter,
        onChange: handleSocialChange,
        placeholder: "35000"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "TikTok Profile",
        name: "tiktok",
        value: socialLinks.tiktok,
        onChange: handleSocialChange,
        placeholder: "https://tiktok.com/@yourusername"
      }
    ), userType === "influencer" && /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "TikTok Followers",
        name: "followers-tiktok",
        type: "number",
        value: socialLinks.followers.tiktok || "",
        onChange: handleSocialChange,
        placeholder: "0"
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: handleSaveSocial }, /* @__PURE__ */ React.createElement(Save, { className: "w-4 h-4 mr-2" }), "Save Social Links"), /* @__PURE__ */ React.createElement(InfluButton, { variant: "outline", onClick: () => navigate("/dashboard") }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4 mr-2" }), "Cancel")))), activeTab === "security" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Change Password" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Current Password",
        type: "password",
        name: "currentPassword",
        value: passwordData.currentPassword,
        onChange: handlePasswordChange,
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "New Password",
        type: "password",
        name: "newPassword",
        value: passwordData.newPassword,
        onChange: handlePasswordChange,
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Confirm New Password",
        type: "password",
        name: "confirmPassword",
        value: passwordData.confirmPassword,
        onChange: handlePasswordChange,
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
      }
    ), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Password must be at least 8 characters long and include letters and numbers."), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: handleChangePassword }, "Update Password"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Account Settings" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Email Notifications"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Receive email updates about your activity")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "sr-only peer", defaultChecked: true }), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#e5e7eb]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Marketing Communications"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Receive tips, updates, and promotional content")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "sr-only peer" }), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" }))), /* @__PURE__ */ React.createElement("div", { className: "pt-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-semibold text-[#111827] mb-2" }, "Danger Zone"), /* @__PURE__ */ React.createElement("div", { className: "border border-[#ef4444] rounded-lg p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827] mb-1" }, "Delete Account"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Permanently delete your account and all associated data. This action cannot be undone.")), /* @__PURE__ */ React.createElement(InfluButton, { variant: "danger", size: "sm" }, "Delete"))))))))
  );
}
export {
  ProfileSettings
};
