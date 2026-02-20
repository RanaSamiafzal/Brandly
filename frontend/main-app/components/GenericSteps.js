"use client";
import { useUIStore } from "@repo/store";

export default function GenericSteps({ featureKey }) {
    const featureData = useUIStore((state) => state.features[featureKey]?.steps);
    const accentColor = useUIStore((state) => state.features[featureKey]?.hero?.accentColor);

    if (!featureData) return null;

    const { title, description, list } = featureData;

    const accentClasses = {
        amber: {
            bg: "bg-amber-50/10",
            stepBg: "bg-amber-500",
            border: "hover:border-amber-100"
        },
        green: {
            bg: "bg-green-50/10",
            stepBg: "bg-green-500",
            border: "hover:border-green-100"
        },
        blue: {
            bg: "bg-blue-50/10",
            stepBg: "bg-blue-500",
            border: "hover:border-blue-100"
        }
    };

    const theme = accentClasses[accentColor] || accentClasses.amber;

    return (
        <section className={`py-24 ${theme.bg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-wide">{title}</h2>
                    <p className="text-lg text-gray-500">{description}</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {list.map((step, index) => (
                        <div key={index} className={`flex items-center gap-6 p-6 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-50 ${theme.border} transition-all duration-300`}>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${theme.stepBg} text-white flex items-center justify-center font-bold text-sm`}>
                                {index + 1}
                            </div>
                            <p className="text-md font-medium text-gray-800">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
