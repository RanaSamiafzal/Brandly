import { Button } from "@repo/ui";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-500/15 via-indigo-600/10 via-30% to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            <span className="text-sm font-medium text-blue-700">Trusted by 10,000+ Creators & Brands</span>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Connect Brands with Influencers <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Seamlessly
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            The ultimate platform for authentic brand-influencer collaborations.
                            Discover, connect, and grow your business with powerful tools and insights.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/signup">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95">
                                    Start Free Today →
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-indigo-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95">
                                    Sign in
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center gap-1">
                            <div className="flex -space-x-3 overflow-hidden">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-blue-100 flex items-center justify-center">
                                        <span className="text-xs font-semibold text-blue-600">U{i}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="ml-4">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm font-medium text-gray-500">Rated 4.9/5 by users</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/80 transition-all duration-500 hover:scale-[1.01]">
                            <div className="bg-gray-900 aspect-[4/3] flex items-center justify-center text-white">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team collaborating" className="object-cover w-full h-full opacity-80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
