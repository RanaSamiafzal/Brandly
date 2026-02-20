import { Button } from "@repo/ui";
import Link from "next/link";

export default function FindMatchesCTA() {
    return (
        <section className="py-20 mb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-600 to-indigo-700 py-20 px-8 text-center shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl opacity-20 animate-slow-spin"></div>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Ready to Find Your Perfect Match?
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                            Start discovering influencers who can help grow your brand today.
                        </p>
                        <Link href="/signup">
                            <Button className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-10 text-lg rounded-xl shadow-lg border-2 border-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                                Get Started Free →
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
