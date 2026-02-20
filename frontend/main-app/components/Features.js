import Link from "next/link";

export default function Features() {
    const features = [
        {
            title: "Find Perfect Matches",
            description: "Advanced search filters to discover influencers that align with your brand values and target audience.",
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            color: "bg-blue-50",
            href: "/features/find-matches",
        },
        {
            title: "Campaign Management",
            description: "Streamlined tools to create, manage, and track your influencer campaigns all in one place.",
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            color: "bg-green-50",
            href: "/features/campaigns",
        },
        {
            title: "Real-time Analytics",
            description: "Monitor campaign performance with comprehensive analytics and detailed reporting dashboards.",
            icon: (
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: "bg-orange-50",
            href: "/features/analytics",
        },
        {
            title: "Verified Profiles",
            description: "Work with confidence knowing all influencers are verified and authenticated by our team.",
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            color: "bg-purple-50",
            href: "/features/verification",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
                    <p className="text-xl text-gray-600">
                        Powerful features designed to make influencer marketing simple, effective, and measurable.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const cardContent = (
                            <div className="p-8 h-full rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-100 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-300 group cursor-pointer">
                                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {feature.description}
                                </p>
                                <span className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Learn More <span>→</span>
                                </span>
                            </div>
                        );

                        return (
                            <div key={index}>
                                {feature.href ? (
                                    <Link href={feature.href}>
                                        {cardContent}
                                    </Link>
                                ) : (
                                    cardContent
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
