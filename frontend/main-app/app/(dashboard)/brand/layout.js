"use client";
import { useEffect } from "react";
import { useAuthStore } from "@repo/store";
import BrandSidebar from "../../../components/brand/BrandSidebar";
import BrandHeader from "../../../components/brand/BrandHeader";
import { NotificationProvider } from "../../../components/providers/NotificationProvider";

export default function BrandLayout({ children }) {
    const rehydrate = useAuthStore((s) => s.rehydrate);

    // Re-sync user data from server JWT cookie on every page load/refresh
    useEffect(() => {
        rehydrate();
    }, []);

    return (
        <NotificationProvider>
            <div className="min-h-screen bg-[#F8FAFC]">
                <BrandSidebar />
                <div className="pl-64 flex flex-col min-h-screen">
                    <BrandHeader />
                    <main className="flex-1 p-8">
                        {children}
                    </main>
                </div>
            </div>
        </NotificationProvider>
    );
}
