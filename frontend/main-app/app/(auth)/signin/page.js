"use client";
import React, { useState } from "react";
import { Button } from "@repo/ui";
import Link from "next/link";

export default function SigninPage() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>

                <div className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full p-2 border rounded" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-xs font-bold text-blue-600 uppercase"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <Button className="w-full">Sign In</Button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link>
                </p>
            </div>
        </main>
    );
}
