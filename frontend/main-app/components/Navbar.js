"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui";

const NavItem = ({ label, items, footerLink }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1.5 py-6 transition-colors duration-200">
                <span className="font-medium">{label}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 transition-all duration-300 origin-top transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {items.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.href || "#"}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${item.iconBg || 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                            {item.icon}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                            {item.description && (
                                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                            )}
                        </div>
                    </Link>
                ))}
                {footerLink && (
                    <div className="border-t border-gray-100 mt-1 pt-2 px-3 pb-2">
                        <Link href={footerLink.href} className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all py-1">
                            {footerLink.label} <span className="text-lg">›</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Navbar() {
    const brandItems = [
        {
            label: "Find Influencers",
            description: "Discover perfect matches",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
            href: "/features/find-matches"
        },
        {
            label: "Campaign Management",
            description: "Manage your campaigns",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
            href: "/features/campaigns"
        },
        {
            label: "Analytics",
            description: "Track performance",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
            href: "/features/analytics"
        },
    ];

    const influencerItems = [
        {
            label: "Find Opportunities",
            description: "Browse brand collaborations",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            href: "/signup"
        },
        {
            label: "Get Verified",
            description: "Build your credibility",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            href: "/features/verification"
        },
        {
            label: "Grow Your Brand",
            description: "Expand your reach",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
            href: "/signup"
        },
    ];

    const featureItems = [
        {
            label: "Find Perfect Matches",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
            href: "/features/find-matches"
        },
        {
            label: "Campaign Management",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
            href: "/features/campaigns"
        },
        {
            label: "Real-time Analytics",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
            href: "/features/analytics"
        },
        {
            label: "Verified Profiles",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            href: "/features/verification"
        },
    ];

    const resourceItems = [
        {
            label: "Blog",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4.5 1.253" /></svg>,
            href: "/resources/blog"
        },
        {
            label: "Help Center",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            href: "/resources/help-center"
        },
        {
            label: "Case Studies",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
            href: "/resources/case-studies"
        },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <span className="text-white font-bold text-2xl">B</span>
                            </div>
                            <span className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Brandly</span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-2 ml-auto mr-8">
                        <NavItem label="For Brands" items={brandItems} />
                        <NavItem label="For Influencers" items={influencerItems} />
                        <NavItem label="Features" items={featureItems} footerLink={{ label: "View All Features", href: "/features" }} />
                        <NavItem label="Resources" items={resourceItems} />
                    </div>

                    <div className="flex items-center gap-5 ml-auto lg:ml-0">
                        <Link href="/login" className="text-gray-600 hover:text-[#0F172A] font-semibold transition-colors duration-200">
                            Log in
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-7 h-11 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-100 active:scale-95">
                                Join now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
