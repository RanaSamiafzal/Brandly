import React, { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardHeader } from "../components/Cards";
import { Input, Textarea, Select } from "../components/FormComponents";
import { InfluButton } from "../components/InfluButton";
import { Save, Bell, Shield, Zap, Database } from "lucide-react";
import { toast } from "sonner";
function AdminSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "InfluConnect",
    supportEmail: "support@influconnect.com",
    contactPhone: "+1 (555) 123-4567",
    platformDescription: "The leading platform connecting brands with influencers for authentic collaborations.",
    defaultCurrency: "USD",
    timezone: "America/New_York"
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserSignup: true,
    campaignCreated: true,
    verificationRequests: true,
    reportSubmitted: true,
    weeklyDigest: true
  });
  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordMinLength: "8",
    maxLoginAttempts: "5"
  });
  const [platformSettings, setPlatformSettings] = useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireAdminApproval: false,
    maxCampaignsPerBrand: "10",
    commissionRate: "10"
  });
  const handleGeneralChange = (e) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value
    });
  };
  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully!");
  };
  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully!");
  };
  const handleSaveSecurity = () => {
    toast.success("Security settings saved successfully!");
  };
  const handleSavePlatform = () => {
    toast.success("Platform settings saved successfully!");
  };
  const tabs = [
    { id: "general", label: "General", icon: Zap },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "platform", label: "Platform", icon: Database }
  ];
  return /* @__PURE__ */ React.createElement(
    DashboardLayout,
    {
      userRole: "admin",
      userName: "Admin",
      notificationCount: 5,
      onLogout: () => navigate("/login")
    },
    /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold text-[#111827] mb-2" }, "Platform Settings"), /* @__PURE__ */ React.createElement("p", { className: "text-[#6b7280]" }, "Configure platform-wide settings and preferences")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 border-b border-[#e5e7eb]" }, tabs.map((tab) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        className: `flex items-center gap-2 px-6 py-3 font-medium transition-colors relative ${activeTab === tab.id ? "text-[#3b82f6]" : "text-[#6b7280] hover:text-[#111827]"}`
      },
      /* @__PURE__ */ React.createElement(tab.icon, { className: "w-4 h-4" }),
      tab.label,
      activeTab === tab.id && /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]" })
    )))), activeTab === "general" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "General Settings" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Platform Name",
        name: "platformName",
        value: generalSettings.platformName,
        onChange: handleGeneralChange
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Support Email",
        type: "email",
        name: "supportEmail",
        value: generalSettings.supportEmail,
        onChange: handleGeneralChange
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Contact Phone",
        type: "tel",
        name: "contactPhone",
        value: generalSettings.contactPhone,
        onChange: handleGeneralChange
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Default Currency",
        name: "defaultCurrency",
        value: generalSettings.defaultCurrency,
        onChange: handleGeneralChange,
        options: [
          { value: "USD", label: "USD - US Dollar" },
          { value: "EUR", label: "EUR - Euro" },
          { value: "GBP", label: "GBP - British Pound" },
          { value: "CAD", label: "CAD - Canadian Dollar" }
        ]
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Timezone",
        name: "timezone",
        value: generalSettings.timezone,
        onChange: handleGeneralChange,
        options: [
          { value: "America/New_York", label: "Eastern Time (ET)" },
          { value: "America/Chicago", label: "Central Time (CT)" },
          { value: "America/Denver", label: "Mountain Time (MT)" },
          { value: "America/Los_Angeles", label: "Pacific Time (PT)" }
        ]
      }
    )), /* @__PURE__ */ React.createElement(
      Textarea,
      {
        label: "Platform Description",
        name: "platformDescription",
        value: generalSettings.platformDescription,
        onChange: handleGeneralChange,
        rows: 3
      }
    ), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: handleSaveGeneral }, /* @__PURE__ */ React.createElement(Save, { className: "w-4 h-4 mr-2" }), "Save General Settings"))), activeTab === "notifications" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Notification Settings" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Configure which notifications admins should receive"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, [
      { key: "emailNotifications", label: "Enable Email Notifications", description: "Receive notifications via email" },
      { key: "newUserSignup", label: "New User Signups", description: "Get notified when new users register" },
      { key: "campaignCreated", label: "Campaign Created", description: "Get notified when brands create campaigns" },
      { key: "verificationRequests", label: "Verification Requests", description: "Get notified of pending verifications" },
      { key: "reportSubmitted", label: "Report Submitted", description: "Get notified when users submit reports" },
      { key: "weeklyDigest", label: "Weekly Digest", description: "Receive weekly summary of platform activity" }
    ].map((setting) => /* @__PURE__ */ React.createElement("div", { key: setting.key, className: "flex items-center justify-between py-3 border-b border-[#f3f4f6]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, setting.label), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, setting.description)), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        className: "sr-only peer",
        checked: notificationSettings[setting.key],
        onChange: (e) => setNotificationSettings({
          ...notificationSettings,
          [setting.key]: e.target.checked
        })
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" }))))), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: handleSaveNotifications }, /* @__PURE__ */ React.createElement(Save, { className: "w-4 h-4 mr-2" }), "Save Notification Settings"))), activeTab === "security" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Security Settings" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#f3f4f6]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Require Email Verification"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Users must verify their email to access the platform")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        className: "sr-only peer",
        checked: securitySettings.requireEmailVerification,
        onChange: (e) => setSecuritySettings({
          ...securitySettings,
          requireEmailVerification: e.target.checked
        })
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#f3f4f6]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Two-Factor Authentication"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Require 2FA for all admin accounts")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        className: "sr-only peer",
        checked: securitySettings.twoFactorAuth,
        onChange: (e) => setSecuritySettings({
          ...securitySettings,
          twoFactorAuth: e.target.checked
        })
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" })))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Session Timeout (minutes)",
        type: "number",
        value: securitySettings.sessionTimeout,
        onChange: (e) => setSecuritySettings({
          ...securitySettings,
          sessionTimeout: e.target.value
        })
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Password Min Length",
        type: "number",
        value: securitySettings.passwordMinLength,
        onChange: (e) => setSecuritySettings({
          ...securitySettings,
          passwordMinLength: e.target.value
        })
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Max Login Attempts",
        type: "number",
        value: securitySettings.maxLoginAttempts,
        onChange: (e) => setSecuritySettings({
          ...securitySettings,
          maxLoginAttempts: e.target.value
        })
      }
    )), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: handleSaveSecurity }, /* @__PURE__ */ React.createElement(Save, { className: "w-4 h-4 mr-2" }), "Save Security Settings"))), activeTab === "platform" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, { title: "Platform Settings" }), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#f3f4f6]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Maintenance Mode"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Temporarily disable platform access for maintenance")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        className: "sr-only peer",
        checked: platformSettings.maintenanceMode,
        onChange: (e) => setPlatformSettings({
          ...platformSettings,
          maintenanceMode: e.target.checked
        })
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#f3f4f6]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Allow New Registrations"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "Enable new user signups on the platform")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        className: "sr-only peer",
        checked: platformSettings.allowNewRegistrations,
        onChange: (e) => setPlatformSettings({
          ...platformSettings,
          allowNewRegistrations: e.target.checked
        })
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" }))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between py-3 border-b border-[#f3f4f6]" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium text-[#111827]" }, "Require Admin Approval"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-[#6b7280]" }, "New users need admin approval before accessing the platform")), /* @__PURE__ */ React.createElement("label", { className: "relative inline-flex items-center cursor-pointer" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "checkbox",
        className: "sr-only peer",
        checked: platformSettings.requireAdminApproval,
        onChange: (e) => setPlatformSettings({
          ...platformSettings,
          requireAdminApproval: e.target.checked
        })
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]" })))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-4" }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Max Campaigns Per Brand",
        type: "number",
        value: platformSettings.maxCampaignsPerBrand,
        onChange: (e) => setPlatformSettings({
          ...platformSettings,
          maxCampaignsPerBrand: e.target.value
        })
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Platform Commission Rate (%)",
        type: "number",
        value: platformSettings.commissionRate,
        onChange: (e) => setPlatformSettings({
          ...platformSettings,
          commissionRate: e.target.value
        })
      }
    )), /* @__PURE__ */ React.createElement(InfluButton, { variant: "primary", onClick: handleSavePlatform }, /* @__PURE__ */ React.createElement(Save, { className: "w-4 h-4 mr-2" }), "Save Platform Settings"))))
  );
}
export {
  AdminSettings
};
