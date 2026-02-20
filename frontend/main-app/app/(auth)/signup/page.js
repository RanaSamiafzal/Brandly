"use client";
import Link from "next/link";
import { Button } from "@repo/ui";

export default function SignupPage() {
    return (
        <div className="w-full max-w-4xl bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/80 p-8 md:p-12 text-center">
            {/* Logo/Icon Area */}
            <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Join Brandly</h1>
            <p className="text-gray-500 mb-12">Choose your account type to get started</p>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
                {/* Brand Option */}
                <Link href="/signup/brand" className="group">
                    <div className="bg-white border-2 border-gray-100 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:border-blue-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group-active:scale-[0.98]">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-100 transition-colors">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172A] mb-3">I'm a Brand</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Find and collaborate with influencers to boost your brand
                        </p>
                    </div>
                </Link>

                {/* Influencer Option */}
                <Link href="/signup/influencer" className="group">
                    <div className="bg-white border-2 border-gray-100 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:border-blue-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group-active:scale-[0.98]">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-100 transition-colors">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172A] mb-3">I'm an Influencer</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Get discovered and work with amazing brands
                        </p>
                    </div>
                </Link>
            </div>

            <div className="text-gray-500 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                    Sign in
                </Link>
            </div>
        </div>
    );
}
