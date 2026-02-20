import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import CampaignHero from "../../../../components/CampaignHero";
import CampaignFeatures from "../../../../components/CampaignFeatures";
import CampaignSteps from "../../../../components/CampaignSteps";
import CampaignCTA from "../../../../components/CampaignCTA";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <CampaignHero />
                <CampaignFeatures />
                <CampaignSteps />
                <CampaignCTA />
            </main>
            <Footer />
        </div>
    );
}
