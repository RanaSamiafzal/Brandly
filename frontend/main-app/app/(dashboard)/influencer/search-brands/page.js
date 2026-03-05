"use client";
import { useState, useEffect } from "react";
import {
    Search,
    MapPin,
    DollarSign,
    Megaphone,
    Filter,
    ChevronRight,
    Heart,
    Send,
    ExternalLink,
    Sparkles,
    Star,
    ShieldCheck,
    CheckCircle2,
    MessageSquare
} from "lucide-react";
import Link from "next/link";
import ApplyModal from "../../../../components/influencer/ApplyModal";

export default function SearchBrandsPage() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        setMounted(true);
        fetchBrands();
    }, []);

    const fetchBrands = async (query = "", industry = "") => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (query) params.append("query", query);
            if (industry && industry !== "All Niches") params.append("industry", industry);

            const response = await fetch(`/api/influencer/brands/search?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                const formattedBrands = data.brands.map(b => ({
                    id: b.id,
                    name: b.brandName,
                    logo: b.logo || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
                    description: b.description || "No description provided",
                    categories: b.industry ? [b.industry] : ["General"],
                    location: b.address || "Global",
                    budget: b.budgetMin ? `$${b.budgetMin}-$${b.budgetMax}` : "Contact for budget",
                    activeCampaigns: b._count?.campaigns || 0
                }));
                setBrands(formattedBrands);
            }
        } catch (error) {
            console.error("Failed to fetch brands", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            fetchBrands(searchQuery);
        }
    };

    const handleApplySuccess = () => {
        setToast({ type: "success", message: "Application submitted successfully!" });
        setTimeout(() => setToast(null), 3000);
        fetchBrands(searchQuery); // Refresh counts
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-2">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Search Brands</h1>
                    <p className="text-gray-500 mt-1.5 flex items-center gap-2">
                        Find brands to collaborate with
                    </p>
                </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 inset-y-0 my-auto w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Search brands by name or niche..."
                        className="w-full pl-14 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border font-bold transition-all shadow-sm ${showFilters
                        ? "bg-blue-600 border-blue-600 text-white shadow-blue-100"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    {showFilters ? "Close Filters" : "Filters"}
                </button>
            </div>

            {/* Clickable Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
                {[
                    { label: "All Niches", icon: Sparkles },
                    { label: "High Budget", icon: DollarSign },
                    { label: "Top Rated", icon: Star },
                    { label: "Verified Only", icon: ShieldCheck },
                    { label: "New Tech", icon: Megaphone }
                ].map((f) => (
                    <button
                        key={f.label}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-black text-gray-500 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all shadow-sm uppercase tracking-widest"
                    >
                        {f.icon && <f.icon className="w-3.5 h-3.5" />}
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Brands Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4 animate-pulse h-[400px]">
                            <div className="flex justify-between items-start">
                                <div className="w-16 h-16 rounded-2xl bg-gray-100" />
                                <div className="w-10 h-10 rounded-full bg-gray-50" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-6 bg-gray-100 rounded w-1/2" />
                                <div className="h-4 bg-gray-50 rounded w-full" />
                                <div className="h-4 bg-gray-50 rounded w-3/4" />
                            </div>
                            <div className="flex gap-2">
                                <div className="h-6 bg-gray-50 rounded-full w-20" />
                                <div className="h-6 bg-gray-50 rounded-full w-24" />
                            </div>
                            <div className="space-y-3 pt-4">
                                <div className="h-4 bg-gray-50 rounded w-1/2" />
                                <div className="h-4 bg-gray-50 rounded w-1/3" />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <div className="h-12 bg-gray-100 rounded-2xl flex-1" />
                                <div className="h-12 bg-gray-100 rounded-2xl flex-1" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : brands.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brands.map((brand, idx) => (
                        <div
                            key={brand.id}
                            className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md ring-4 ring-gray-50 group-hover:ring-blue-50 transition-all">
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <button className="p-2.5 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors border border-gray-100 hover:border-red-100">
                                    <Heart className="w-5 h-5 transition-transform active:scale-90" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{brand.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                    {brand.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {brand.categories.map((cat) => (
                                    <span key={cat} className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-full uppercase tracking-wider">
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-3 mb-8 border-t border-gray-50 pt-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-gray-700">{brand.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-gray-700">{brand.budget}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                        <Megaphone className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-gray-700">{brand.activeCampaigns} active campaigns</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Link href={`/influencer/brands/${brand.id}`} className="w-full">
                                    <button className="w-full py-3 px-4 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                                        View Profile
                                    </button>
                                </Link>
                                <button
                                    onClick={() => setSelectedBrand({ id: brand.id, name: brand.name })}
                                    className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-[0.98]"
                                >
                                    <Send className="w-4 h-4" />
                                    Apply
                                </button>
                            </div>
                            <div className="mt-3">
                                <Link href="/influencer/collaborations" className="w-full">
                                    <button className="w-full py-3 px-4 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                                        <MessageSquare className="w-4 h-4" /> Message Brand
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-gray-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No brands found</h3>
                    <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                        We couldn't find any brands matching your search. Try adjusting your search query.
                    </p>
                </div>
            )}

            {/* Application Modal */}
            {selectedBrand && (
                <ApplyModal
                    brandId={selectedBrand.id}
                    brandName={selectedBrand.name}
                    onClose={() => setSelectedBrand(null)}
                    onSuccess={handleApplySuccess}
                />
            )}

            {/* Toast Feedback */}
            {toast && (
                <div className={`fixed bottom-8 right-8 z-[120] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300 ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}>
                    {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    <p className="font-bold text-sm tracking-tight">{toast.message}</p>
                </div>
            )}
        </div>
    );
}
