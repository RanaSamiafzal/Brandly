import { Button } from "@repo/ui";
import Link from "next/link";

export default function CampaignHero() {
    return (
        <section className="pt-32 pb-20 overflow-hidden bg-green-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 text-white shadow-xl shadow-green-100 mb-8">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>

                    <h1 className="text-5xl lg:text-3xl font-extrabold text-gray-900 leading-tight mb-6 mt-4">
                        Campaign Management Made Simple
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Streamline your influencer campaigns from start to finish. Create, manage, and track all
                        your collaborations in one powerful dashboard designed for efficiency.
                    </p>

                    <Link href="/signup">
                        <Button className="bg-green-600 hover:bg-green-700 text-white h-14 px-10 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                            Get Started Free →
                        </Button>
                    </Link>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                            alt="Campaign management dashboard on a laptop"
                            className="w-full h-auto object-cover aspect-[16/9]"
                        />

                        {/* Active Campaigns Badge Overlay */}
                        <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900 leading-tight">3 Active Campaigns</p>
                                <p className="text-sm text-gray-500">All on schedule</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
