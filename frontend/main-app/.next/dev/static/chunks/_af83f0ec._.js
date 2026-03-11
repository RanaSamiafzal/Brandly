(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyRequests
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/shared/store/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/shared/store/auth-store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MyRequests() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyRequests.useEffect": ()=>{
            setMounted(true);
            fetchRequests();
        }
    }["MyRequests.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyRequests.useEffect": ()=>{
            if (!user?.id) return;
            __turbopack_context__.A("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript, async loader)").then({
                "MyRequests.useEffect": ({ io })=>{
                    const newSocket = io(("TURBOPACK compile-time value", "http://localhost:3001") || "http://localhost:3001");
                    setSocket(newSocket);
                    newSocket.emit('join_user', user.id);
                    newSocket.on('receive_request', {
                        "MyRequests.useEffect": (request)=>{
                            const formatted = {
                                id: request.id,
                                name: request.sender?.fullname || "New Influencer",
                                status: request.status.toLowerCase(),
                                campaign: request.campaign?.title || "Campaign",
                                platform: request.campaign?.targetPlatform?.[0] || "Instagram",
                                followers: "Pending data",
                                engagement: "Pending data",
                                date: new Date(request.createdAt).toLocaleDateString(),
                                message: request.note || "No message provided.",
                                image: request.sender?.profilePic || `https://i.pravatar.cc/150?u=${request.senderId}`,
                                senderId: request.senderId
                            };
                            setRequests({
                                "MyRequests.useEffect": (prev)=>[
                                        formatted,
                                        ...prev
                                    ]
                            }["MyRequests.useEffect"]);
                        }
                    }["MyRequests.useEffect"]);
                    return ({
                        "MyRequests.useEffect": ()=>newSocket.close()
                    })["MyRequests.useEffect"];
                }
            }["MyRequests.useEffect"]);
        }
    }["MyRequests.useEffect"], [
        user?.id
    ]);
    const fetchRequests = async ()=>{
        setIsLoading(true);
        try {
            const res = await fetch('/api/brand/requests');
            const data = await res.json();
            if (data.requests) {
                const formattedRequests = data.requests.map((req)=>({
                        id: req.id,
                        name: req.sender.fullname,
                        status: req.status.toLowerCase(),
                        campaign: req.campaign.title,
                        platform: req.campaign.targetPlatform?.[0] || "Instagram",
                        followers: "Pending data",
                        engagement: "Pending data",
                        date: new Date(req.createdAt).toLocaleDateString(),
                        message: req.note || "No message provided.",
                        image: req.sender.profilePic || `https://i.pravatar.cc/150?u=${req.senderId}`,
                        senderId: req.senderId
                    }));
                setRequests(formattedRequests);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleResponse = async (requestId, status, influencerId)=>{
        try {
            const res = await fetch(`/api/brand/requests/${requestId}/respond`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status
                })
            });
            if (res.ok) {
                setRequests((prev)=>prev.map((req)=>req.id === requestId ? {
                            ...req,
                            status: status.toLowerCase()
                        } : req));
                if (socket) {
                    socket.emit('respond_request', {
                        influencerId,
                        requestId,
                        status
                    });
                }
            }
        } catch (error) {
            console.error("Failed to respond to request", error);
        }
    };
    const tabs = [
        {
            name: "All",
            count: requests.length
        },
        {
            name: "Pending",
            count: requests.filter((r)=>r.status === 'pending').length
        },
        {
            name: "Accepted",
            count: requests.filter((r)=>r.status === 'accepted').length
        },
        {
            name: "Rejected",
            count: requests.filter((r)=>r.status === 'rejected').length
        }
    ];
    const filteredRequests = activeTab === "All" ? requests : requests.filter((req)=>req.status === activeTab.toLowerCase());
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pt-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-extrabold text-gray-900 tracking-tight uppercase",
                            children: "Collaboration Requests"
                        }, void 0, false, {
                            fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                            lineNumber: 122,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 mt-2 font-bold flex items-center gap-2 uppercase tracking-widest text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                    className: "w-4 h-4 text-blue-600"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, this),
                                " Manage incoming offers from influencers"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                            lineNumber: 123,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                    lineNumber: 121,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                lineNumber: 120,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-gray-100",
                children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab.name),
                        className: `flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${activeTab === tab.name ? "bg-gray-900 text-white shadow-xl shadow-gray-200" : "bg-white border border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-50"}`,
                        children: [
                            tab.name,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-2 py-0.5 rounded-lg border ${activeTab === tab.name ? "bg-white/10 border-white/20 text-white" : "bg-gray-50 border-gray-100 text-gray-400"}`,
                                children: tab.count
                            }, void 0, false, {
                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                lineNumber: 141,
                                columnNumber: 25
                            }, this)
                        ]
                    }, tab.name, true, {
                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                        lineNumber: 132,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                lineNumber: 130,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: isLoading ? [
                    1,
                    2,
                    3
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-gray-100 rounded-[40px] p-8 h-48 animate-pulse"
                    }, i, false, {
                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                        lineNumber: 153,
                        columnNumber: 25
                    }, this)) : filteredRequests.length > 0 ? filteredRequests.map((req, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-gray-100 rounded-[40px] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-2xl hover:shadow-blue-100/30 hover:border-blue-100 transition-all group animate-in slide-in-from-right-8 duration-500",
                        style: {
                            animationDelay: `${idx * 100}ms`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-24 rounded-[32px] overflow-hidden shadow-xl flex-shrink-0 border-4 border-gray-50 group-hover:scale-105 transition-transform duration-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: req.image,
                                    alt: req.name,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                    lineNumber: 164,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                lineNumber: 163,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0 text-center md:text-left space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col md:flex-row md:items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-black text-gray-900 uppercase tracking-tight leading-none",
                                                children: req.name
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 170,
                                                columnNumber: 37
                                            }, this),
                                            req.status === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0 shadow-lg shadow-blue-200",
                                                children: "pending"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 172,
                                                columnNumber: 41
                                            }, this),
                                            req.status === "accepted" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0",
                                                children: "accepted"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 175,
                                                columnNumber: 41
                                            }, this),
                                            req.status === "rejected" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[9px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0",
                                                children: "rejected"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 178,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                        lineNumber: 169,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-black text-gray-500 uppercase tracking-widest",
                                        children: [
                                            "Campaign: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-900",
                                                children: req.campaign
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 181,
                                                columnNumber: 117
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                        lineNumber: 181,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 rounded-2xl p-4 text-xs font-medium text-gray-600 border border-gray-100/50 italic group-hover:bg-white transition-colors",
                                        children: [
                                            '"',
                                            req.message,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                        lineNumber: 182,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-[10px] font-black uppercase tracking-widest text-gray-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                                        className: "w-4 h-4 text-gray-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                        lineNumber: 188,
                                                        columnNumber: 41
                                                    }, this),
                                                    "Platform: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-900",
                                                        children: req.platform
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                        lineNumber: 189,
                                                        columnNumber: 51
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 187,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Calendar, {
                                                        className: "w-4 h-4 text-gray-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                        lineNumber: 192,
                                                        columnNumber: 41
                                                    }, this),
                                                    "Date: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-900",
                                                        children: req.date
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                        lineNumber: 193,
                                                        columnNumber: 47
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 191,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                        lineNumber: 186,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                lineNumber: 168,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-row md:flex-col gap-3 justify-center md:justify-end ml-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/brand/influencer/${req.senderId}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "p-3 bg-white border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-2xl transition-all shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                        lineNumber: 203,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                    lineNumber: 202,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 201,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/brand/collaborations/${req.id}/chat`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "p-3 bg-white border border-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-2xl transition-all shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                        lineNumber: 208,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                    lineNumber: 207,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 206,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                        lineNumber: 200,
                                        columnNumber: 33
                                    }, this),
                                    req.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleResponse(req.id, 'ACCEPTED', req.senderId),
                                                className: "px-8 py-3 bg-gray-900 text-white hover:bg-green-600 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:shadow-green-200 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                        lineNumber: 219,
                                                        columnNumber: 45
                                                    }, this),
                                                    " Accept"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 215,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleResponse(req.id, 'REJECTED', req.senderId),
                                                className: "px-8 py-3 bg-white border border-gray-100 text-red-500 hover:bg-red-50 hover:border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                        lineNumber: 225,
                                                        columnNumber: 45
                                                    }, this),
                                                    " Reject"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                                lineNumber: 221,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                lineNumber: 199,
                                columnNumber: 29
                            }, this)
                        ]
                    }, req.id, true, {
                        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                        lineNumber: 157,
                        columnNumber: 25
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-32 bg-gray-50/50 rounded-[60px] border border-dashed border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Clock, {
                                className: "w-12 h-12 text-gray-200"
                            }, void 0, false, {
                                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                                lineNumber: 235,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                            lineNumber: 234,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-black text-gray-400 uppercase tracking-widest",
                            children: [
                                "No ",
                                activeTab !== "All" ? activeTab : "",
                                " requests"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                            lineNumber: 237,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                    lineNumber: 233,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
                lineNumber: 150,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/main-app/app/(dashboard)/brand/my-requests/page.js",
        lineNumber: 118,
        columnNumber: 9
    }, this);
}
_s(MyRequests, "7BQZN0u3GXgOyMEfLpIkVLDe/fU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$shared$2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = MyRequests;
var _c;
__turbopack_context__.k.register(_c, "MyRequests");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Check
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
];
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("check", __iconNode);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>X
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("x", __iconNode);
;
 //# sourceMappingURL=x.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Video
]);
/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
            key: "ftymec"
        }
    ],
    [
        "rect",
        {
            x: "2",
            y: "6",
            width: "14",
            height: "12",
            rx: "2",
            key: "158x01"
        }
    ]
];
const Video = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("video", __iconNode);
;
 //# sourceMappingURL=video.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Video",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_af83f0ec._.js.map