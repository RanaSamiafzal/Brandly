import { Button } from "@repo/ui";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-8 text-center shadow-2xl">
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
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Ready to Transform Your Collaborations?
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                            Join Brandly today and start building meaningful partnerships that drive real results.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/signup">
                                <Button className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-10 text-lg rounded-xl shadow-lg">
                                    Get Started Free →
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-10 text-lg rounded-xl">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
