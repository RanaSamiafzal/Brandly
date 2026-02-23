"use client";
import { Button } from "@repo/ui";
import Link from "next/link";
import { useUIStore } from "@repo/store";

export default function GenericCTA({ featureKey }) {
    const featureData = useUIStore((state) => state.features[featureKey]?.cta);
    const accentColor = useUIStore((state) => state.features[featureKey]?.hero?.accentColor);

    if (!featureData) return null;

    const { title, description } = featureData;

    const accentClasses = {
        amber: "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 text-amber-600",
        green: "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 text-green-600",
        blue: "bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-indigo-600"
    };

    const themeClass = accentClasses[accentColor] || accentClasses.blue;
    const [bgClass, textClass] = themeClass.split(' text-');

    return (
        <section className={`relative overflow-hidden ${bgClass} py-24 px-8 text-center shadow-2xl`}>
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                    {title}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                    {description}
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link href="/signup">
                        <Button className={`bg-white ${textClass ? `text-${textClass}` : 'text-blue-600'} hover:bg-gray-50 h-16 px-12 text-xl rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95`}>
                            Get Started Free →
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" className="border-2 border-white/40 text-black hover:bg-white/10 h-16 px-12 text-xl rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95">
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
