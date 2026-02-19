import { Button } from "@repo/ui";
import Link from "next/link";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold">Welcome to the Platform</h1>
                <div className="flex gap-4">
                    <Link href="/signup?role=brand">
                        <Button>For Brands</Button>
                    </Link>
                    <Link href="/signup?role=influencer">
                        <Button variant="secondary">For Influencers</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
