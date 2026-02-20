import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import AnalyticsHero from "../../../../components/AnalyticsHero";
import AnalyticsFeatures from "../../../../components/AnalyticsFeatures";
import AnalyticsSteps from "../../../../components/AnalyticsSteps";
import AnalyticsCTA from "../../../../components/AnalyticsCTA";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <AnalyticsHero />
                <AnalyticsFeatures />
                <AnalyticsSteps />
                <AnalyticsCTA />
            </main>
            <Footer />
        </div>
    );
}
