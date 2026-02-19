"use client";

import { useState } from "react";
import { Button } from "@repo/ui";
import Link from "next/link";

export default function SignupPage() {
    const [role, setRole] = useState("brand");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

                <div className="space-y-4 mb-8">
                    <label className="block text-sm font-medium text-gray-700">Select Your Role</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setRole("brand")}
                            className={`p-4 border rounded-lg text-center ${role === "brand" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                        >
                            Brand
                        </button>
                        <button
                            onClick={() => setRole("influencer")}
                            className={`p-4 border rounded-lg text-center ${role === "influencer" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                        >
                            Influencer
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                    <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                    <Button className="w-full">Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}</Button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link href="/signin" className="text-blue-500">Sign In</Link>
                </p>
            </div>
        </main>
    );
}
