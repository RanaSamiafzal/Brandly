"use client";
import { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle2, Info, AlertTriangle, ArrowRight, BellOff, MoreHorizontal, Check, Trash2, MessageSquare, ClipboardList, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@repo/store";
import { useNotifications } from "../providers/NotificationProvider";

const TYPE_MAP = {
    CAMPAIGN_CREATED: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2 },
    CAMPAIGN_UPDATED: { color: "text-blue-600", bg: "bg-blue-50", icon: Info },
    CAMPAIGN_DELETED: { color: "text-gray-500", bg: "bg-gray-50", icon: Info },
    REQUEST_RECEIVED: { color: "text-purple-600", bg: "bg-purple-50", icon: CheckCircle2 },
    REQUEST_RESPONDED: { color: "text-indigo-600", bg: "bg-indigo-50", icon: CheckCircle2 },
    PROFILE_UPDATED: { color: "text-amber-600", bg: "bg-amber-50", icon: Info },
    DELIVERABLE_DUE: { color: "text-red-500", bg: "bg-red-50", icon: AlertTriangle },
    SYSTEM_INFO: { color: "text-gray-500", bg: "bg-gray-100", icon: Info },
    NEW_MESSAGE: { color: "text-blue-600", bg: "bg-blue-50", icon: MessageSquare },
    TASK_CREATED: { color: "text-green-600", bg: "bg-green-50", icon: PlusCircle },
    TASK_UPDATED: { color: "text-orange-600", bg: "bg-orange-50", icon: ClipboardList },
};

function timeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function NotificationsDropdown() {
    const { unreadCount, setUnreadCount, decrementUnread, clearUnread, muted, toggleMute } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const user = useAuthStore((s) => s.user);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/notifications?limit=8");
            const data = await res.json();
            if (data.notifications) {
                setNotifications(data.notifications);
                setUnreadCount(data.unreadCount ?? data.notifications.filter(n => !n.isRead).length);
            }
        } catch { /* silently fail */ }
        finally { setIsLoading(false); }
    };

    const handleOpen = () => {
        setIsOpen(prev => {
            if (!prev) fetchNotifications();
            return !prev;
        });
    };

    const markAllRead = async () => {
        await fetch("/api/notifications/read-all", { method: "PATCH" });
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        clearUnread();
    };

    const markRead = async (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        decrementUnread();
        await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    };

    const deleteNotif = async (e, id) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
        setUnreadCount(prev => {
            const isUnread = notifications.find(n => n.id === id)?.isRead === false;
            return isUnread ? Math.max(0, prev - 1) : prev;
        });
        await fetch(`/api/notifications/${id}`, { method: "DELETE" });
    };


    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleOpen}
                className={`relative p-2 rounded-full transition-colors ${muted ? "text-gray-300" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                title={muted ? "Notifications muted" : "Notifications"}
            >
                {muted ? <BellOff className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                {!muted && unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>


            {isOpen && (
                <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 text-base">Notifications</h3>
                            {!muted && unreadCount > 0 && (
                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">{unreadCount}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMute}
                                className={`p-1.5 rounded-lg transition-colors text-xs font-medium flex items-center gap-1 ${muted ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-gray-400 hover:bg-gray-100"}`}
                                title={muted ? "Unmute" : "Mute notifications"}
                            >
                                {muted ? <><BellOff className="w-3.5 h-3.5" /> Muted</> : <BellOff className="w-3.5 h-3.5" />}
                            </button>
                            {unreadCount > 0 && (
                                <button onClick={markAllRead} className="text-xs font-bold text-blue-600 hover:text-blue-700">
                                    Mark all read
                                </button>
                            )}
                        </div>
                    </div>

                    {/* List */}
                    <div className="max-h-80 overflow-y-auto">
                        {isLoading ? (
                            <div className="space-y-1 p-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-3 p-3 animate-pulse">
                                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex-shrink-0" />
                                        <div className="flex-1 space-y-1.5 py-0.5">
                                            <div className="h-3 bg-gray-200 rounded w-2/3" />
                                            <div className="h-2.5 bg-gray-100 rounded w-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : notifications.length > 0 ? (
                            notifications.map((notif) => {
                                const meta = TYPE_MAP[notif.type] || TYPE_MAP.SYSTEM_INFO;
                                const Icon = meta.icon;
                                return (
                                    <div
                                        key={notif.id}
                                        onClick={() => !notif.isRead && markRead(notif.id)}
                                        className={`flex items-start gap-3 px-5 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer group transition-colors ${!notif.isRead ? "bg-blue-50/30" : ""}`}
                                    >
                                        <div className={`w-9 h-9 rounded-lg ${meta.bg} ${meta.color} flex items-center justify-center flex-shrink-0`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-1">
                                                <p className="text-sm font-semibold text-gray-900 leading-tight">{notif.title}</p>
                                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                                    {!notif.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                                                    <button
                                                        onClick={(e) => deleteNotif(e, notif.id)}
                                                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-snug">{notif.description}</p>
                                            <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{timeAgo(notif.createdAt)}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-14 text-center">
                                <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-500">You're all caught up!</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                        <Link
                            href="/brand/notifications"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700 bg-white border border-gray-200 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            View All Notifications <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
