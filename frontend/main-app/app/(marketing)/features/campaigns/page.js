import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import GenericHero from "../../../../components/GenericHero";
import GenericFeatures from "../../../../components/GenericFeatures";
import GenericSteps from "../../../../components/GenericSteps";
import GenericCTA from "../../../../components/GenericCTA";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <GenericHero featureKey="campaigns" />
                <GenericFeatures featureKey="campaigns" />
                <GenericSteps featureKey="campaigns" />
                <GenericCTA featureKey="campaigns" />
            </main>
            <Footer />
        </div>
    );
}
