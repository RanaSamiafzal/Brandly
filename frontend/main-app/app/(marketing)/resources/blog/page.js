"use client";
import { Button } from "@repo/ui";
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

export default function BlogPage() {
    const categories = ["Marketing Strategy", "Analytics", "Influencer Tips"];

    const latestArticles = [
        {
            category: "Analytics",
            title: "How to Measure ROI from Influencer Campaigns",
            description: "Learn the key metrics and strategies to track and measure the return on investment from your...",
            author: "Michael Chen",
            date: "February 12, 2026",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            category: "Influencer Tips",
            title: "10 Tips for Finding the Perfect Brand Partnerships",
            description: "Influencers, discover how to identify and secure brand partnerships that align with your values...",
            author: "Emma Davis",
            date: "February 10, 2026",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            category: "Trends",
            title: "The Rise of Micro-Influencers: Why Small Can Be Better",
            description: "Explore why micro-influencers are becoming increasingly valuable for brands seeking...",
            author: "David Martinez",
            date: "February 8, 2026",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            category: "Partnerships",
            title: "Building Long-Term Influencer Relationships",
            description: "Discover strategies for nurturing lasting partnerships that benefit both brands and...",
            author: "Lisa Anderson",
            date: "February 5, 2026",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            category: "Content Strategy",
            title: "Content Authenticity: The Key to Influencer Success",
            description: "Learn why authenticity matters more than ever and how to maintain genuine connections with...",
            author: "James Wilson",
            date: "February 3, 2026",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            category: "Legal & Compliance",
            title: "Navigating FTC Guidelines for Influencer Marketing",
            description: "A comprehensive guide to understanding and complying with FTC disclosure requirements...",
            author: "Rachel Green",
            date: "February 1, 2026",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="pt-24 pb-0 bg-white min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
                        Brandly Blog
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Insights, tips, and trends in influencer marketing to help you succeed
                    </p>
                </div>

                {/* Featured Article */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden mb-20 group">
                    <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-full min-h-[400px] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                                alt="Featured article"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Featured
                                </span>
                            </div>
                        </div>
                        <div className="p-10 md:p-14 flex flex-col justify-center">
                            <span className="text-blue-600 font-semibold text-sm mb-3">Marketing Strategy</span>
                            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-4 leading-tight">
                                The Ultimate Guide to Influencer Marketing in 2026
                            </h2>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                Discover the latest trends, strategies, and best practices for successful influencer marketing campaigns in the modern digital landscape.
                            </p>

                            <div className="flex items-center gap-6 mb-8 text-sm text-gray-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    Sarah Johnson
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    February 15, 2026
                                </div>
                                <div>8 min read</div>
                            </div>

                            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2 font-bold h-12 px-8 shadow-lg shadow-blue-100 transition-all hover:scale-[1.02]">
                                Read Article
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Latest Articles Header & Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <h2 className="text-3xl font-extrabold text-[#0F172A]">Latest Articles</h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, i) => (
                            <button key={i} className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {latestArticles.map((article, i) => (
                        <Link href={`#`} key={i} className="group bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 overflow-hidden flex flex-col">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <span className="text-blue-600 font-semibold text-xs mb-3 uppercase tracking-wider">{article.category}</span>
                                <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                                    {article.description}
                                </p>
                                <div className="border-t border-gray-100 pt-5 mt-auto flex items-center justify-between text-xs text-gray-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        {article.author}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {article.date}
                                        </span>
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mb-24">
                    <Button variant="outline" className="border-2 border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600 font-bold px-8 h-12 rounded-xl transition-all">
                        Load More Articles
                    </Button>
                </div>

            </div>

            {/* Newsletter CTA using GenericCTA styles but custom content */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 py-24 text-center px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Stay Updated</h2>
                    <p className="text-white/80 text-lg mb-10">Subscribe to our newsletter for the latest insights and tips</p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 h-14 px-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm transition-all"
                            required
                        />
                        <Button type="submit" className="h-14 px-8 rounded-2xl bg-white text-blue-600 font-bold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
