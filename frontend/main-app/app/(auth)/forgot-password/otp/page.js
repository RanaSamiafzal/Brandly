"use client";
import Link from "next/link";
import { Button } from "@repo/ui";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OTPPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const inputs = useRef([]);
    const router = useRouter();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("reset_email");
        if (!storedEmail) {
            router.push("/forgot-password");
        } else {
            setEmail(storedEmail);
        }
    }, [router]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value !== '' && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputs.current[index - 1].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length < 6) {
            setError('Please enter the full 6-digit code');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: otpString }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Verification failed");
            }

            // Redirect to new password page
            router.push("/forgot-password/new-password");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error("Failed to resend OTP");
            alert("OTP resent successfully!");
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

            <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Verify OTP</h1>
            <p className="text-gray-500 mb-4 text-sm">
                We've sent a 6-digit code to <span className="font-bold text-[#0F172A]">{email || "your email"}</span>.
            </p>

            <div className="inline-block px-4 py-2 rounded-lg bg-amber-50 text-amber-600 text-xs font-bold mb-10">
                OTP will expire in 10 minutes
            </div>

            <form onSubmit={handleVerify}>
                <p className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Enter 6-digit code</p>
                <div className="flex justify-between gap-2 mb-8">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            ref={(el) => (inputs.current[index] = el)}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            disabled={isLoading}
                            className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border ${error ? 'border-red-300' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 disabled:opacity-50`}
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-red-500 text-sm font-medium mb-6 animate-shake">
                        {error}
                    </p>
                )}

                <div className="mb-8">
                    <button
                        type="button"
                        onClick={() => {
                            setOtp(['1', '2', '3', '4', '5', '6']);
                            setError('');
                        }}
                        disabled={isLoading}
                        className="text-xs text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors font-semibold disabled:opacity-50"
                    >
                        Click to auto-fill: 123456
                    </button>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-100 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
            </form>

            <div className="mt-8 text-sm text-gray-500">
                Didn't receive the code?{" "}
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading}
                    className="text-blue-600 font-semibold hover:underline disabled:opacity-50"
                >
                    Resend OTP
                </button>
            </div>

            <div className="mt-6">
                <Link href="/forgot-password" title="Back to Forgot Password?" className="inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors group">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Forgot Password
                </Link>
            </div>
        </div>
    );
}
