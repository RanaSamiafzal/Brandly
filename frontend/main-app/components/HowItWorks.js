export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Create Your Profile",
            description: "Sign up as a brand or influencer and complete your profile with your details and preferences.",
        },
        {
            number: "02",
            title: "Connect & Discover",
            description: "Use powerful search tools to find the perfect collaboration partners for your goals.",
        },
        {
            number: "03",
            title: "Collaborate & Grow",
            description: "Launch campaigns, track progress, and build lasting partnerships that drive results.",
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-xl text-gray-600">
                        Get started in minutes and launch your first campaign today.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative p-8 rounded-2xl bg-white shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                            <div className="text-6xl font-black text-gray-100 mb-6 group-hover:text-blue-50 transition-colors">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
