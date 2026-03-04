"use client";
import InfluencerSidebar from "../../../components/influencer/InfluencerSidebar";
import InfluencerHeader from "../../../components/influencer/InfluencerHeader";
import { useAuthStore } from "@repo/store";
import { useEffect } from "react";

export default function InfluencerLayout({ children }) {
    const rehydrate = useAuthStore((s) => s.rehydrate);

    useEffect(() => {
        rehydrate();
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <InfluencerSidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <InfluencerHeader />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
