"use client";
import Link from "next/link";
import { Button } from "@repo/ui";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("reset_email");
        if (!storedEmail) {
            router.push("/forgot-password");
        } else {
            setEmail(storedEmail);
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Reset failed");
            }

            // Success - Clear session and redirect to login
            sessionStorage.removeItem("reset_email");
            router.push("/login?reset=success");
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-4.44-2.03c-.77-.562-1.39-1.228-1.83-1.956m0 0A10.954 10.954 0 013 11c0-5.42 4.417-9 10-9s10 3.58 10 9a10.976 10.976 0 01-2.203 6.642m-1.442 1.353A10.948 10.948 0 0113 20.001V11.5" />
                    </svg>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Create New Password</h1>
            <p className="text-gray-500 mb-10 text-sm leading-relaxed">
                Your identity is verified. Now, set your new account password.
            </p>

            <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center animate-shake">
                        {error}
                    </div>
                )}

                <div className="relative">
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">
                        New Password <span className="text-red-500">*</span>
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

                <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full h-12 px-4 rounded-xl border ${error ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400`}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-xs font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Password Requirements:
                    </p>
                    <ul className="text-xs space-y-2 text-gray-500 font-medium">
                        <li className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : 'text-red-400'}`}>
                            • Minimum 8 characters
                        </li>
                        <li className="flex items-center gap-2">• At least one uppercase letter</li>
                        <li className="flex items-center gap-2">• At least one number</li>
                    </ul>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-100 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                >
                    {isLoading ? "Updating..." : "Update Password"}
                </Button>

                <div className="text-center pt-2">
                    <Link href="/login" className="text-sm text-blue-600 font-semibold hover:underline">
                        Return to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
