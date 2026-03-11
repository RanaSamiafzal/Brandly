"use client";
import { useState, useEffect } from "react";
import {
    User,
    Link as LinkIcon,
    Shield,
    Camera,
    Save,
    X,
    Plus,
    Trash2,
    Instagram,
    Youtube,
    Twitter,
    Users,
    Lock,
    Bell,
    Mail,
    Globe,
    Phone,
    MapPin,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";
import { useAuthStore } from "@repo/store";
import CloudinaryUpload from "../../../../components/brand/CloudinaryUpload";

const AVAILABLE_CATEGORIES = [
    "Lifestyle", "Fashion", "Tech", "Fitness", "Beauty",
    "Travel", "Food", "Gaming", "Health", "Entertainment"
];

export default function InfluencerProfileSettings() {
    const { user, login } = useAuthStore();
    const [activeTab, setActiveTab] = useState("Profile Information");
    const [isSaved, setIsSaved] = useState(false);
    const [isUpdatingPic, setIsUpdatingPic] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Form States
    const [profileData, setProfileData] = useState({
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 987-6543",
        website: "https://sarahjohnson.com",
        category: "Lifestyle",
        location: "Los Angeles, CA",
        bio: "Lifestyle content creator passionate about fashion, wellness, and authentic brand collaborations."
    });

    const [socialPlatforms, setSocialPlatforms] = useState([
        { id: 1, type: "instagram", handle: "https://instagram.com/sarahjohnson", followers: "50000" },
        { id: 2, type: "youtube", handle: "https://youtube.com/@sarahjohnson", followers: "120000" },
        { id: 3, type: "twitter", handle: "https://twitter.com/sarahjohnson", followers: "35000" },
        { id: 4, type: "tiktok", handle: "https://tiktok.com/@sarahjohnson", followers: "80000" },
    ]);

    const tabs = [
        { name: "Profile Information", icon: User },
        { name: "Social Media & Stats", icon: LinkIcon },
        { name: "Security", icon: Shield }
    ];

    useEffect(() => {
        setMounted(true);
        if (user) {
            setProfileData({
                fullName: user.fullname || "",
                email: user.email || "",
                phone: user.influencerProfile?.phone || "",
                website: user.influencerProfile?.website || "",
                category: user.influencerProfile?.category || "Lifestyle",
                location: user.influencerProfile?.location || "",
                bio: user.influencerProfile?.about || ""
            });
            if (user.influencerProfile?.platforms) {
                try {
                    const platforms = typeof user.influencerProfile.platforms === 'string'
                        ? JSON.parse(user.influencerProfile.platforms)
                        : user.influencerProfile.platforms;
                    setSocialPlatforms(platforms);
                } catch (e) {
                    console.error("Failed to parse platforms:", e);
                }
            }
        }
    }, [user]);

    const handleProfilePicUpdate = async (info) => {
        setIsUpdatingPic(true);
        try {
            const res = await fetch('/api/influencer/profile/pic', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profilePic: info.secure_url })
            });

            if (res.ok) {
                const meRes = await fetch('/api/auth/me');
                const meData = await meRes.json();
                if (meData.user) {
                    login(meData.user);
                }
            }
        } catch (error) {
            console.error("Failed to update profile pic", error);
        } finally {
            setIsUpdatingPic(false);
        }
    };

    const addPlatform = () => {
        const newId = socialPlatforms.length > 0 ? Math.max(...socialPlatforms.map(p => p.id)) + 1 : 1;
        setSocialPlatforms([...socialPlatforms, { id: newId, type: "instagram", handle: "", followers: "" }]);
    };

    const removePlatform = (id) => {
        setSocialPlatforms(socialPlatforms.filter(p => p.id !== id));
    };

    const updatePlatform = (id, field, value) => {
        setSocialPlatforms(socialPlatforms.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatePayload = {
                ...profileData,
                fullName: profileData.fullName || user.fullname,
                platforms: JSON.stringify(socialPlatforms)
            };
            const res = await fetch('/api/influencer/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatePayload)
            });

            if (res.ok) {
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 3000);
                // Optionally update auth store if fullname changed
                if (profileData.fullName !== user.fullname) {
                    const meRes = await fetch('/api/auth/me');
                    const meData = await meRes.json();
                    if (meData.user) login(meData.user);
                }
            } else {
                alert("Failed to save profile.");
            }
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    const toggleCategory = (cat) => {
        let current = profileData.category ? profileData.category.split(',').map(c => c.trim()).filter(c => c) : [];
        if (current.includes(cat)) {
            current = current.filter(c => c !== cat);
        } else {
            if (current.length < 5) current.push(cat);
        }
        setProfileData({ ...profileData, category: current.join(', ') });
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-500 mt-1">Manage your influencer profile, social links, and security preferences.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Sidebar Nav (Matching Brand Side) */}
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
                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <form onSubmit={handleSave} className="space-y-8 h-full flex flex-col">

                        {/* PROFILE INFORMATION TAB */}
                        {activeTab === "Profile Information" && (
                            <div className="space-y-6 flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Influencer Details</h2>

                                {/* Profile Pic Upload (Matching Brand Side Style) */}
                                <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b border-gray-100">
                                    <div className="relative w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-md flex justify-center items-center text-blue-600 text-2xl font-bold flex-shrink-0 group overflow-hidden">
                                        {user?.profilePic ? (
                                            <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            user?.fullname?.charAt(0).toUpperCase() || "I"
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Camera className="w-6 h-6 text-white" />
                                            <div className="absolute inset-0 opacity-0 cursor-pointer">
                                                <CloudinaryUpload
                                                    onUploadSuccess={handleProfilePicUpdate}
                                                    buttonText=""
                                                    folder="influencer_profiles"
                                                    className="w-full h-full"
                                                />
                                            </div>
                                        </div>
                                        {isUpdatingPic && (
                                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Profile Picture</h3>
                                        <p className="text-sm text-gray-500 mt-1 mb-3">Recommended size: 400x400px, under 2MB.</p>
                                        <div className="flex gap-3">
                                            <div className="relative">
                                                <CloudinaryUpload
                                                    onUploadSuccess={handleProfilePicUpdate}
                                                    buttonText="Upload New Image"
                                                    folder="influencer_profiles"
                                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors border-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cover Image Upload */}
                                <div className="space-y-4 pb-6 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900">Cover Image</h3>
                                    <div className="relative w-full h-40 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-200 overflow-hidden group">
                                        {user?.coverPic ? (
                                            <img src={user.coverPic} alt="Cover" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                                <Camera className="w-8 h-8 mb-2" />
                                                <p className="text-xs font-medium">No cover image uploaded</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <CloudinaryUpload
                                                onUploadSuccess={async (info) => {
                                                    try {
                                                        const res = await fetch('/api/influencer/profile', {
                                                            method: 'PATCH',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ coverPic: info.secure_url })
                                                        });
                                                        if (res.ok) {
                                                            const meRes = await fetch('/api/auth/me');
                                                            const meData = await meRes.json();
                                                            if (meData.user) login(meData.user);
                                                        }
                                                    } catch (e) {
                                                        console.error("Failed to update cover pic", e);
                                                    }
                                                }}
                                                buttonText="Upload Cover"
                                                folder="influencer_covers"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">Recommended size: 1500x500px, under 5MB. This will be displayed at the top of your profile.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileData.fullName}
                                            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50"
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="text"
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Content Categories</label>
                                        <div className="flex flex-wrap gap-2">
                                            {AVAILABLE_CATEGORIES.map(cat => {
                                                const isSelected = profileData.category?.split(',').map(c => c.trim()).includes(cat);
                                                return (
                                                    <button
                                                        key={cat}
                                                        type="button"
                                                        onClick={() => toggleCategory(cat)}
                                                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${isSelected
                                                                ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                                                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {cat}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">Select up to 5 categories that best describe your content.</p>
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={profileData.location}
                                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm h-32 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SOCIAL MEDIA TAB (Maintains Dynamic Add Feature) */}
                        {activeTab === "Social Media & Stats" && (
                            <div className="space-y-6 flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Social Media Profiles</h2>
                                        <p className="text-sm text-gray-500 mt-1">Connect your accounts and update your reach.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addPlatform}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-all text-sm"
                                    >
                                        <Plus className="w-4 h-4" /> Add Platform
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {socialPlatforms.map((platform) => (
                                        <div key={platform.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50/50 border border-gray-200 rounded-xl md:items-end">
                                            <div className="md:col-span-3">
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Platform</label>
                                                <select
                                                    value={platform.type}
                                                    onChange={(e) => updatePlatform(platform.id, 'type', e.target.value)}
                                                    className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm font-bold bg-white"
                                                >
                                                    <option value="instagram">Instagram</option>
                                                    <option value="youtube">YouTube</option>
                                                    <option value="twitter">Twitter / X</option>
                                                    <option value="tiktok">TikTok</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-5">
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Profile Link</label>
                                                <input
                                                    type="text"
                                                    value={platform.handle}
                                                    onChange={(e) => updatePlatform(platform.id, 'handle', e.target.value)}
                                                    className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Followers</label>
                                                <input
                                                    type="number"
                                                    value={platform.followers}
                                                    onChange={(e) => updatePlatform(platform.id, 'followers', e.target.value)}
                                                    className="w-full border-gray-200 border p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm font-bold bg-white"
                                                />
                                            </div>
                                            <div className="md:col-span-1 flex justify-center pb-1">
                                                <button
                                                    type="button"
                                                    onClick={() => removePlatform(platform.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SECURITY TAB (Matching Brand Side Style) */}
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
                                    <button type="button" className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-sm">
                                        Update Password
                                    </button>
                                </div>

                                {/* Danger Zone */}
                                <div className="pt-8 border-t border-red-100">
                                    <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
                                    <p className="text-sm text-gray-600 mb-4">Deleting your account is permanent. All campaign data and history will be lost.</p>
                                    <button type="button" className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg text-sm border border-red-200 transition-colors flex items-center gap-2">
                                        <Trash2 className="w-4 h-4" /> Delete Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Action Footer (Matching Brand Side) */}
                        <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between">
                            {isSaved ? (
                                <span className="text-green-600 text-sm font-medium flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> Settings saved successfully
                                </span>
                            ) : <span></span>}

                            <div className="flex gap-3 justify-end w-full">
                                <button type="button" className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
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
