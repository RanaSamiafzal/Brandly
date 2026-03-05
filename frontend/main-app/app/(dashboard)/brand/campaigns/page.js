"use client";
import { useState, useEffect, useRef } from "react";
import { Users, CheckCircle2, AlertCircle, Clock, Search, MoreVertical, Plus, Pencil, Trash2, X, Sparkles, Save } from "lucide-react";
import Link from "next/link";

export default function BrandCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [activeTab, setActiveTab] = useState("Active");
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);

    // Edit modal state
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    // Delete confirmation state
    const [deletingCampaign, setDeletingCampaign] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        fetchCampaigns();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const fetchCampaigns = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/brand/campaigns");
            const data = await res.json();
            if (data.campaigns) {
                setCampaigns(data.campaigns.map((c) => ({
                    id: c.id,
                    name: c.title,
                    description: c.description,
                    status: c.status.charAt(0).toUpperCase() + c.status.slice(1).toLowerCase(),
                    deadline: c.campaignTimeline || "TBD",
                    influencerCount: c._count?.requests || 0,
                    budget: `$${c.budgetMin || 0} – $${c.budgetMax || 0}`,
                    budgetMin: c.budgetMin,
                    budgetMax: c.budgetMax,
                    targetCategory: c.targetCategory || [],
                    targetPlatform: c.targetPlatform || [],
                    deliverables: c.deliverables || "",
                    targetAudience: c.targetAudience || "",
                    additionalRequirements: c.additionalRequirements || "",
                    campaignTimeline: c.campaignTimeline || "",
                    image: `https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=300&fit=crop`,
                })));
            }
        } catch (error) {
            console.error("Failed to fetch campaigns", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openEdit = (campaign) => {
        setEditingCampaign(campaign);
        setEditForm({
            title: campaign.name,
            description: campaign.description || "",
            budgetMin: campaign.budgetMin || 0,
            budgetMax: campaign.budgetMax || 0,
            campaignTimeline: campaign.campaignTimeline || "",
            deliverables: campaign.deliverables || "",
            targetAudience: campaign.targetAudience || "",
            additionalRequirements: campaign.additionalRequirements || "",
        });
        setOpenMenuId(null);
    };

    const handleSaveEdit = async () => {
        if (!editingCampaign) return;
        setIsSaving(true);
        try {
            const res = await fetch(`/api/brand/campaigns/${editingCampaign.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...editForm,
                    budgetMin: parseFloat(editForm.budgetMin) || 0,
                    budgetMax: parseFloat(editForm.budgetMax) || 0,
                }),
            });
            if (res.ok) {
                setEditingCampaign(null);
                await fetchCampaigns();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to save changes");
            }
        } catch (error) {
            console.error("Edit failed:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingCampaign) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/brand/campaigns/${deletingCampaign.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setDeletingCampaign(null);
                setCampaigns((prev) => prev.filter((c) => c.id !== deletingCampaign.id));
            } else {
                const err = await res.json();
                alert(err.error || "Failed to delete campaign");
            }
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const stats = [
        { label: "Total Campaigns", value: campaigns.length.toString(), icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Active", value: campaigns.filter((c) => c.status === "Active" || c.status === "In_progress").length.toString(), icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
        { label: "Pending", value: campaigns.filter((c) => c.status === "Pending" || c.status === "Draft").length.toString(), icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50" },
        { label: "Completed", value: campaigns.filter((c) => c.status === "Completed").length.toString(), icon: AlertCircle, color: "text-gray-500", bg: "bg-gray-50" },
    ];

    const filteredCampaigns = campaigns.filter((c) =>
        activeTab === "Active" ? (c.status === "Active" || c.status === "In_progress") :
            activeTab === "Pending" ? (c.status === "Pending" || c.status === "Draft") :
                c.status === "Completed"
    );

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto space-y-8 px-4 md:px-12 animate-pulse">
                <div className="h-10 bg-gray-200 rounded-lg w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 bg-gray-50 rounded-xl border" />)}
                </div>
                <div className="h-64 bg-gray-50 rounded-xl border mt-8" />
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Campaign Hub</h1>
                    <p className="text-gray-500 mt-1 text-lg">Manage and track your brand's marketing campaigns.</p>
                </div>
                <Link href="/brand/create-campaign">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm">
                        <Plus className="w-5 h-5" />
                        Create Campaign
                    </button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color} flex-shrink-0`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Campaign Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                        {["Active", "Pending", "Completed"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 inset-y-0 my-auto h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Campaign List */}
                <div className="divide-y divide-gray-100">
                    {filteredCampaigns.map((campaign) => (
                        <div key={campaign.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                            <div className="flex gap-5 items-start">
                                {/* Image */}
                                <div className="w-40 h-28 rounded-xl overflow-hidden flex-shrink-0 hidden md:block">
                                    <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${campaign.status === "Active" || campaign.status === "In_progress" ? "bg-green-100 text-green-700" :
                                                    campaign.status === "Pending" || campaign.status === "Draft" ? "bg-yellow-100 text-yellow-700" :
                                                        "bg-gray-100 text-gray-700"
                                                    }`}>
                                                    {campaign.status.replace('_', ' ')}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {campaign.deadline}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-bold text-gray-900 truncate">{campaign.name}</h3>
                                            {campaign.description && (
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{campaign.description}</p>
                                            )}
                                        </div>

                                        {/* Context Menu */}
                                        <div className="relative flex-shrink-0" ref={openMenuId === campaign.id ? menuRef : null}>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === campaign.id ? null : campaign.id)}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {openMenuId === campaign.id && (
                                                <div className="absolute right-0 top-8 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                                    <button
                                                        onClick={() => openEdit(campaign)}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                                    >
                                                        <Pencil className="w-4 h-4 text-blue-500" />
                                                        Edit Campaign
                                                    </button>
                                                    <Link href={`/brand/ai-match/${campaign.id}`} onClick={() => setOpenMenuId(null)}>
                                                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                                                            <Sparkles className="w-4 h-4 text-purple-500" />
                                                            AI Match
                                                        </button>
                                                    </Link>
                                                    <div className="border-t border-gray-100" />
                                                    <button
                                                        onClick={() => { setDeletingCampaign(campaign); setOpenMenuId(null); }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-0.5">Budget</p>
                                            <p className="text-sm font-bold text-gray-900">{campaign.budget}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-0.5">Target</p>
                                            <p className="text-sm font-bold text-gray-900 capitalize truncate">
                                                {campaign.targetCategory?.join(", ") || "Any"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 mb-0.5">Platforms</p>
                                            <p className="text-sm font-bold text-gray-900 capitalize truncate">
                                                {campaign.targetPlatform?.join(", ") || "Any"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredCampaigns.length === 0 && (
                        <div className="py-20 text-center text-gray-400">
                            <Users className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                            <p className="text-lg font-bold text-gray-700">No {activeTab.toLowerCase()} campaigns</p>
                            <p className="text-sm mt-1">Create a new campaign to get started.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── EDIT MODAL ─── */}
            {editingCampaign && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Pencil className="w-4 h-4 text-blue-600" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Edit Campaign</h2>
                            </div>
                            <button onClick={() => setEditingCampaign(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Campaign Title *</label>
                                <input
                                    type="text"
                                    value={editForm.title || ""}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                                <textarea
                                    value={editForm.description || ""}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    rows={3}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Min Budget ($)</label>
                                    <input
                                        type="number"
                                        value={editForm.budgetMin || ""}
                                        onChange={(e) => setEditForm({ ...editForm, budgetMin: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Budget ($)</label>
                                    <input
                                        type="number"
                                        value={editForm.budgetMax || ""}
                                        onChange={(e) => setEditForm({ ...editForm, budgetMax: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Campaign Timeline</label>
                                <input
                                    type="text"
                                    value={editForm.campaignTimeline || ""}
                                    onChange={(e) => setEditForm({ ...editForm, campaignTimeline: e.target.value })}
                                    placeholder="e.g. June 1 – July 15"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Audience</label>
                                <input
                                    type="text"
                                    value={editForm.targetAudience || ""}
                                    onChange={(e) => setEditForm({ ...editForm, targetAudience: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deliverables</label>
                                <textarea
                                    value={editForm.deliverables || ""}
                                    onChange={(e) => setEditForm({ ...editForm, deliverables: e.target.value })}
                                    rows={2}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Requirements</label>
                                <textarea
                                    value={editForm.additionalRequirements || ""}
                                    onChange={(e) => setEditForm({ ...editForm, additionalRequirements: e.target.value })}
                                    rows={2}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                            <button
                                onClick={() => setEditingCampaign(null)}
                                className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={isSaving}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-70"
                            >
                                {isSaving ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                                ) : (
                                    <><Save className="w-4 h-4" /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── DELETE CONFIRMATION MODAL ─── */}
            {deletingCampaign && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                                <Trash2 className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Delete Campaign?</h2>
                                <p className="text-sm text-gray-500">This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-6">
                            <p className="text-sm text-gray-600">You're about to delete <span className="font-bold text-gray-900">"{deletingCampaign.name}"</span>. The campaign will be archived and no longer visible.</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeletingCampaign(null)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                            >
                                {isDeleting ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Deleting...</>
                                ) : (
                                    <><Trash2 className="w-4 h-4" /> Yes, Delete</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
