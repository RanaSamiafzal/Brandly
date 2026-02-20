"use client";
import Link from "next/link";
import { Button } from "@repo/ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@repo/store";

export default function BrandSignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role: "BRAND", companyName }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            login(data.user);
            router.push("/brand/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[480px] bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/80 p-8 md:p-12 text-center">
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Brand Account</h1>
            <p className="text-gray-500 mb-10 text-sm">Grow your brand with influencers</p>

            <form className="space-y-5 text-left" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center animate-shake">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">
                        Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Brandly Inc."
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">
                        Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
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

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-100 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 mt-4"
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
            </form>

            <div className="mt-8 text-gray-500 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                    Sign in
                </Link>
            </div>
            <div className="mt-4">
                <Link href="/signup" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    ← Back to selection
                </Link>
            </div>
        </div>
    );
}
