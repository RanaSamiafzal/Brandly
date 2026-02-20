import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import GenericHero from "../../../../components/GenericHero";
import GenericFeatures from "../../../../components/GenericFeatures";
import GenericCTA from "../../../../components/GenericCTA";

export default function Page() {
    const steps = [
        "Influencer submits profile application",
        "Identity verification and document review",
        "Social media account authentication",
        "Portfolio and content quality assessment",
        "Profile approved and verification badge awarded",
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <GenericHero featureKey="verification" />
                <GenericFeatures featureKey="verification" />

                {/* Verification Steps Section with side box */}
                <section className="py-24 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Our Verification Process</h2>
                                <p className="text-gray-500 mb-12">Every influencer goes through a rigorous five-step verification process before joining our platform.</p>

                                <div className="space-y-4">
                                    {steps.map((step, index) => (
                                        <div key={index} className="flex items-center gap-6 p-4 rounded-xl bg-white border border-gray-100">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                                                {index + 1}
                                            </div>
                                            <p className="text-sm font-medium text-gray-800">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm self-start">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Verification Matters</h3>
                                <div className="space-y-4">
                                    {[
                                        "Work with trusted, verified creators",
                                        "Reduce fraud and fake follower risks",
                                        "Access detailed performance history",
                                        "Professional and reliable partnerships",
                                        "Safe and secure transactions"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-600">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <GenericCTA featureKey="verification" />
            </main>
            <Footer />
        </div>
    );
}
