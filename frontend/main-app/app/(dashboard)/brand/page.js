"use client";
import { Button } from "@repo/ui";
import { useAuthStore } from "@repo/store";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Brand Dashboard</h1>
                    <p className="text-lg text-gray-600">
                        Welcome, {user?.email || "Brand"}!
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button>Create Campaign</Button>
                    <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50">
                        Logout
                    </Button>
                </div>
            </div>
        </main>
    );
}
