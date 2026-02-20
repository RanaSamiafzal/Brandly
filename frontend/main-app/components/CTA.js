import { Button } from "@repo/ui";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 py-24 px-8 text-center shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grad)" />
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                    Ready to Transform Your Collaborations?
                </h2>
                <p className="text-xl md:text-2xl text-blue-50 mb-12 leading-relaxed font-medium">
                    Join Brandly today and start building meaningful partnerships that drive real results.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link href="/signup">
                        <Button className="bg-white text-indigo-600 hover:bg-gray-50 h-16 px-12 text-xl rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95">
                            Get Started Free →
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 h-16 px-12 text-xl rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95">
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
