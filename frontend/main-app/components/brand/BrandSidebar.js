"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@repo/store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Search,
    FileText,
    Users,
    PlusSquare,
    Settings,
    LogOut,
    Sparkles
} from "lucide-react";

export default function BrandSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: "Dashboard", href: "/brand", icon: LayoutDashboard },
        { name: "AI Match", href: "/brand/ai-match/demo", icon: Sparkles },
        { name: "Search Influencers", href: "/brand/search-influencers", icon: Search },
        { name: "My Requests", href: "/brand/my-requests", icon: FileText },
        { name: "Collaborations", href: "/brand/collaborations", icon: Users },
        { name: "Create Campaign", href: "/brand/create-campaign", icon: PlusSquare },
        { name: "Profile Settings", href: "/brand/profile-settings", icon: Settings },
    ];

    const router = useRouter();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed top-0 left-0 shadow-sm z-50">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-gray-50/30">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-100 transition-transform duration-300 group-hover:scale-110">
                        B
                    </div>
                    <span className="font-extrabold text-sm text-gray-900 tracking-tight">Brandly</span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/brand" && pathname.startsWith(link.href));
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium
                ${isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Area */}
            <div className="p-4 border-t border-gray-100 mt-auto">
                <button
                    onClick={async () => {
                        try {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            logout();
                            router.push('/login');
                        } catch (error) {
                            console.error("Logout failed", error);
                            logout();
                            router.push('/login');
                        }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                    <LogOut className="w-5 h-5 text-red-500" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
