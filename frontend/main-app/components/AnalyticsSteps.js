export default function AnalyticsSteps() {
    const steps = [
        { text: "Connect your campaign to start tracking" },
        { text: "Monitor real-time performance metrics" },
        { text: "Analyze audience insights and engagement" },
        { text: "Generate detailed reports for stakeholders" },
        { text: "Optimize based on data-driven recommendations" },
    ];

    return (
        <section className="py-24 bg-amber-50/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-wide">How Analytics Work</h2>
                    <p className="text-lg text-gray-500">From setup to insights in five simple steps</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-6 p-6 rounded-2xl bg-white shadow-sm border border-gray-50 hover:border-amber-100 transition-all">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                                {index + 1}
                            </div>
                            <p className="text-md font-medium text-gray-800">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
