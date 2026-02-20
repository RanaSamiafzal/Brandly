import { Button } from "@repo/ui";
import Link from "next/link";

export default function FindMatchesHero() {
    return (
        <section className="pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200 mb-8">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                        Find Perfect Matches
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Discover the ideal influencers for your brand using our powerful search and filtering tools.
                        Connect with creators who share your values and resonate with your target audience.
                    </p>

                    <Link href="/signup">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-10 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                            Get Started Free →
                        </Button>
                    </Link>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 transformation perspective-1000 rotate-x-2">
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                            alt="Marketing team brainstorming"
                            className="w-full h-auto object-cover aspect-[16/9]"
                        />

                        {/* Matches Found Badge Overlay */}
                        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl flex items-center gap-4 animate-bounce-slow">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900 leading-tight">158 Matches Found</p>
                                <p className="text-sm text-gray-500">Based on your criteria</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
