"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@repo/store";

export default function AuthLayout({ children }) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated && user) {
            const dashboardPath = user.role === "BRAND" ? "/brand" : "/influencer";
            router.push(dashboardPath);
        }
    }, [isAuthenticated, user, router]);

    return (
        <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-4">
            {children}
        </div>
    );
}
