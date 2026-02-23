import { Button } from "@repo/ui";
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

export default function CaseStudiesPage() {
    return (
        <div className="pt-24 pb-0 bg-white min-h-screen">
            <Navbar />
            {/* Header */}
            <div className="text-center py-16 px-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
                    Success Stories
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Discover how top brands and influencers are achieving incredible growth with Brandly
                </p>
            </div>

            {/* Stats Bar */}
            <div className="border-y border-gray-100 bg-gray-50/50 mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-gray-200">
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-blue-600 mb-1">500+</h3>
                            <p className="text-sm text-gray-500 font-medium">Brands on Board</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-blue-600 mb-1">$50M+</h3>
                            <p className="text-sm text-gray-500 font-medium">Value Created</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-blue-600 mb-1">100%</h3>
                            <p className="text-sm text-gray-500 font-medium">Secure Payments</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-blue-600 mb-1">98%</h3>
                            <p className="text-sm text-gray-500 font-medium">Match Satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Case Studies List */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">

                {/* Case Study 1 */}
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex items-center gap-4 text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Fashion Forward</h3>
                            <p className="text-white/80 text-sm">Apparel & Lifestyle</p>
                        </div>
                    </div>

                    <div className="p-8 md:p-10">
                        <div className="grid md:grid-cols-2 gap-10 mb-10">
                            <div className="rounded-2xl overflow-hidden h-64 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Fashion Store" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center gap-6 text-sm text-gray-600">
                                <div>
                                    <h4 className="font-bold text-[#0F172A] flex items-center gap-2 mb-2 text-base">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        The Challenge
                                    </h4>
                                    <p className="leading-relaxed">Struggling to reach Gen-Z demographics with traditional advertising methods and seeing declining ROAS.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0F172A] flex items-center gap-2 mb-2 text-base">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        The Solution
                                    </h4>
                                    <p className="leading-relaxed">Partnered with 15 micro-influencers through Brandly's AI matching, launching a coordinated TikTok campaign.</p>
                                </div>
                            </div>
                        </div>

                        {/* Results Row */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                            <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                Key Results
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <div className="text-2xl font-extrabold text-blue-600 mb-1">315%</div>
                                    <div className="text-xs text-gray-500 font-medium">ROAS Increase</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-extrabold text-blue-600 mb-1">1.2M</div>
                                    <div className="text-xs text-gray-500 font-medium">Video Views</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-extrabold text-blue-600 mb-1">$5.50</div>
                                    <div className="text-xs text-gray-500 font-medium">Avg CPA</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-extrabold text-blue-600 mb-1">42%</div>
                                    <div className="text-xs text-gray-500 font-medium">New Customers</div>
                                </div>
                            </div>
                        </div>

                        <div className="border border-blue-100 bg-blue-50/50 rounded-xl p-4 text-sm text-gray-600 italic">
                            "Brandly helped us find exactly the right voices to represent our new collection. The campaign management tools saved us weeks of email back-and-forth."
                        </div>
                    </div>
                </div>

                {/* Case Study 2 */}
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-6 flex items-center gap-4 text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">TechGear Pro</h3>
                            <p className="text-white/80 text-sm">Consumer Electronics</p>
                        </div>
                    </div>

                    <div className="p-8 md:p-10">
                        <div className="grid md:grid-cols-2 gap-10 mb-10">
                            <div className="rounded-2xl overflow-hidden h-64 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Tech Desk" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center gap-6 text-sm text-gray-600">
                                <div>
                                    <h4 className="font-bold text-[#0F172A] flex items-center gap-2 mb-2 text-base">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        The Challenge
                                    </h4>
                                    <p className="leading-relaxed">Needed authentic reviews for a high-end product launch, avoiding overly promotional messaging.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0F172A] flex items-center gap-2 mb-2 text-base">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        The Solution
                                    </h4>
                                    <p className="leading-relaxed">Sourced 5 top tech reviewers via Brandly's escrow payment system, ensuring deliverables before payout.</p>
                                </div>
                            </div>
                        </div>

                        {/* Results Row */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                            <h4 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                Key Results
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <div className="text-2xl font-extrabold text-blue-600 mb-1">140%</div>
                                    <div className="text-xs text-gray-500 font-medium">Sales Target</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-extrabold text-blue-600 mb-1">2.3M</div>
                                    <div className="text-xs text-gray-500 font-medium">Reach</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-extrabold text-blue-600 mb-1">18%</div>
                                    <div className="text-xs text-gray-500 font-medium">Engagement Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-extrabold text-blue-600 mb-1">0</div>
                                    <div className="text-xs text-gray-500 font-medium">Payment Disputes</div>
                                </div>
                            </div>
                        </div>

                        <div className="border border-blue-100 bg-blue-50/50 rounded-xl p-4 text-sm text-gray-600 italic">
                            "The escrow feature gave both us and the creators peace of mind. The process was flawless."
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom CTA */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 py-24 text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ready to Write Your Success Story?</h2>
                    <p className="text-white/80 text-xl mb-10">Join thousands of brands and creators growing their businesses on Brandly.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/signup/brand">
                            <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white text-indigo-600 font-bold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                                I'm a Brand
                            </Button>
                        </Link>
                        <Link href="/signup/influencer">
                            <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-indigo-700/50 text-white font-bold hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all outline outline-1 outline-white/20 hover:outline-white/40 backdrop-blur-sm">
                                I'm an Influencer
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
