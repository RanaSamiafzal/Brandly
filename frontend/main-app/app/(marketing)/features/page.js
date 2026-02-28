"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// ─── Animated Counter ──────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1600 }) {
    const [display, setDisplay] = useState("0");

    const isSpecial = target === "24/7";

    useEffect(() => {
        if (isSpecial) {
            const frames = ["12/3", "7/2", "18/5", "24/7"];
            let i = 0;
            const iv = setInterval(() => {
                setDisplay(frames[i++]);
                if (i >= frames.length) clearInterval(iv);
            }, duration / frames.length);
            return () => clearInterval(iv);
        }
        const match = target.match(/^(\d+\.?\d*)(.*)/);
        if (!match) { setDisplay(target); return; }
        const end = parseFloat(match[1]);
        const trail = match[2];
        const steps = 60;
        let step = 0;
        const iv = setInterval(() => {
            step++;
            const p = 1 - Math.pow(1 - step / steps, 3);
            setDisplay(`${Math.round(end * p)}${trail}`);
            if (step >= steps) { setDisplay(target); clearInterval(iv); }
        }, duration / steps);
        return () => clearInterval(iv);
    }, [target, duration, isSpecial]);

    return <span className="tabular-nums">{display}</span>;
}

// ─── Feature Card with hover effect ────────────────────────────────
function FeatureCard({ feature }) {
    const [hovered, setHovered] = useState(false);
    return (
        <Link href={feature.href}>
            <div
                className={`p-8 h-full rounded-2xl border transition-all duration-300 cursor-pointer ${hovered
                        ? "border-blue-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] bg-blue-50/30 -translate-y-1"
                        : "border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white"
                    }`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 transition-transform duration-300 ${hovered ? "scale-110" : ""}`}>
                    {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-200 ${hovered ? "text-blue-600" : "text-gray-900"}`}>
                    {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                <span className={`font-semibold flex items-center gap-2 transition-all duration-200 ${hovered ? "gap-3 text-blue-700" : "text-blue-600"}`}>
                    Learn more <span>→</span>
                </span>
            </div>
        </Link>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function FeaturesPage() {
    const [animate, setAnimate] = useState(false);
    useEffect(() => { const t = setTimeout(() => setAnimate(true), 300); return () => clearTimeout(t); }, []);

    const stats = [
        { value: "10K+", label: "Active Users" },
        { value: "50K+", label: "Campaigns Launched" },
        { value: "98%", label: "Success Rate" },
        { value: "24/7", label: "Support Available" },
    ];

    const coreFeatures = [
        {
            title: "Find Perfect Matches",
            description: "Advanced search filters to discover influencers that align with your brand values and target audience. Our AI-powered matching engine analyzes engagement rates, audience demographics, and content quality.",
            icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
            color: "bg-blue-50",
            href: "/features/find-matches",
        },
        {
            title: "Campaign Management",
            description: "Streamlined tools to create, manage, and track your influencer campaigns all in one place. From drafts to completion, manage every stage of your campaign lifecycle.",
            icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
            color: "bg-green-50",
            href: "/features/campaigns",
        },
        {
            title: "Real-time Analytics",
            description: "Monitor campaign performance with comprehensive analytics and detailed reporting dashboards. Track impressions, engagement, conversions, and ROI in real-time.",
            icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            color: "bg-orange-50",
            href: "/features/analytics",
        },
        {
            title: "Verified Profiles",
            description: "Work with confidence knowing all influencers are verified and authenticated by our team. Multi-step verification ensures authenticity and protects your brand.",
            icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            color: "bg-purple-50",
            href: "/features/verification",
        },
    ];

    const allFeatures = [
        {
            title: "Influencer Discovery",
            description: "Find the perfect influencer using our smart search with filters for niche, location, follower count, and engagement rate.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
            bg: "bg-blue-500",
        },
        {
            title: "AI-Powered Background",
            description: "Our AI engine analyses creator data and campaign goals to rank and suggest the most relevant collaborations.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
            bg: "bg-indigo-500",
        },
        {
            title: "Brand Connect",
            description: "Brands can browse verified influencer profiles and send partnership requests directly through the platform.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            bg: "bg-cyan-500",
        },
        {
            title: "Campaign Publishing",
            description: "Create, launch, and schedule campaigns with ease. Set deliverables, deadlines, and budgets all in one place.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
            bg: "bg-green-500",
        },
        {
            title: "Performance Reach",
            description: "Track reach, impressions, and engagement across all social platforms from a single analytics dashboard.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
            bg: "bg-orange-500",
        },
        {
            title: "Conversion Streak",
            description: "Monitor click-through rates and conversions tied to specific influencer posts to measure campaign ROI accurately.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
            bg: "bg-red-500",
        },
        {
            title: "Profile Verification",
            description: "Every influencer on Brandly goes through a multi-step identity verification process before listing their profile.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            bg: "bg-purple-500",
        },
        {
            title: "Brand Reports",
            description: "Receive detailed post-campaign reports summarising performance, influencer feedback, and audience response for every campaign.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
            bg: "bg-teal-500",
        },
        {
            title: "Secure Payments",
            description: "Release payments only when deliverables are met. Escrow-based payment protection keeps both parties safe.",
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
            bg: "bg-emerald-500",
        },
    ];

    const whyUs = [
        {
            icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            title: "Save Time",
            desc: "Automate discovery, outreach, and reporting to focus on what matters — building great campaigns.",
            bg: "bg-blue-50",
        },
        {
            icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
            title: "Boost ROI",
            desc: "Data-driven matching means your budget goes to influencers who actually convert your target audience.",
            bg: "bg-green-50",
        },
        {
            icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            title: "Verified Quality",
            desc: "Every creator is identity-checked and rated, so you always work with trusted, authentic professionals.",
            bg: "bg-purple-50",
        },
        {
            icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
            title: "Scale Faster",
            desc: "From startup to enterprise, Brandly scales with your business and keeps collaboration frictionless.",
            bg: "bg-orange-50",
        },
    ];

    const builtFor = [
        {
            title: "For Brands",
            color: "blue",
            items: [
                "Discover verified influencers instantly",
                "Launch campaigns in minutes",
                "Track ROI in real-time",
                "Secure payment escrow",
            ],
            href: "/signup/brand",
            cta: "Start as a Brand",
        },
        {
            title: "For Influencers",
            color: "purple",
            items: [
                "Get matched with top brands",
                "Manage all collaborations in one place",
                "Build your verified public profile",
                "Get paid securely on delivery",
            ],
            href: "/signup/influencer",
            cta: "Join as Influencer",
        },
        {
            title: "For Teams",
            color: "green",
            items: [
                "Shared campaign workspace",
                "Collaborative approval flows",
                "Role-based access controls",
                "Team-wide analytics overview",
            ],
            href: "/contact",
            cta: "Contact Sales",
        },
    ];

    const colorMap = {
        blue: { bg: "bg-blue-600", icon: "bg-blue-50 text-blue-600", check: "text-blue-600", btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-100" },
        purple: { bg: "bg-purple-600", icon: "bg-purple-50 text-purple-600", check: "text-purple-600", btn: "bg-purple-600 hover:bg-purple-700 shadow-purple-100" },
        green: { bg: "bg-green-600", icon: "bg-green-50 text-green-600", check: "text-green-600", btn: "bg-green-600 hover:bg-green-700 shadow-green-100" },
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {/* ── Hero ── */}
                <section className="relative bg-gradient-to-b from-[#F0F7FF] to-white pt-36 pb-16 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl" />
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-5 py-2 mb-8">
                            <span className="text-blue-600 text-lg">✨</span>
                            <span className="text-blue-700 font-semibold text-sm">All-In-One Collaboration Platform</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                            Powerful Features for{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Modern Collaborations
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Everything you need to discover, connect, and collaborate with the perfect partners. From advanced search to real-time analytics, we&apos;ve got you covered.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/signup">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200 active:scale-95 flex items-center gap-2">
                                    Get Started Free <span>→</span>
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 h-12 rounded-xl font-semibold border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95">
                                    Contact Sales
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── Stats Bar ── */}
                <section className="py-12 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
                                    <p className="text-2xl md:text-3xl font-extrabold text-blue-600 mb-1">
                                        {animate ? <AnimatedCounter target={stat.value} duration={1500 + i * 100} /> : "0"}
                                    </p>
                                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Core Platform Features (2-col with hover cards) ── */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Core Platform Features</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                The essential tools that make Brandly the leading influencer collaboration platform
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {coreFeatures.map((f, i) => <FeatureCard key={i} feature={f} />)}
                        </div>
                    </div>
                </section>

                {/* ── Everything You Need to Succeed (3-col grid) ── */}
                <section className="py-20 bg-[#F8FAFC]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Everything You Need to Succeed</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                Packed with powerful features designed for both brands and influencers
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allFeatures.map((f, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4 items-start shadow-[0_4px_16px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300">
                                    <div className={`w-10 h-10 rounded-xl ${f.bg} flex-shrink-0 flex items-center justify-center mt-0.5`}>
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Why Choose Brandly? ── */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Why Choose Brandly?</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                We built Brandly to be the most effective and trustworthy influencer platform for modern teams.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {whyUs.map((w, i) => (
                                <div key={i} className={`${w.bg} rounded-2xl p-6 text-center hover:scale-[1.03] transition-all duration-300`}>
                                    <div className="w-12 h-12 bg-white rounded-xl shadow flex items-center justify-center mx-auto mb-4">
                                        {w.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{w.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Built For Everyone ── */}
                <section className="py-20 bg-[#F8FAFC]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Built for Everyone</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                                One platform that works for brands, influencers, and teams
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {builtFor.map((tier, i) => {
                                const c = colorMap[tier.color];
                                return (
                                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col">
                                        <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-6`}>
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">{tier.title}</h3>
                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {tier.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <svg className={`w-5 h-5 ${c.check} flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-gray-600 text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href={tier.href}>
                                            <button className={`w-full h-11 rounded-xl ${c.btn} text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]`}>
                                                {tier.cta}
                                            </button>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Bottom CTA ── */}
                <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 py-24 px-8 text-center shadow-2xl">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            Ready to Transform Your Collaborations?
                        </h2>
                        <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Join thousands of brands and influencers already using Brandly to create impactful partnerships.
                        </p>
                        <div className="flex flex-wrap justify-center gap-5">
                            <Link href="/signup">
                                <button className="bg-white text-blue-600 hover:bg-gray-50 h-14 px-10 text-lg rounded-2xl font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95">
                                    Get Started Free →
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="border-2 border-white/40 text-white hover:bg-white/10 h-14 px-10 text-lg rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95">
                                    Contact Sales
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
