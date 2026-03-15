"use client";
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@repo/store';
import { Bell, MessageSquare, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

const TYPE_ICONS = {
    CAMPAIGN_CREATED: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    CAMPAIGN_UPDATED: <Info className="w-5 h-5 text-blue-500" />,
    REQUEST_RECEIVED: <Bell className="w-5 h-5 text-purple-500" />,
    REQUEST_RESPONDED: <CheckCircle2 className="w-5 h-5 text-indigo-500" />,
    NEW_MESSAGE: <MessageSquare className="w-5 h-5 text-blue-500" />,
    DELIVERABLE_DUE: <AlertTriangle className="w-5 h-5 text-red-500" />,
};

export const NotificationProvider = ({ children }) => {
    const { user } = useAuthStore();
    const [unreadCount, setUnreadCount] = useState(0);
    const [muted, setMuted] = useState(false);
    const audioRef = useRef(null);
    const socketRef = useRef(null);

    // Initial mute state from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('brandly-notif-muted');
        if (stored === 'true') setMuted(true);
    }, []);

    const toggleMute = () => {
        const next = !muted;
        setMuted(next);
        localStorage.setItem('brandly-notif-muted', String(next));
    };

    // Load initial unread count
    useEffect(() => {
        if (!user?.id) return;

        const fetchInitialCount = async () => {
            try {
                const res = await fetch('/api/notifications?limit=1');
                const data = await res.json();
                if (data.unreadCount !== undefined) {
                    setUnreadCount(data.unreadCount);
                }
            } catch (error) {
                console.error("Failed to fetch notification count", error);
            }
        };

        fetchInitialCount();
    }, [user?.id]);

    useEffect(() => {
        if (!user?.id) return;

        // Initialize Audio
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audioRef.current.volume = 0.4;

        // Initialize Socket
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");
        socketRef.current = socket;

        socket.emit('join_user', user.id);

        socket.on('new_activity', (activity) => {
            // Play Sound if not muted
            if (!muted) {
                audioRef.current?.play().catch(() => {
                    // Ignore autoplay block errors
                });
            }

            // Update Count
            setUnreadCount(prev => prev + 1);

            // Show Toast
            toast.custom((t) => (
                <Link 
                    href="/brand/notifications"
                    onClick={() => toast.dismiss(t.id)}
                    className={`${
                        t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 transition-all hover:translate-y-[-2px] border-l-4 border-l-blue-600`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    {TYPE_ICONS[activity.type] || <Bell className="w-5 h-5 text-blue-600" />}
                                </div>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">
                                    {activity.title}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                                    {activity.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ), {
                duration: 5000,
                position: 'top-right',
            });
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [user?.id]);

    const decrementUnread = () => setUnreadCount(prev => Math.max(0, prev - 1));
    const clearUnread = () => setUnreadCount(0);

    return (
        <NotificationContext.Provider value={{ unreadCount, setUnreadCount, decrementUnread, clearUnread, muted, toggleMute }}>
            {children}
            <Toaster />
        </NotificationContext.Provider>
    );
};
