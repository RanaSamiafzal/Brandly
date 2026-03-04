"use client";
import Link from "next/link";
import { Button } from "@repo/ui";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@repo/store";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const { isAuthenticated, role } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated && role) {
            const dashboardPath = role === "BRAND" ? "/brand" : "/influencer";
            router.push(dashboardPath);
        }
    }, [isAuthenticated, role, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Update local store (this will normalize the role internally)
            login(data.user);

            // The useEffect will handle redirection now, but we can also do it here for speed
            const userRole = typeof data.user.role === 'object' ? data.user.role.name : data.user.role;
            const dashboardPath = userRole === "BRAND" ? "/brand" : "/influencer";
            router.push(dashboardPath);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/80 p-8 md:p-12 text-center">
            {/* Logo/Icon Area */}
            <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Brandly</h1>
            <p className="text-gray-500 mb-10 text-sm">Sign in to your account</p>

            <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center animate-shake">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                        required
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[42px] text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Remember me</span>
                    </label>
                    <Link href="/forgot-password" title="Forgot password?" className="text-blue-600 font-semibold hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-100 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </Button>
            </form>

            <div className="mt-8 text-gray-500 text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

