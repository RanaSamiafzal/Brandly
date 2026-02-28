"use client";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ target, suffix = "", duration = 1800 }) {
    const [display, setDisplay] = useState("0");
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    // Parse numeric part from target like "10K+", "98%", "24/7"
    const isSpecial = target === "24/7";

    useEffect(() => {
        if (isSpecial) {
            // Animate a rapid cycle then land on "24/7"
            const frames = ["12/3", "7/2", "18/5", "24/7"];
            let i = 0;
            const interval = setInterval(() => {
                setDisplay(frames[i]);
                i++;
                if (i >= frames.length) clearInterval(interval);
            }, duration / frames.length);
            return () => clearInterval(interval);
        }

        // Parse numeric value and any suffix like "K+", "%", "+"
        const match = target.match(/^(\d+\.?\d*)(.*)/);
        if (!match) { setDisplay(target); return; }
        const end = parseFloat(match[1]);
        const trailingSuffix = match[2]; // e.g. "K+", "%"

        const steps = 60;
        const stepDuration = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            // Ease-out: faster at start, slower at end
            const progress = 1 - Math.pow(1 - step / steps, 3);
            const current = Math.round(end * progress);
            setDisplay(`${current}${trailingSuffix}`);
            if (step >= steps) {
                setDisplay(`${end % 1 === 0 ? end : end}${trailingSuffix}`);
                clearInterval(timer);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [target, duration, isSpecial]);

    return <span>{display}</span>;
}

export default function Stats() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation shortly after mount
        const t = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(t);
    }, []);

    const stats = [
        { label: "Active Influencers", value: "10K+" },
        { label: "Trusted Brands", value: "5K+" },
        { label: "Successful Campaigns", value: "50K+" },
        { label: "Satisfaction Rate", value: "98%" },
    ];

    return (
        <section className="bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors tabular-nums">
                                {animate ? (
                                    <AnimatedCounter
                                        target={stat.value}
                                        duration={1600 + index * 100}
                                    />
                                ) : (
                                    <span>0</span>
                                )}
                            </div>
                            <div className="text-gray-400 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
