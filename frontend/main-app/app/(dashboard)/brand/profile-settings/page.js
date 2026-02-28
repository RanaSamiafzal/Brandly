"use client";
import { useState, useEffect } from "react";
import { User, Globe, Lock, Upload, Camera, Trash2, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@repo/store";
import CloudinaryUpload from "../../../../components/brand/CloudinaryUpload";

export default function ProfileSettings() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState("Brand Information");
    const [isSaved, setIsSaved] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        brandName: "",
        website: "",
        industry: "",
        about: "",
        logo: ""
    });

    const tabs = [
        { name: "Brand Information", icon: User },
        { name: "Social Media", icon: Globe },
        { name: "Security", icon: Lock }
    ];

    useEffect(() => {
        setMounted(true);
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/brand/profile');
            const data = await res.json();
            if (data.profile) {
                setFormData({
                    brandName: data.profile.brandName || "",
                    website: data.profile.website || "",
                    industry: data.profile.industry || "",
                    about: data.profile.description || "", // Map backend "description" to frontend "about"
                    logo: data.profile.logo || ""
                });
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadSuccess = async (info) => {
        console.log("Upload Success:", info.secure_url);
        try {
            const res = await fetch('/api/brand/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ logo: info.secure_url })
            });
            const data = await res.json();
            if (data.profile) {
                setFormData(prev => ({ ...prev, logo: data.profile.logo }));
                // Update global state if necessary (e.g., if logo is used in sidebar)
            }
        } catch (error) {
            console.error("Failed to update logo", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
        try {
            const res = await fetch('/api/brand/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.profile) {
                // alert("Profile updated successfully!"); // Use setIsSaved for feedback
            }
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const brandName = formData.brandName || user?.fullname || user?.email?.split('@')[0] || "Brand Owner";
    const initial = brandName.charAt(0).toUpperCase();
    const profilePic = formData.logo;

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-500 mt-1">Manage your brand profile, social links, and security preferences.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Sidebar Nav */}
                <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50/50 p-6 space-y-2 flex-shrink-0">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.name;
                        return (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left
                  ${isActive
                                        ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                                        : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                                {tab.name}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    <form onSubmit={handleSave} className="space-y-8 h-full flex flex-col">

                        {/* BRAND INFORMATION TAB */}
                        {activeTab === "Brand Information" && (
                            <div className="space-y-6 flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Brand Details</h2>

                                {/* Logo Upload */}
                                <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                                    <div className="relative w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-md flex justify-center items-center text-blue-600 text-2xl font-bold flex-shrink-0 group overflow-hidden">
                                        {profilePic ? (
                                            <img src={profilePic} alt={brandName} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="group-hover:opacity-0 transition-opacity">{initial}</span>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Camera className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Brand Logo</h3>
                                        <p className="text-sm text-gray-500 mt-1 mb-3">Recommended size: 500x500px, under 2MB.</p>
                                        <div className="flex gap-3">
                                            <CloudinaryUpload
                                                onUploadSuccess={handleUploadSuccess}
                                                buttonText="Upload New Logo"
                                                folder="brand_logos"
                                            />
                                            <button type="button" className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                                        <input
                                            type="text"
                                            name="brandName"
                                            value={formData.brandName}
                                            onChange={handleChange}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                                        <select
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        >
                                            <option value="">Select Industry</option>
                                            <option value="Technology & Gadgets">Technology & Gadgets</option>
                                            <option value="Health & Fitness">Health & Fitness</option>
                                            <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                                            <option value="Food & Beverage">Food & Beverage</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Description</label>
                                        <textarea
                                            name="about"
                                            value={formData.about}
                                            onChange={handleChange}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm h-32 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SOCIAL MEDIA TAB */}
                        {activeTab === "Social Media" && (
                            <div className="space-y-6 flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Social Media Profiles</h2>
                                <p className="text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">Connect your brand's social media accounts so influencers can review your existing content.</p>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-pink-500"></span> Instagram
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-400 text-sm">instagram.com/</span>
                                            </div>
                                            <input type="text" placeholder="username" className="w-full border-gray-200 border p-3 pl-32 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span> YouTube
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-400 text-sm">youtube.com/c/</span>
                                            </div>
                                            <input type="text" placeholder="channel-id" className="w-full border-gray-200 border p-3 pl-[110px] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-900"></span> TikTok
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-400 text-sm">tiktok.com/@</span>
                                            </div>
                                            <input type="text" placeholder="username" className="w-full border-gray-200 border p-3 pl-24 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === "Security" && (
                            <div className="space-y-8 flex-1">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Change Password</h2>
                                    <p className="text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">Update the password associated with this account.</p>

                                    <div className="space-y-4 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="pt-6 border-t border-red-100">
                                    <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
                                    <p className="text-sm text-gray-600 mb-4">Deleting your account is permanent and cannot be undone. All your campaigns and data will be lost.</p>
                                    <button type="button" className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg text-sm border border-red-200 transition-colors flex items-center gap-2">
                                        <Trash2 className="w-4 h-4" /> Delete Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Fixed Action Footer for form */}
                        <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between">
                            {isSaved ? (
                                <span className="text-green-600 text-sm font-medium flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> Settings saved successfully
                                </span>
                            ) : <span></span>}

                            <div className="flex gap-3">
                                <button type="button" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
