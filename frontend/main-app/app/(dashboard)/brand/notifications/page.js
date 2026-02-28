"use client";
import { useState, useEffect } from "react";
import { Bell, CheckCircle, Info, AlertTriangle, Filter, Trash2, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@repo/store";

export default function NotificationsPage() {
    const { user } = useAuthStore();
    const [mounted, setMounted] = useState(false);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        setMounted(true);
    }, []);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "REQUEST_RECEIVED",
            title: "New Collaboration Request",
            description: "You have received a collaboration request from FashionHub for the 'Summer Collection' campaign.",
            isRead: false,
            timeAgo: "5 minutes ago",
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50"
        },
        {
            id: 2,
            type: "CAMPAIGN_UPDATED",
            title: "Campaign Update",
            description: "Your 'Tech Product Launch' campaign has been approved and is now live.",
            isRead: false,
            timeAgo: "2 hours ago",
            icon: Info,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            id: 3,
            type: "DELIVERABLE_DUE",
            title: "Deliverable Due Soon",
            description: "Reminder: 2 content pieces are due for review in the next 48 hours.",
            isRead: true,
            timeAgo: "1 day ago",
            icon: AlertTriangle,
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
        {
            id: 4,
            type: "PAYMENT_PROCESSED",
            title: "Payment Received",
            description: "A payment of $1,200 has been successfully processed for the 'Winter Gear' campaign.",
            isRead: true,
            timeAgo: "2 days ago",
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50"
        },
        {
            id: 5,
            type: "SYSTEM_INFO",
            title: "Security Update",
            description: "Your brand profile was successfully updated recently.",
            isRead: true,
            timeAgo: "3 days ago",
            icon: Info,
            color: "text-gray-400",
            bg: "bg-gray-50"
        }
    ]);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const filteredNotifs = filter === "All"
        ? notifications
        : filter === "Unread"
            ? notifications.filter(n => !n.isRead)
            : notifications.filter(n => n.isRead);

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
                    <p className="text-gray-500 mt-1 text-lg">Stay updated with your campaign activities and collaboration requests.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={markAllRead}
                        className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                    >
                        <CheckCircle2 className="w-4 h-4" /> Mark All as Read
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex gap-2 p-1 bg-gray-100 w-fit rounded-xl">
                {["All", "Unread", "Read"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === f
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                {filteredNotifs.length > 0 ? (
                    filteredNotifs.map((notif) => {
                        const Icon = notif.icon;
                        return (
                            <div
                                key={notif.id}
                                className={`p-6 flex items-start gap-4 transition-all group hover:bg-gray-50/50 ${!notif.isRead ? "bg-blue-50/20" : ""}`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${notif.bg} ${notif.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-gray-900">{notif.title}</h3>
                                            {!notif.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>}
                                        </div>
                                        <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">{notif.timeAgo}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-3xl">{notif.description}</p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn">
                                            View Details <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => deleteNotification(notif.id)}
                                            className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                                        >
                                            <Trash2 className="w-3 h-3" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="py-24 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <Bell className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">All clear!</h3>
                        <p className="text-gray-500 mt-1 max-w-xs mx-auto">You don't have any notifications in the "{filter}" category right now.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Arrow icon for the view details button
function ArrowRight(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    );
}
