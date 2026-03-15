"use client";
import { useState, useEffect } from "react";
import { X, Send, AlertTriangle, CheckCircle2, DollarSign, MessageSquare, Megaphone, Sparkles, Globe } from "lucide-react";

export default function ApplyModal({ brandId, brandName, onClose, onSuccess }) {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [note, setNote] = useState("");
    const [proposedBudget, setProposedBudget] = useState("");
    const [portfolioLink, setPortfolioLink] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/influencer/brands/${brandId}/campaigns`);
                const data = await res.json();
                if (res.ok) {
                    setCampaigns(data.campaigns || []);
                    if (data.campaigns?.length > 0) {
                        setSelectedCampaign(data.campaigns[0].id);
                        setProposedBudget(data.campaigns[0].budgetMin.toString());
                    }
                } else {
                    setError(data.error || "Failed to fetch campaigns");
                }
            } catch (err) {
                setError("An unexpected error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        if (brandId) fetchCampaigns();
    }, [brandId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCampaign) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/influencer/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    campaignId: selectedCampaign,
                    proposedBudget: parseFloat(proposedBudget),
                    note,
                    portfolioLink
                })
            });

            const data = await res.json();
            if (res.ok) {
                // Emit socket event for real-time notification
                import("socket.io-client").then(({ io }) => {
                    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");
                    socket.emit('send_request', {
                        brandId: data.request.receiverId,
                        request: data.request
                    });
                    // Close socket after short delay to ensure emission
                    setTimeout(() => socket.close(), 1000);
                });

                onSuccess();
                onClose();
            } else {
                setError(data.error || "Failed to submit application");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedCampaignData = campaigns.find(c => c.id === selectedCampaign);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Apply to {brandName}</h2>
                            <p className="text-blue-100 text-sm mt-0.5 font-medium">Pitch your collaboration ideas</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-shake">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="space-y-4 py-8 text-center text-gray-500">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="animate-pulse font-medium">Fetching active campaigns...</p>
                        </div>
                    ) : campaigns.length === 0 ? (
                        <div className="text-center py-12 px-6">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Megaphone className="w-8 h-8 text-gray-200" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">No Active Campaigns</h3>
                            <p className="text-gray-500 mt-1 text-sm">This brand currently has no active campaigns available for application.</p>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-8 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all text-sm uppercase tracking-widest"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Campaign Selection */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                    <Megaphone className="w-3.5 h-3.5" />
                                    Select Campaign
                                </label>
                                <select
                                    value={selectedCampaign}
                                    onChange={(e) => {
                                        const campaign = campaigns.find(c => c.id === e.target.value);
                                        setSelectedCampaign(e.target.value);
                                        if (campaign) setProposedBudget(campaign.budgetMin.toString());
                                    }}
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                                    required
                                >
                                    {campaigns.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </select>
                                {selectedCampaignData && (
                                    <p className="text-xs text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-xl inline-block mt-1">
                                        Campaign Budget: ${selectedCampaignData.budgetMin} - ${selectedCampaignData.budgetMax}
                                    </p>
                                )}
                            </div>

                            {/* Proposed Budget */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    Your Proposed Rate ($)
                                </label>
                                <input
                                    type="number"
                                    value={proposedBudget}
                                    onChange={(e) => setProposedBudget(e.target.value)}
                                    placeholder="Enter your rate..."
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-black text-xl text-gray-900"
                                    required
                                />
                            </div>

                            {/* Pitch Note */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    Your Pitch
                                </label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Tell the brand about your work and why you're a great fit for this campaign..."
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all min-h-[120px] max-h-[200px] text-gray-800 placeholder:text-gray-400 font-medium"
                                    required
                                />
                            </div>

                            {/* Portfolio Link */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                                    <Globe className="w-3.5 h-3.5" />
                                    Portfolio Link (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={portfolioLink}
                                    onChange={(e) => setPortfolioLink(e.target.value)}
                                    placeholder="https://yourportfolio.com"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder:text-gray-400 font-medium"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-4 px-6 border border-gray-100 text-gray-500 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] py-4 px-6 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    Submit Application
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
