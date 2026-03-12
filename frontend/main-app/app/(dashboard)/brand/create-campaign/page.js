"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Image as ImageIcon, Sparkles, Youtube, Instagram, Twitter, Check } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "../../../../components/brand/CloudinaryUpload";

export default function CreateCampaign() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        budgetMin: "",
        budgetMax: "",
        deliverables: "",
        targetAudience: "",
        additionalRequirements: "",
        startDate: "",
        endDate: ""
    });

    const [platforms, setPlatforms] = useState({
        instagram: false,
        youtube: false,
        tiktok: false,
        twitter: false
    });

    const [categories, setCategories] = useState({
        fashion: false,
        tech: false,
        lifestyle: false,
        fitness: false,
        food: false
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePlatform = (platform) => {
        setPlatforms({ ...platforms, [platform]: !platforms[platform] });
    };

    const toggleCategory = (category) => {
        setCategories({ ...categories, [category]: !categories[category] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare lists for multi-selects
            const targetCategory = Object.keys(categories).filter(c => categories[c]);
            const targetPlatform = Object.keys(platforms).filter(p => platforms[p]);

            const res = await fetch('/api/brand/campaigns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    targetCategory,
                    targetPlatform,
                    budgetMin: parseFloat(formData.budgetMin) || 0,
                    budgetMax: parseFloat(formData.budgetMax) || 0,
                    // Combine start + end dates into a readable timeline string
                    campaignTimeline: formData.startDate && formData.endDate
                        ? `${new Date(formData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – ${new Date(formData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : formData.startDate || "",
                })
            });

            const data = await res.json();
            if (data.campaign) {
                router.push(`/brand/ai-match/${data.campaign.id}`);
            } else {
                throw new Error(data.error || "Failed to create campaign");
            }
        } catch (error) {
            console.error("Campaign creation failed:", error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-screen-2xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
                <p className="text-gray-500 mt-1">Fill out the details to find the perfect influencers for your brand.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Basic Info */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="e.g., Summer Collection Launch"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm h-32 resize-none"
                                placeholder="Describe your campaign goals, brand voice, and what you expect from the influencer..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Budget ($)</label>
                                <input
                                    type="number"
                                    name="budgetMin"
                                    value={formData.budgetMin}
                                    onChange={handleInputChange}
                                    className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Budget ($) *</label>
                                <input
                                    type="number"
                                    name="budgetMax"
                                    value={formData.budgetMax}
                                    onChange={handleInputChange}
                                    className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="2000"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    min={formData.startDate || undefined}
                                    className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Campaign Media */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-gray-900">Campaign Media</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-full md:w-64 aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
                            {formData.image && (
                                <img src={formData.image} className="w-full h-full object-cover absolute inset-0 z-0" alt="Campaign Preview" />
                            )}
                            
                            <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center ${formData.image ? 'opacity-0 group-hover:opacity-100 transition-opacity bg-black/40' : 'p-4'}`}>
                                {!formData.image && <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />}
                                <CloudinaryUpload
                                    onUploadSuccess={(info) => {
                                        // Force clear overflow in case widget unmounts/closes abnormally
                                        document.body.style.overflow = '';
                                        setFormData(prev => ({ ...prev, image: info.secure_url }));
                                    }}
                                    buttonText={formData.image ? "Change" : "Upload Cover"}
                                    folder="campaign_images"
                                    className={formData.image ? "bg-white/20 backdrop-blur-md text-white border-white/40 hover:bg-white/30" : ""}
                                />
                                {!formData.image && <p className="text-[10px] text-gray-400 mt-2">Recommended: 16:9 aspect ratio</p>}
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="font-bold text-gray-900">Campaign Cover Image</h3>
                            <p className="text-sm text-gray-500">This image will be shown on your campaign overview and search results. A high-quality image helps attract the right influencers.</p>
                            <div className="flex items-center gap-2 text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-lg w-fit">
                                <Sparkles className="w-3 h-3" /> AI Match also uses this for context
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Targeting */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-gray-900">Targeting & Platform</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Target Platforms</label>
                            <div className="flex flex-wrap gap-3">
                                <button type="button" onClick={() => togglePlatform('instagram')} className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${platforms.instagram ? 'bg-pink-50 border-pink-200 text-pink-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                    <Instagram className="w-4 h-4" /> Instagram {platforms.instagram && <Check className="w-4 h-4" />}
                                </button>
                                <button type="button" onClick={() => togglePlatform('youtube')} className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${platforms.youtube ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                    <Youtube className="w-4 h-4" /> YouTube {platforms.youtube && <Check className="w-4 h-4" />}
                                </button>
                                <button type="button" onClick={() => togglePlatform('tiktok')} className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${platforms.tiktok ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                    TikTok {platforms.tiktok && <Check className="w-4 h-4" />}
                                </button>
                                <button type="button" onClick={() => togglePlatform('twitter')} className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${platforms.twitter ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                    <Twitter className="w-4 h-4" /> Twitter / X {platforms.twitter && <Check className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Niche Category</label>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(categories).map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => toggleCategory(cat)}
                                        className={`px-4 py-2 border rounded-full text-sm font-medium capitalize transition-colors ${categories[cat] ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                            <input
                                type="text"
                                name="targetAudience"
                                value={formData.targetAudience}
                                onChange={handleInputChange}
                                className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="e.g., Women aged 18-35 in the US interested in sustainable fashion"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 3: Requirements */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-gray-900">Deliverables & Requirements</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Deliverables *</label>
                            <textarea
                                name="deliverables"
                                value={formData.deliverables}
                                onChange={handleInputChange}
                                className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm h-24 resize-none"
                                placeholder="e.g., 2 Instagram Posts, 1 Reel, and 3 Stories over a 2-week period."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements/Do's and Don'ts</label>
                            <textarea
                                name="additionalRequirements"
                                value={formData.additionalRequirements}
                                onChange={handleInputChange}
                                className="w-full border-gray-200 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm h-24 resize-none"
                                placeholder="List any strict guidelines, forbidden keywords, or mandatory hashtags..."
                            />
                        </div>
                    </div>
                </div>

                {/* Fixed Bottom Bar */}
                <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex justify-between items-center">
                    <div className="hidden sm:block">
                        <p className="text-sm text-gray-500">Upon saving, AI matching will automatically begin.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link href="/brand" className="w-full sm:w-auto">
                            <button type="button" className="w-full px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" /> Save & Launch AI Match
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
