module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/frontend/shared/store/auth-store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        user: null,
        isAuthenticated: false,
        role: null,
        login: (user)=>{
            const role = typeof user.role === 'object' ? user.role.name : user.role;
            set({
                user,
                isAuthenticated: true,
                role
            });
        },
        logout: ()=>{
            set({
                user: null,
                isAuthenticated: false,
                role: null
            });
            // Wipe persisted data from localStorage for security
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        // Call this on layout mount to re-sync with the server JWT
        rehydrate: async ()=>{
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        const role = typeof data.user.role === 'object' ? data.user.role.name : data.user.role;
                        set({
                            user: data.user,
                            isAuthenticated: true,
                            role
                        });
                    }
                }
            } catch  {}
        }
    }), {
    name: 'brandly-auth',
    partialize: (state)=>({
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            role: state.role
        })
}));
}),
"[project]/frontend/shared/store/campaign-store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCampaignStore",
    ()=>useCampaignStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
;
const useCampaignStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set)=>({
        campaigns: [],
        setCampaigns: (campaigns)=>set({
                campaigns
            }),
        addCampaign: (campaign)=>set((state)=>({
                    campaigns: [
                        ...state.campaigns,
                        campaign
                    ]
                }))
    }));
}),
"[project]/frontend/shared/store/ui-store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUIStore",
    ()=>useUIStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
;
;
const useUIStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set)=>({
        features: {
            analytics: {
                hero: {
                    title: "Real-time Analytics & Insights",
                    description: "Make data-driven decisions with comprehensive analytics. Track performance, measure ROI, and optimize your influencer marketing strategy with actionable insights.",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-8 h-8",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        }, void 0, false, {
                            fileName: "[project]/frontend/shared/store/ui-store.js",
                            lineNumber: 11,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/shared/store/ui-store.js",
                        lineNumber: 10,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
                    accentColor: "amber",
                    stats: [
                        {
                            label: "Total Reach",
                            value: "2.5M+",
                            growth: "+24%"
                        },
                        {
                            label: "Engagement Rate",
                            value: "4.8%",
                            growth: "+12%"
                        },
                        {
                            label: "Conversions",
                            value: "12.5K",
                            growth: "+18%"
                        },
                        {
                            label: "ROI",
                            value: "380%",
                            growth: "+32%"
                        }
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
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-8 h-8",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        }, void 0, false, {
                            fileName: "[project]/frontend/shared/store/ui-store.js",
                            lineNumber: 71,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/shared/store/ui-store.js",
                        lineNumber: 70,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
                    accentColor: "green",
                    stats: [
                        {
                            label: "Active Campaigns",
                            value: "150+",
                            growth: "+15%"
                        },
                        {
                            label: "Collaborations",
                            value: "2,400+",
                            growth: "+40%"
                        },
                        {
                            label: "Completion Rate",
                            value: "98%",
                            growth: "+5%"
                        },
                        {
                            label: "Avg. ROI",
                            value: "4.2x",
                            growth: "+10%"
                        }
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
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-8 h-8",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        }, void 0, false, {
                            fileName: "[project]/frontend/shared/store/ui-store.js",
                            lineNumber: 131,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/shared/store/ui-store.js",
                        lineNumber: 130,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
                    accentColor: "blue",
                    stats: [
                        {
                            label: "Creators",
                            value: "50K+",
                            growth: "+10%"
                        },
                        {
                            label: "Daily Matches",
                            value: "1.2K+",
                            growth: "+25%"
                        },
                        {
                            label: "Accuracy",
                            value: "95%",
                            growth: "+4%"
                        },
                        {
                            label: "Categories",
                            value: "25+",
                            growth: "Verified"
                        }
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
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-8 h-8",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        }, void 0, false, {
                            fileName: "[project]/frontend/shared/store/ui-store.js",
                            lineNumber: 154,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/shared/store/ui-store.js",
                        lineNumber: 153,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
                    accentColor: "blue",
                    stats: [
                        {
                            label: "Verification Status",
                            value: "100%",
                            growth: "Verified"
                        },
                        {
                            label: "Security Level",
                            value: "Bank-grade",
                            growth: "Secure"
                        },
                        {
                            label: "Fraud Protection",
                            value: "Active",
                            growth: "24/7"
                        },
                        {
                            label: "Trust Score",
                            value: "9.8/10",
                            growth: "+0.2"
                        }
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
}),
"[project]/frontend/shared/store/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/shared/store/auth-store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$campaign$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/shared/store/campaign-store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$ui$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/shared/store/ui-store.js [app-ssr] (ecmascript)");
;
;
;
}),
"[project]/frontend/main-app/app/(auth)/layout.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/shared/store/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/shared/store/auth-store.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AuthLayout({ children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isAuthenticated && user) {
            const dashboardPath = user.role === "BRAND" ? "/brand" : "/influencer";
            router.push(dashboardPath);
        }
    }, [
        isAuthenticated,
        user,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F0F7FF] flex items-center justify-center p-4",
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/main-app/app/(auth)/layout.js",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0141e5a1._.js.map