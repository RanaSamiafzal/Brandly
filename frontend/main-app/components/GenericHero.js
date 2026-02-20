"use client";
import { Button } from "@repo/ui";
import Link from "next/link";
import { useUIStore } from "@repo/store";

export default function GenericHero({ featureKey }) {
    const featureData = useUIStore((state) => state.features[featureKey]?.hero);

    if (!featureData) return null;

    const { title, description, icon, image, accentColor, stats } = featureData;

    const colorClasses = {
        amber: {
            bg: "bg-gradient-to-br from-amber-400/40 via-transparent via-40% to-transparent",
            iconBg: "bg-amber-500",
            shadow: "shadow-amber-100",
            accent: "text-amber-600",
            btn: "bg-amber-500 hover:bg-amber-600"
        },
        green: {
            bg: "bg-gradient-to-br from-green-400/40 via-transparent via-40% to-transparent",
            iconBg: "bg-green-500",
            shadow: "shadow-green-100",
            accent: "text-green-600",
            btn: "bg-green-500 hover:bg-green-600"
        },
        blue: {
            bg: "bg-gradient-to-br from-blue-500/40 via-transparent via-40% to-transparent",
            iconBg: "bg-blue-600",
            shadow: "shadow-blue-100",
            accent: "text-blue-600",
            btn: "bg-blue-600 hover:bg-blue-700"
        }
    };

    const theme = colorClasses[accentColor] || colorClasses.amber;

    return (
        <section className={`pt-32 pb-24 ${theme.bg} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    {icon && (
                        <div className={`w-12 h-12 ${theme.iconBg} rounded-xl flex items-center justify-center text-white mb-6 mx-auto shadow-lg ${theme.shadow}`}>
                            {icon}
                        </div>
                    )}
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight mb-6">
                        {title}
                    </h1>

                    <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>

                    <Link href="/signup">
                        <Button className={`${theme.btn} text-white h-12 px-8 text-base font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95`}>
                            Get Started Free →
                        </Button>
                    </Link>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/80 bg-white p-2.5">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-auto object-cover aspect-[16/9] rounded-2xl"
                        />
                    </div>

                    {/* Stats Badge Overlays - Centered At Bottom */}
                    {stats && (
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 w-full px-4 z-20">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-white/50 min-w-[160px] text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                    <p className="text-xs font-bold text-green-500 bg-green-50 inline-block px-2 py-1 rounded-md">{stat.growth}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
