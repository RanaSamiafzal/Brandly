import { Button } from "@repo/ui";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold">Influencer Dashboard</h1>
                <Button>Find Campaigns</Button>
            </div>
        </main>
    );
}
