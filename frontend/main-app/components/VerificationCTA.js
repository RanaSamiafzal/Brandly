import { Button } from "@repo/ui";
import Link from "next/link";

export default function VerificationCTA() {
    return (
        <section className="py-20 bg-purple-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    Ready to Work with Verified Influencers?
                </h2>
                <p className="text-xl text-purple-50 mb-10 leading-relaxed max-w-2xl mx-auto">
                    Join Brandly and start collaborating with trusted, verified creators today.
                </p>
                <Link href="/signup">
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 h-14 px-10 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                        Get Started Free →
                    </Button>
                </Link>
            </div>
        </section>
    );
}
