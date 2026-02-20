export default function Stats() {
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
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {stat.value}
                            </div>
                            <div className="text-gray-400 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
