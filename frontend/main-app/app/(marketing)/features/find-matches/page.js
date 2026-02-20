import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import FindMatchesHero from "../../../../components/FindMatchesHero";
import SmartSearch from "../../../../components/SmartSearch";
import FeatureSteps from "../../../../components/FeatureSteps";
import FindMatchesCTA from "../../../../components/FindMatchesCTA";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <FindMatchesHero />
                <SmartSearch />
                <FeatureSteps />
                <FindMatchesCTA />
            </main>
            <Footer />
        </div>
    );
}
