import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import GenericHero from "../../../../components/GenericHero";
import GenericCTA from "../../../../components/GenericCTA";
import SmartSearch from "../../../../components/SmartSearch";
import FeatureSteps from "../../../../components/FeatureSteps";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <GenericHero featureKey="find-matches" />
                <SmartSearch />
                <FeatureSteps />
                <GenericCTA featureKey="find-matches" />
            </main>
            <Footer />
        </div>
    );
}
