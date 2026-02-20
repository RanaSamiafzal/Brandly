import { Button } from "@repo/ui";
import Link from "next/link";

export default function AnalyticsHero() {
    return (
        <section className="pt-32 pb-20 bg-amber-50/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 text-white shadow-xl shadow-amber-100 mb-8">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>

                    <h1 className="text-5xl lg:text-3xl font-extrabold text-gray-900 leading-tight mb-6 mt-4">
                        Real-time Analytics & Insights
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Make data-driven decisions with comprehensive analytics. Track performance, measure
                        ROI, and optimize your influencer marketing strategy with actionable insights.
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
                            src="https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=2670&auto=format&fit=crop"
                            alt="Analytics dashboard showing charts"
                            className="w-full h-auto object-cover aspect-[16/9]"
                        />

                        {/* Stats Badge Overlays */}
                        <div className="absolute -bottom-6 -left-6 md:left-2 bg-white p-4 rounded-2xl border border-gray-100 shadow-xl flex gap-8 z-20">
                            <div className="text-center">
                                <p className="text-xs text-gray-400 mb-1">Total Reach</p>
                                <p className="text-xl font-bold">2.5M+</p>
                                <p className="text-xs text-green-500">+24%</p>
                            </div>
                            <div className="text-center border-l pl-8">
                                <p className="text-xs text-gray-400 mb-1">Engagement Rate</p>
                                <p className="text-xl font-bold">4.8%</p>
                                <p className="text-xs text-green-500">+12%</p>
                            </div>
                            <div className="text-center border-l pl-8">
                                <p className="text-xs text-gray-400 mb-1">Conversions</p>
                                <p className="text-xl font-bold">12.5K</p>
                                <p className="text-xs text-green-500">+18%</p>
                            </div>
                            <div className="text-center border-l pl-8">
                                <p className="text-xs text-gray-400 mb-1">ROI</p>
                                <p className="text-xl font-bold">380%</p>
                                <p className="text-xs text-green-500">+32%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
