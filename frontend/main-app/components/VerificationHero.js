import { Button } from "@repo/ui";
import Link from "next/link";

export default function VerificationHero() {
    return (
        <section className="pt-32 pb-20 bg-purple-50/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600 text-white shadow-xl shadow-purple-100 mb-8">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>

                    <h1 className="text-5xl lg:text-3xl font-extrabold text-gray-900 leading-tight mb-6 mt-4">
                        Verified Profiles You Can Trust
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Work with confidence knowing every influencer on Brandly is verified and authenticated.
                        Our rigorous verification process ensures quality, authenticity, and professional standards.
                    </p>

                    <Link href="/signup">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-10 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                            Get Started Free →
                        </Button>
                    </Link>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?q=80&w=2670&auto=format&fit=crop"
                            alt="Team reviewing profiles"
                            className="w-full h-auto object-cover aspect-[16/9]"
                        />

                        {/* Verification Badge Overlay */}
                        <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900 leading-tight">100% Verified</p>
                                <p className="text-sm text-gray-500">Trusted influencers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
