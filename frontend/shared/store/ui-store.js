import { create } from 'zustand';

export const useUIStore = create((set) => ({
    features: {
        analytics: {
            hero: {
                title: "Real-time Analytics & Insights",
                description: "Make data-driven decisions with comprehensive analytics. Track performance, measure ROI, and optimize your influencer marketing strategy with actionable insights.",
                icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                ),
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
                accentColor: "amber",
                stats: [
                    { label: "Total Reach", value: "2.5M+", growth: "+24%" },
                    { label: "Engagement Rate", value: "4.8%", growth: "+12%" },
                    { label: "Conversions", value: "12.5K", growth: "+18%" },
                    { label: "ROI", value: "380%", growth: "+32%" },
                ]
            },
            features: {
                title: "Powerful Analytics Tools",
                description: "Get complete visibility into your campaign performance with our comprehensive analytics suite.",
                list: [
                    {
                        title: "Campaign Performance",
                        description: "Track reach, impressions, engagement rates, and conversions for all your campaigns.",
                        iconName: "chart-bar"
                    },
                    {
                        title: "Audience Analytics",
                        description: "Understand audience demographics, interests, and behaviors across all collaborations.",
                        iconName: "clock"
                    },
                    {
                        title: "Trend Analysis",
                        description: "Identify patterns and trends to optimize future campaigns and maximize ROI.",
                        iconName: "trending-up"
                    },
                    {
                        title: "Real-time Monitoring",
                        description: "Watch your campaigns perform live with real-time data updates and alerts.",
                        iconName: "lightning"
                    }
                ]
            },
            steps: {
                title: "How Analytics Work",
                description: "From setup to insights in five simple steps",
                list: [
                    "Connect your campaign to start tracking",
                    "Monitor real-time performance metrics",
                    "Analyze audience insights and engagement",
                    "Generate detailed reports for stakeholders",
                    "Optimize based on data-driven recommendations"
                ]
            },
            cta: {
                title: "Ready to Unlock Powerful Insights?",
                description: "Start tracking your campaign performance and make data-driven decisions today."
            }
        },
        campaigns: {
            hero: {
                title: "Unified Campaign Management",
                description: "Launch, manage, and scale your influencer campaigns from a single dashboard. Streamline workflows and maximize collaboration efficiency.",
                icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                ),
                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
                accentColor: "green",
                stats: [
                    { label: "Active Campaigns", value: "150+", growth: "+15%" },
                    { label: "Collaborations", value: "2,400+", growth: "+40%" },
                    { label: "Completion Rate", value: "98%", growth: "+5%" },
                    { label: "Avg. ROI", value: "4.2x", growth: "+10%" },
                ]
            },
            features: {
                title: "Streamlined Campaign Workflows",
                description: "Everything you need to run successful influencer marketing campaigns at scale.",
                list: [
                    {
                        title: "Creator Selection",
                        description: "Easily find and invite the right influencers for your brand.",
                        iconName: "users"
                    },
                    {
                        title: "Automated Workflows",
                        description: "Automate brief sharing, content approvals, and payments.",
                        iconName: "cog"
                    },
                    {
                        title: "Centralized Chat",
                        description: "Communicate directly with influencers within the platform.",
                        iconName: "chat"
                    },
                    {
                        title: "Content Approval",
                        description: "Review and approve creative assets before they go live.",
                        iconName: "check"
                    }
                ]
            },
            steps: {
                title: "How Campaign Management Works",
                description: "Launch and manage successful campaigns in five simple steps",
                list: [
                    "Define your campaign goals and requirements",
                    "Select influencers and send collaboration invites",
                    "Share campaign briefs and creative assets",
                    "Monitor progress and approve content submissions",
                    "Track performance and measure campaign success"
                ]
            },
            cta: {
                title: "Scale Your Influence Today",
                description: "Join thousands of brands managing successful campaigns on our platform."
            }
        },
        "find-matches": {
            hero: {
                title: "Find Perfect Matches",
                description: "Discover the ideal influencers for your brand using our powerful search and filtering tools. Connect with creators who share your values and resonate with your target audience.",
                icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                ),
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
                accentColor: "blue",
                stats: [
                    { label: "Creators", value: "50K+", growth: "+10%" },
                    { label: "Daily Matches", value: "1.2K+", growth: "+25%" },
                    { label: "Accuracy", value: "95%", growth: "+4%" },
                    { label: "Categories", value: "25+", growth: "Verified" },
                ]
            },
            cta: {
                title: "Ready to Find Your Perfect Match?",
                description: "Start discovering influencers who can help grow your brand today."
            }
        },
        verification: {
            hero: {
                title: "Verified Profiles You Can Trust",
                description: "Work with confidence knowing every influencer on Brandly is verified and authenticated. Our rigorous verification process ensures quality, authenticity, and professional standards.",
                icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                ),
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
                accentColor: "blue",
                stats: [
                    { label: "Verification Status", value: "100%", growth: "Verified" },
                    { label: "Security Level", value: "Bank-grade", growth: "Secure" },
                    { label: "Fraud Protection", value: "Active", growth: "24/7" },
                    { label: "Trust Score", value: "9.8/10", growth: "+0.2" },
                ]
            },
            features: {
                title: "Comprehensive Verification Process",
                description: "Our multi-step verification ensures you work with authentic, professional influencers.",
                list: [
                    {
                        title: "Identity Verification",
                        description: "All influencers undergo thorough identity verification to ensure authenticity.",
                        iconName: "users"
                    },
                    {
                        title: "Quality Standards",
                        description: "We maintain strict quality standards to ensure professional and reliable collaborations.",
                        iconName: "check"
                    },
                    {
                        title: "Portfolio Review",
                        description: "Past work and performance metrics are reviewed to validate influencer capabilities.",
                        iconName: "chart-bar"
                    },
                    {
                        title: "Secure Platform",
                        description: "Your data and transactions are protected with enterprise-grade security.",
                        iconName: "check"
                    }
                ]
            },
            cta: {
                title: "Ready to Work with Verified Influencers?",
                description: "Join Brandly and start collaborating with trusted, verified creators today."
            }
        }
    }
}));
