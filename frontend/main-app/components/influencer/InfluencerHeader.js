"use client";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@repo/store";
import { LogOut, User, Camera, ChevronDown } from "lucide-react";
import InfluencerNotificationsDropdown from "./InfluencerNotificationsDropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InfluencerHeader() {
    const { user, logout, login } = useAuthStore();
    const router = useRouter();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fullName = (mounted && user) ? (user.fullname || user.email?.split('@')[0] || "Influencer") : "Loading...";
    const initial = fullName.charAt(0).toUpperCase();
    const profilePic = mounted ? user?.profilePic : null;
    const userEmail = mounted ? user?.email : "";

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            logout();
            setIsPopupOpen(false);
            router.push('/login');
        } catch (error) {
            console.error("Logout failed", error);
            logout();
            router.push('/login');
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40 w-full shadow-sm">
            <div className="flex items-center gap-4">
                {/* Dashboard title or empty as per layout */}
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider hidden md:block">Influencer Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
                <InfluencerNotificationsDropdown />

                <div className="relative" ref={popupRef}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md overflow-hidden border-2 border-white">
                            {profilePic ? (
                                <img src={profilePic} alt={fullName} className="w-full h-full object-cover" />
                            ) : (
                                initial
                            )}
                        </div>

                        <button
                            onClick={() => setIsPopupOpen(!isPopupOpen)}
                            className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-xl transition-all group border border-transparent hover:border-gray-100"
                        >
                            <div className="flex-col items-start hidden sm:flex">
                                <span className="text-sm font-bold text-gray-900 leading-none mb-1">{fullName}</span>
                                <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Influencer</span>
                            </div>
                            <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isPopupOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Profile Popup */}
                    {isPopupOpen && (
                        <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-right-2 duration-200 overflow-hidden">
                            <div className="p-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white font-bold flex items-center justify-center text-xl overflow-hidden border-2 border-white/30 shadow-lg">
                                        {profilePic ? (
                                            <img src={profilePic} alt={fullName} className="w-full h-full object-cover" />
                                        ) : (
                                            initial
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-bold truncate text-lg leading-tight">{fullName}</p>
                                        <p className="text-xs text-blue-100 truncate opacity-80">{userEmail}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white/10 rounded-lg p-2 text-center">
                                        <p className="text-[10px] uppercase tracking-wider opacity-60">Status</p>
                                        <p className="text-xs font-bold">Active</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-2 text-center">
                                        <p className="text-[10px] uppercase tracking-wider opacity-60">Role</p>
                                        <p className="text-xs font-bold">Influencer</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-white">
                                <div className="space-y-1">
                                    <Link
                                        href="/influencer/profile-settings"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all group"
                                        onClick={() => setIsPopupOpen(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <User className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Edit Profile</p>
                                            <p className="text-[10px] text-gray-400">Update your details</p>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-all group text-left"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                            <LogOut className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-red-600">Logout</p>
                                            <p className="text-[10px] text-red-400">Sign out of session</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
