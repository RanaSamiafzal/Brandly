"use client";
import { Button } from "@repo/ui";
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

export default function HelpCenterPage() {
    const categories = [
        {
            title: "Getting Started",
            description: "Learn the basics of using Brandly",
            articles: "12 articles",
            icon: <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
            bg: "bg-blue-50"
        },
        {
            title: "Finding Influencers",
            description: "Search and discover perfect matches",
            articles: "8 articles",
            icon: <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
            bg: "bg-green-50"
        },
        {
            title: "Campaign Management",
            description: "Create and manage your campaigns",
            articles: "16 articles",
            icon: <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
            bg: "bg-yellow-50"
        },
        {
            title: "Billing & Payments",
            description: "Pricing, invoices, and transactions",
            articles: "10 articles",
            icon: <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
            bg: "bg-purple-50"
        },
        {
            title: "Account & Security",
            description: "Manage your profile and privacy",
            articles: "7 articles",
            icon: <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            bg: "bg-red-50"
        },
        {
            title: "Settings & Features",
            description: "Customize your experience",
            articles: "9 articles",
            icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            bg: "bg-gray-100"
        }
    ];

    const popularArticles = [
        { title: "How to create your first campaign", category: "Getting Started", views: "5.2K views" },
        { title: "Understanding influencer metrics and analytics", category: "Campaign Management", views: "4.8K views" },
        { title: "How to search for influencers using filters", category: "Finding Influencers", views: "4.5K views" },
        { title: "Setting up your payment method", category: "Billing & Payments", views: "3.9K views" },
        { title: "Getting verified on Brandly", category: "Account & Security", views: "3.2K views" },
    ];

    return (
        <div className="pt-24 pb-0 bg-gray-50/30 min-h-screen">
            <Navbar />

            {/* Header & Search */}
            <div className="bg-white border-b border-gray-100 pb-16 pt-10">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-100 text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-8">
                        How can we help you?
                    </h1>

                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full h-16 pl-14 pr-5 rounded-2xl border border-gray-200 bg-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            placeholder="Search for articles, guides, and tutorials..."
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Categories Grid */}
                <div className="mb-24">
                    <h2 className="text-2xl font-bold text-center text-[#0F172A] mb-10">Browse by Category</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat, i) => (
                            <Link href="#" key={i} className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-blue-100 transition-all hover:-translate-y-1 group flex flex-col items-start">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#0F172A] mb-2 flex items-center justify-between w-full">
                                    {cat.title}
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">
                                    {cat.description}
                                </p>
                                <span className="text-blue-600 text-sm font-semibold group-hover:underline">
                                    {cat.articles}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Split Section: Popular & Videos */}
                <div className="grid lg:grid-cols-2 gap-16 mb-24">

                    {/* Popular Articles List */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#0F172A] mb-8 flex items-center gap-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            Popular Articles
                        </h2>
                        <div className="space-y-4">
                            {popularArticles.map((article, i) => (
                                <Link href="#" key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group">
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors mb-1">
                                            {article.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <span className="text-blue-600 font-medium">{article.category}</span>
                                            <span>•</span>
                                            <span>{article.views}</span>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Video Tutorials */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#0F172A] mb-8 flex items-center gap-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            Video Tutorials
                        </h2>
                        <div className="space-y-4">
                            {[
                                { title: "Platform Overview & Quick Start Guide", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", time: "5:32" },
                                { title: "How to Find the Perfect Influencer", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", time: "8:15" },
                                { title: "Creating Your First Campaign", img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", time: "12:05" },
                            ].map((video, i) => (
                                <Link href="#" key={i} className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all group">
                                    <div className="relative w-32 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-900 border border-gray-200 group-hover:border-blue-300">
                                        <img src={video.img} alt={video.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                                <svg className="w-4 h-4 text-blue-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                                            {video.time}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {video.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Resources Links */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <Link href="#" className="bg-blue-50/50 hover:bg-blue-50 p-8 rounded-[24px] transition-colors group">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253" /></svg></div>
                        <h3 className="font-bold text-[#0F172A] mb-2 text-lg">Documentation</h3>
                        <p className="text-gray-500 text-sm mb-4">Detailed guides and API documentation for developers</p>
                        <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:underline">View Docs <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
                    </Link>
                    <Link href="#" className="bg-green-50/50 hover:bg-green-50 p-8 rounded-[24px] transition-colors group">
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg></div>
                        <h3 className="font-bold text-[#0F172A] mb-2 text-lg">Community Forum</h3>
                        <p className="text-gray-500 text-sm mb-4">Connect with other users and share experiences</p>
                        <span className="text-green-600 font-semibold text-sm flex items-center gap-1 group-hover:underline">Join Forum <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
                    </Link>
                    <Link href="#" className="bg-yellow-50/50 hover:bg-yellow-50 p-8 rounded-[24px] transition-colors group">
                        <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></div>
                        <h3 className="font-bold text-[#0F172A] mb-2 text-lg">API Reference</h3>
                        <p className="text-gray-500 text-sm mb-4">Technical documentation for integrations</p>
                        <span className="text-yellow-600 font-semibold text-sm flex items-center gap-1 group-hover:underline">Explore API <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
                    </Link>
                </div>

            </div>

            {/* Contact Support CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 py-24 text-center px-4">
                <div className="max-w-xl mx-auto">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 text-white border border-white/20">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Still Need Help?</h2>
                    <p className="text-white/80 text-lg mb-10">Our support team is here to assist you 24/7</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white text-blue-600 font-bold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                            Contact Support
                        </Button>
                        <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white/10 text-white font-bold hover:bg-white/20 hover:scale-105 active:scale-95 transition-all outline outline-1 outline-white/30 backdrop-blur-sm shadow-xl shadow-black/10">
                            Live Chat
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
}
