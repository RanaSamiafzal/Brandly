export default function FeatureSteps() {
    const steps = [
        { text: "Set your campaign criteria and budget" },
        { text: "Use advanced filters to narrow down candidates" },
        { text: "Review influencer profiles and audience insights" },
        { text: "Send collaboration requests to your top picks" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-wide">How It Works</h2>
                    <p className="text-lg text-gray-500">Finding the right influencers is simple with Brandly</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-6 p-6 rounded-2xl bg-white shadow-sm border border-gray-50 hover:border-blue-100 transition-all">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                {index + 1}
                            </div>
                            <p className="text-lg font-medium text-gray-800">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
