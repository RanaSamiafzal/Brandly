"use client";
import { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle, Info, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotificationsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fake data for now since we don't have the context hook yet
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "REQUEST_RECEIVED",
            title: "New Collaboration Request",
            description: "You have received a collaboration request from FashionHub",
            isRead: false,
            timeAgo: "5 minutes ago",
            icon: CheckCircle,
            color: "text-green-500"
        },
        {
            id: 2,
            type: "CAMPAIGN_UPDATED",
            title: "Campaign Update",
            description: "Summer Collection Launch campaign has been updated",
            isRead: false,
            timeAgo: "2 hours ago",
            icon: Info,
            color: "text-blue-500"
        },
        {
            id: 3,
            type: "DELIVERABLE_DUE",
            title: "Deliverable Due Soon",
            description: "You have 2 deliverables due in 3 days",
            isRead: true,
            timeAgo: "1 day ago",
            icon: AlertTriangle,
            color: "text-amber-500"
        },
        {
            id: 4,
            type: "PAYMENT_PROCESSED",
            title: "Payment Received",
            description: "Payment of $800 has been processed",
            isRead: true,
            timeAgo: "2 days ago",
            icon: CheckCircle,
            color: "text-green-500"
        }
    ]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={markAllRead}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Mark all read
                        </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => {
                                const Icon = notif.icon;
                                return (
                                    <div
                                        key={notif.id}
                                        className={`flex items-start gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.isRead ? 'bg-blue-50/40' : ''}`}
                                    >
                                        <div className={`mt-0.5 ${notif.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                                                {!notif.isRead && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-0.5 leading-snug">{notif.description}</p>
                                            <p className="text-xs text-gray-400 mt-1.5">{notif.timeAgo}</p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <p className="text-sm">No new notifications</p>
                            </div>
                        )}
                    </div>

                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                        <Link
                            href="/brand/notifications"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center text-sm font-medium text-gray-900 bg-white border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            View All Notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
