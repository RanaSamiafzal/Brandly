"use client";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@repo/store";
import { LogOut, User, Camera, ChevronDown } from "lucide-react";
import NotificationsDropdown from "./NotificationsDropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CloudinaryUpload from "./CloudinaryUpload";
import { io } from "socket.io-client";

export default function BrandHeader() {
    const { user, logout, login } = useAuthStore();
    const router = useRouter();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const popupRef = useRef(null);

    const handleLogoUpdate = async (info) => {
        setIsUpdating(true);
        try {
            const res = await fetch('/api/brand/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ logo: info.secure_url })
            });

            if (res.ok) {
                // Refresh user data from /api/auth/me to sync global state
                const meRes = await fetch('/api/auth/me');
                const meData = await meRes.json();
                if (meData.user) {
                    login(meData.user);
                }
            }
        } catch (error) {
            console.error("Failed to update logo", error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Presence tracking via Socket
    useEffect(() => {
        if (!user?.id) return;

        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");

        socket.emit('join_user', user.id);

        // Check initial status
        socket.emit('check_online', user.id, (res) => {
            if (res.online) setIsOnline(true);
        });

        socket.on('user_status_change', (data) => {
            if (data.userId === user.id) {
                setIsOnline(data.status === 'online');
            }
        });

        return () => socket.disconnect();
    }, [user?.id]);

    // Close popup on click outside
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

    const companyName = (mounted && user) ? (user.brandProfile?.brandName || user.fullname || user.email?.split('@')[0] || "Brand Admin") : "Loading...";
    const initial = companyName.charAt(0).toUpperCase();
    const profilePic = mounted ? (user?.brandProfile?.logo || user?.profilePic) : null;
    const userEmail = mounted ? user?.email : "";

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40 w-full shadow-sm">
            <div className="flex items-center gap-4">
                {/* Left side empty or for search if needed */}
            </div>

            <div className="flex items-center gap-4">
                <NotificationsDropdown />

                <div className="relative" ref={popupRef}>
                    <div className="flex items-center gap-3">
                        <div className="relative group/logo">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md group-hover/logo:shadow-blue-200 transition-all overflow-hidden border-2 border-white">
                                {profilePic ? (
                                    <img src={profilePic} alt={companyName} className="w-full h-full object-cover" />
                                ) : (
                                    initial
                                )}

                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="w-4 h-4 text-white" />
                                    <div className="absolute inset-0 opacity-0 cursor-pointer">
                                        <CloudinaryUpload
                                            onUploadSuccess={handleLogoUpdate}
                                            buttonText=""
                                            folder="brand_logos"
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            {isUpdating && (
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-full">
                                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                                </div>
                            )}
                            {/* Small online indicator */}
                            {isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsPopupOpen(!isPopupOpen)}
                            className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-xl transition-all group border border-transparent hover:border-gray-100"
                        >
                            <div className="flex-col items-start hidden sm:flex">
                                <span className="text-sm font-bold text-gray-900 leading-none mb-1">{companyName}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Brand</span>
                                    {isPopupOpen && <span className="text-[10px] text-gray-400 font-medium truncate max-w-[100px] animate-in fade-in slide-in-from-left-1 duration-200">{userEmail}</span>}
                                </div>
                            </div>
                            <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isPopupOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Profile Popup */}
                    {isPopupOpen && (
                        <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-3xl shadow-2xl z-50 animate-in fade-in slide-in-from-right-2 duration-200 overflow-hidden">
                            <div className="relative h-24 overflow-hidden">
                                {user?.coverPic ? (
                                    <img src={user.coverPic} className="w-full h-full object-cover" alt="Cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-700"></div>
                                )}
                                <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px]"></div>
                            </div>

                            <div className="px-5 pb-5 -mt-10 relative">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative group/avatar">
                                        <div className="w-16 h-16 rounded-2xl bg-white text-blue-600 font-bold flex items-center justify-center text-xl overflow-hidden border-4 border-white shadow-xl">
                                            {profilePic ? (
                                                <img src={profilePic} alt={companyName} className="w-full h-full object-cover" />
                                            ) : (
                                                initial
                                            )}
                                        </div>
                                        {isOnline && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-hidden pt-6">
                                        <p className="font-bold truncate text-lg leading-tight text-gray-900">{companyName}</p>
                                        <p className="text-xs text-blue-600 font-medium truncate opacity-80">{userEmail}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-2 text-center relative group/status">
                                        <p className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Status</p>
                                        <div className="flex items-center justify-center gap-1.5">
                                            {isOnline && <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />}
                                            <p className="text-xs font-bold text-blue-700">{isOnline ? 'Active Now' : 'Active'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 text-center">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Role</p>
                                        <p className="text-xs font-bold text-gray-700">Brand</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-white">
                                <div className="space-y-1">
                                    <Link
                                        href="/brand/profile-settings"
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all group"
                                        onClick={() => setIsPopupOpen(false)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <User className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Profile Settings</p>
                                            <p className="text-[10px] text-gray-400">Manage account details</p>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await fetch('/api/auth/logout', { method: 'POST' });
                                                logout();
                                                setIsPopupOpen(false);
                                                router.push('/login');
                                            } catch (error) {
                                                console.error("Logout failed", error);
                                                // Fallback: clear store anyway
                                                logout();
                                                router.push('/login');
                                            }
                                        }}
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
