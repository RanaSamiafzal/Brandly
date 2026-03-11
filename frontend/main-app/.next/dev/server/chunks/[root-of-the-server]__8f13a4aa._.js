module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/backend/database/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$database$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/backend/database/node_modules/@prisma/client)");
;
const prismaGlobal = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = prismaGlobal.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$database$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) {
    prismaGlobal.prisma = prisma;
}
}),
"[project]/backend/database/repositories/user-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserRepository",
    ()=>UserRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
;
const UserRepository = {
    async findById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id
            },
            include: {
                role: true,
                brandProfile: true,
                influencerProfile: true
            }
        });
    },
    async findByEmail (email) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email
            },
            include: {
                role: true
            }
        });
    },
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.create({
            data: {
                email: data.email,
                password: data.password,
                fullname: data.fullname || '',
                role: data.role
            },
            include: {
                role: true
            }
        });
    },
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.update({
            where: {
                id
            },
            data
        });
    },
    async softDelete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
};
}),
"[project]/backend/database/repositories/campaign-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CampaignRepository",
    ()=>CampaignRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
;
const CampaignRepository = {
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.create({
            data,
            include: {
                brand: true
            }
        });
    },
    async findById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.findUnique({
            where: {
                id
            },
            include: {
                brand: true,
                requests: {
                    include: {
                        sender: true,
                        receiver: true
                    }
                },
                matchScores: {
                    orderBy: {
                        score: 'desc'
                    },
                    take: 10,
                    include: {
                        influencer: true
                    }
                }
            }
        });
    },
    async findByBrandId (brandId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.findMany({
            where: {
                brandId,
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    },
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.update({
            where: {
                id
            },
            data: {
                status
            }
        });
    },
    async update (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.update({
            where: {
                id
            },
            data
        });
    },
    async softDelete (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
};
}),
"[project]/backend/database/repositories/brand-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandRepository",
    ()=>BrandRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
;
const BrandRepository = {
    async findByUserId (userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].brandProfile.findUnique({
            where: {
                userId
            },
            include: {
                user: true
            }
        });
    },
    async findById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].brandProfile.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                campaigns: {
                    where: {
                        status: "ACTIVE"
                    },
                    take: 5,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
    },
    async updateProfile (userId, data) {
        // Map frontend "about" to backend "description"
        if (data.about !== undefined) {
            data.description = data.about;
            delete data.about;
        }
        // Get user for fallback brand name
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                id: userId
            }
        });
        const fallbackName = user?.fullname || user?.email?.split('@')[0] || "New Brand";
        // Clean data to only include valid fields for BrandProfile
        const validFields = [
            'brandName',
            'industry',
            'website',
            'address',
            'description',
            'logo',
            'budgetMin',
            'budgetMax'
        ];
        const cleanData = {};
        Object.keys(data).forEach((key)=>{
            if (validFields.includes(key)) {
                cleanData[key] = data[key];
            }
        });
        // Use transaction to update both BrandProfile and User (if logo or coverPic changed)
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            const profile = await tx.brandProfile.upsert({
                where: {
                    userId
                },
                update: cleanData,
                create: {
                    userId,
                    brandName: cleanData.brandName || fallbackName,
                    ...cleanData
                }
            });
            // Sync with User table if logo or coverPic is present
            const userUpdateData = {};
            if (data.logo) userUpdateData.profilePic = data.logo;
            if (data.coverPic) userUpdateData.coverPic = data.coverPic;
            if (Object.keys(userUpdateData).length > 0) {
                await tx.user.update({
                    where: {
                        id: userId
                    },
                    data: userUpdateData
                });
            }
            return profile;
        });
    },
    async getDashboardStats (brandId) {
        // Aggregate active campaigns
        const campaigns = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.findMany({
            where: {
                brandId
            }
        });
        const activeCampaigns = campaigns.filter((c)=>c.status === "ACTIVE").length;
        // Aggregate pending requests
        const requests = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].collaborationRequest.count({
            where: {
                campaign: {
                    brandId
                },
                status: "PENDING"
            }
        });
        // We can mock "Influencers Found" for now or calculate based on matches
        const influencersFound = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].matchScore.count({
            where: {
                campaign: {
                    brandId
                }
            }
        });
        return {
            totalRequests: requests || 0,
            activeCampaigns: activeCampaigns || 0,
            pendingApprovals: requests || 0,
            influencersFound: influencersFound || 0
        };
    },
    async search (filters) {
        const where = {};
        if (filters.industry && filters.industry !== "All Industries") {
            where.industry = {
                contains: filters.industry,
                mode: 'insensitive'
            };
        }
        if (filters.query) {
            where.OR = [
                {
                    brandName: {
                        contains: filters.query,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: filters.query,
                        mode: 'insensitive'
                    }
                }
            ];
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].brandProfile.findMany({
            where,
            include: {
                user: {
                    select: {
                        fullname: true,
                        profilePic: true
                    }
                },
                _count: {
                    select: {
                        campaigns: true
                    }
                }
            }
        });
    }
};
}),
"[project]/backend/database/repositories/activity-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityRepository",
    ()=>ActivityRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
;
const ActivityRepository = {
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].activity.create({
            data
        });
    },
    async findById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].activity.findUnique({
            where: {
                id
            }
        });
    },
    async getUserActivities (userId, limit = 20, filter = null) {
        const where = {
            userId
        };
        if (filter === 'unread') where.isRead = false;
        if (filter === 'read') where.isRead = true;
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].activity.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            },
            take: limit
        });
    },
    async search (userId, query) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].activity.findMany({
            where: {
                userId,
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    },
    async markAsRead (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].activity.update({
            where: {
                id
            },
            data: {
                isRead: true
            }
        });
    },
    async markAllAsRead (userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].activity.updateMany({
            where: {
                userId,
                isRead: false
            },
            data: {
                isRead: true
            }
        });
    },
    async deleteById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].activity.delete({
            where: {
                id
            }
        });
    }
};
}),
"[project]/backend/database/repositories/request-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequestRepository",
    ()=>RequestRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
;
const RequestRepository = {
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].collaborationRequest.create({
            data
        });
    },
    async findById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].collaborationRequest.findUnique({
            where: {
                id
            },
            include: {
                sender: {
                    include: {
                        influencerProfile: true
                    }
                },
                receiver: true,
                campaign: true
            }
        });
    },
    async getBrandRequests (brandId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].collaborationRequest.findMany({
            where: {
                campaign: {
                    brandId
                }
            },
            include: {
                sender: {
                    include: {
                        influencerProfile: true,
                        brandProfile: true
                    }
                },
                receiver: {
                    include: {
                        influencerProfile: true,
                        brandProfile: true
                    }
                },
                campaign: true,
                tasks: {
                    select: {
                        status: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    },
    async getInfluencerRequests (influencerUserId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].collaborationRequest.findMany({
            where: {
                OR: [
                    {
                        receiverId: influencerUserId
                    },
                    {
                        senderId: influencerUserId
                    }
                ]
            },
            include: {
                campaign: {
                    include: {
                        brand: true
                    }
                },
                sender: true,
                receiver: true,
                tasks: {
                    select: {
                        status: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    },
    async updateStatus (id, status) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].collaborationRequest.update({
            where: {
                id
            },
            data: {
                status,
                respondedAt: new Date()
            }
        });
    }
};
}),
"[project]/backend/database/repositories/influencer-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InfluencerRepository",
    ()=>InfluencerRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
;
const InfluencerRepository = {
    async create (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].influencerProfile.create({
            data
        });
    },
    async findByUserId (userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].influencerProfile.findUnique({
            where: {
                userId
            },
            include: {
                user: true
            }
        });
    },
    async findById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].influencerProfile.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        });
    },
    async findAll () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].influencerProfile.findMany({
            include: {
                user: true
            }
        });
    },
    async search (filters) {
        const where = {};
        if (filters.category && filters.category !== "All Categories") {
            where.category = {
                contains: filters.category,
                mode: 'insensitive'
            };
        }
        // Basic search by name or username if provided
        if (filters.query) {
            where.OR = [
                {
                    user: {
                        fullname: {
                            contains: filters.query,
                            mode: 'insensitive'
                        }
                    }
                },
                {
                    username: {
                        contains: filters.query,
                        mode: 'insensitive'
                    }
                }
            ];
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].influencerProfile.findMany({
            where,
            include: {
                user: true
            }
        });
    },
    async update (userId, data, userData = {}) {
        // Use transaction to update both InfluencerProfile and User
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            const profile = await tx.influencerProfile.update({
                where: {
                    userId
                },
                data
            });
            // Sync with User table if userData is provided
            // Also check if legacy fields (profilePic, coverPic) are in 'data' for backward compatibility
            const userUpdateData = {
                ...userData
            };
            if (data.profilePic && !userUpdateData.profilePic) userUpdateData.profilePic = data.profilePic;
            if (data.coverPic && !userUpdateData.coverPic) userUpdateData.coverPic = data.coverPic;
            if (Object.keys(userUpdateData).length > 0) {
                await tx.user.update({
                    where: {
                        id: userId
                    },
                    data: userUpdateData
                });
            }
            return tx.influencerProfile.findUnique({
                where: {
                    userId
                },
                include: {
                    user: true
                }
            });
        });
    }
};
}),
"[project]/backend/database/repositories/collaboration-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CollaborationRepository",
    ()=>CollaborationRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
;
const CollaborationRepository = {
    // Tasks
    async getTasks (requestId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaignTask.findMany({
            where: {
                requestId
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
    },
    async createTask (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaignTask.create({
            data
        });
    },
    async updateTask (id, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaignTask.update({
            where: {
                id
            },
            data
        });
    },
    async deleteTask (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaignTask.delete({
            where: {
                id
            }
        });
    },
    // Messages
    async getMessages (requestId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].message.findMany({
            where: {
                requestId
            },
            include: {
                sender: {
                    select: {
                        fullname: true,
                        profilePic: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
    },
    async saveMessage (data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].message.create({
            data,
            include: {
                sender: {
                    select: {
                        fullname: true,
                        profilePic: true
                    }
                }
            }
        });
    }
};
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/backend/core/src/services/auth/auth-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthService",
    ()=>AuthService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/user-repository.js [app-route] (ecmascript)");
;
;
;
;
;
const SECRET = process.env.AUTH_SECRET || 'dev_secret';
const resend = process.env.RESEND_API_KEY ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY) : null;
const AuthService = {
    async register ({ email, password, role, fullname }) {
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRepository"].findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 10);
        // Create user
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRepository"].create({
            email,
            fullname,
            password: hashedPassword,
            role: {
                connect: {
                    name: role
                }
            }
        });
        // Create profile associated with user
        const upperRole = role.toUpperCase();
        if (upperRole === 'BRAND') {
            const { BrandRepository } = await __turbopack_context__.A("[project]/backend/database/repositories/brand-repository.js [app-route] (ecmascript, async loader)");
            await BrandRepository.updateProfile(user.id, {
                brandName: fullname
            });
        } else if (upperRole === 'INFLUENCER') {
            const { InfluencerRepository } = await __turbopack_context__.A("[project]/backend/database/repositories/influencer-repository.js [app-route] (ecmascript, async loader)");
            // Assuming default username from fullname/email for initial profile
            const username = fullname.toLowerCase().replace(/\s+/g, '_') + '_' + Math.random().toString(36).substring(2, 7);
            await InfluencerRepository.create({
                userId: user.id,
                username
            });
        }
        const token = this.generateToken(user);
        return {
            user,
            token
        };
    },
    async login (email, password) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRepository"].findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user);
        return {
            user,
            token
        };
    },
    async requestOTP (email) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRepository"].findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        // Generate random 6-digit OTP
        const otp = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Save to DB
        await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRepository"].update(user.id, {
            resetOtp: otp,
            resetOtpExpires: expiresAt
        });
        console.log(`[AUTH] Generated OTP for ${email}: ${otp}`);
        // Send via Resend
        try {
            if (!resend) {
                console.warn('[AUTH] Resend API key missing. Email not sent, but proceeding for development.');
                return {
                    message: 'OTP generated (Email skipped - No API Key)'
                };
            }
            await resend.emails.send({
                from: 'Brandly <onboarding@resend.dev>',
                to: email,
                subject: 'Your Brandly Password Reset Code',
                html: `
                    <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 16px;">
                        <h2 style="color: #0f172a; text-align: center;">Reset Your Password</h2>
                        <p style="color: #64748b; font-size: 14px; text-align: center;">Use the code below to complete your password reset request. This code will expire in 10 minutes.</p>
                        <div style="background: #f1f5f9; padding: 16px; border-radius: 12px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #3b82f6; margin: 24px 0;">
                            ${otp}
                        </div>
                        <p style="color: #94a3b8; font-size: 12px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
                    </div>
                `
            });
            return {
                message: 'OTP sent successfully'
            };
        } catch (error) {
            console.error('[RESEND ERROR]', error);
            throw new Error('Failed to send email. Please try again later.');
        }
    },
    async verifyOTP (email, otp) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRepository"].findByEmail(email);
        if (!user || !user.resetOtp) {
            throw new Error('Invalid request');
        }
        // Check expiration
        if (new Date() > user.resetOtpExpires) {
            throw new Error('OTP has expired');
        }
        // Check validity
        if (otp !== user.resetOtp) {
            throw new Error('Invalid OTP');
        }
        return {
            message: 'OTP verified'
        };
    },
    async resetPassword (email, newPassword) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRepository"].findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(newPassword, 10);
        await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserRepository"].update(user.id, {
            password: hashedPassword,
            resetOtp: null,
            resetOtpExpires: null
        });
        return {
            message: 'Password reset successfully'
        };
    },
    generateToken (user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
            userId: user.id,
            role: user.role.name,
            email: user.email
        }, SECRET, {
            expiresIn: '7d'
        });
    },
    validateToken (token) {
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, SECRET);
        } catch (error) {
            return null;
        }
    }
};
}),
"[project]/backend/core/src/services/auth/permission-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PermissionService",
    ()=>PermissionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const SECRET = process.env.AUTH_SECRET || 'dev_secret';
/**
 * Role-based permission definitions.
 * Maps role names to arrays of allowed actions.
 */ const ROLE_PERMISSIONS = {
    ADMIN: [
        'manage:users',
        'manage:campaigns',
        'manage:influencers',
        'manage:brands',
        'view:analytics',
        'manage:payments',
        'moderate:content'
    ],
    BRAND: [
        'create:campaign',
        'view:campaign',
        'view:matches',
        'manage:brand_profile',
        'invite:influencer'
    ],
    INFLUENCER: [
        'view:invites',
        'accept:invite',
        'reject:invite',
        'manage:influencer_profile',
        'view:earnings'
    ]
};
const PermissionService = {
    /**
     * Check if a role has a specific permission.
     * @param {string} roleName - e.g. 'BRAND', 'INFLUENCER', 'ADMIN'
     * @param {string} permission - e.g. 'create:campaign'
     * @returns {boolean}
     */ hasPermission (roleName, permission) {
        const perms = ROLE_PERMISSIONS[roleName];
        if (!perms) return false;
        return perms.includes(permission);
    },
    /**
     * Extract role from a JWT token and check permission.
     * @param {string} token - JWT token
     * @param {string} permission - Required permission string
     * @returns {{ allowed: boolean, decoded: object|null }}
     */ authorize (token, permission) {
        try {
            const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, SECRET);
            const allowed = this.hasPermission(decoded.role, permission);
            return {
                allowed,
                decoded
            };
        } catch (error) {
            return {
                allowed: false,
                decoded: null
            };
        }
    },
    /**
     * Get all permissions for a role.
     * @param {string} roleName
     * @returns {string[]}
     */ getPermissions (roleName) {
        return ROLE_PERMISSIONS[roleName] || [];
    }
};
}),
"[project]/backend/database/repositories/match-repository.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchRepository",
    ()=>MatchRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
;
const MatchRepository = {
    async saveMatches (matches) {
        if (!matches || matches.length === 0) return;
        const campaignId = matches[0].campaignId;
        // matches is an array of { campaignId, influencerId, score, breakdown }
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction([
            // 1. Clear existing matches for this campaign
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].matchScore.deleteMany({
                where: {
                    campaignId
                }
            }),
            // 2. Insert new matches
            ...matches.map((match)=>__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].matchScore.create({
                    data: match
                }))
        ]);
    },
    async findByCampaignId (campaignId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].matchScore.findMany({
            where: {
                campaignId
            },
            include: {
                influencer: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: {
                score: 'desc'
            }
        });
    }
};
}),
"[project]/backend/ai-engine/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WEIGHTS",
    ()=>WEIGHTS,
    "calculateCompatibility",
    ()=>calculateCompatibility
]);
/**
 * AI Matching Engine v1
 * Formula:
 * Score = (Niche * 0.30) + (Demographic * 0.25) + (Engagement * 0.20) + (Budget * 0.15) + (History * 0.10)
 */ const WEIGHTS = {
    NICHE: 0.30,
    DEMOGRAPHIC: 0.25,
    ENGAGEMENT: 0.20,
    BUDGET: 0.15,
    HISTORY: 0.10
};
function calculateNicheScore(campaignNiche, influencerNiche) {
    if (!campaignNiche || !influencerNiche) return 0;
    const cNiche = campaignNiche.toLowerCase();
    const iNiche = influencerNiche.toLowerCase();
    if (cNiche === iNiche) return 100;
    if (iNiche.includes(cNiche) || cNiche.includes(iNiche)) return 70;
    return 0;
}
function calculateDemographicScore(campaignAudience, influencerDemographics) {
    // Placeholder: In real world, this would compare age/gender/location maps
    // Returning a neutral score for now as we don't have deep demographic data yet
    return 50;
}
function calculateEngagementScore(engagementRate) {
    // Normalize: 0-10% -> 0-100 score
    return Math.min(engagementRate * 10, 100);
}
function calculateBudgetScore(budget, pricing) {
    if (!pricing) return 50;
    if (pricing <= budget) return 100;
    // Penalty logic
    const diff = pricing - budget;
    const penalty = diff / budget * 100;
    return Math.max(100 - penalty, 0);
}
function calculateHistoryScore(historicalSuccessRate) {
    // Assuming a 0-1 or 0-100 input
    return historicalSuccessRate || 50;
}
function calculateCompatibility(campaign, influencer) {
    const nicheScore = calculateNicheScore(campaign.niche || "", influencer.niche);
    const demographicScore = calculateDemographicScore({}, {});
    const engagementScore = calculateEngagementScore(influencer.engagementRate || 0);
    const budgetScore = calculateBudgetScore(campaign.budget || 0, influencer.pricing);
    const historyScore = calculateHistoryScore(0); // Placeholder for historical data
    const totalScore = nicheScore * WEIGHTS.NICHE + demographicScore * WEIGHTS.DEMOGRAPHIC + engagementScore * WEIGHTS.ENGAGEMENT + budgetScore * WEIGHTS.BUDGET + historyScore * WEIGHTS.HISTORY;
    return {
        score: Math.round(totalScore),
        breakdown: {
            niche: nicheScore,
            demographic: demographicScore,
            engagement: engagementScore,
            budget: budgetScore,
            history: historyScore
        }
    };
}
;
}),
"[project]/backend/ai-engine/ranker.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rankInfluencers",
    ()=>rankInfluencers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$ai$2d$engine$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/ai-engine/index.js [app-route] (ecmascript)");
;
/**
 * Rank all influencers for a given campaign and return the top N.
 * Designed to be replaceable with an ML-based engine later.
 *
 * @param {Object} campaign - Campaign object with niche, budget, etc.
 * @param {Array} influencers - Array of InfluencerProfile objects.
 * @param {number} topN - Number of top results to return (default 10).
 * @returns {Array} Ranked list of { influencerId, score, breakdown }.
 */ function rankInfluencers(campaign, influencers, topN = 10) {
    const results = influencers.map((influencer)=>{
        const { score, breakdown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$ai$2d$engine$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateCompatibility"])(campaign, influencer);
        return {
            influencerId: influencer.id,
            campaignId: campaign.id,
            score,
            breakdown
        };
    });
    // Sort descending by score, take top N
    results.sort((a, b)=>b.score - a.score);
    return results.slice(0, topN);
}
;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/backend/core/src/services/collaboration/collaboration-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CollaborationService",
    ()=>CollaborationService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$collaboration$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/collaboration-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/request-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/activity/activity-service.js [app-route] (ecmascript)");
;
;
;
const CollaborationService = {
    // Task Logic
    async getCollabTasks (requestId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$collaboration$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollaborationRepository"].getTasks(requestId);
    },
    async addCollabTask (data) {
        const task = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$collaboration$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollaborationRepository"].createTask(data);
        // Notify the other party
        const request = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].findById(data.requestId);
        if (request) {
            // Usually brand adds tasks, notify influencer
            const targetId = request.receiverId; // Assuming receiver is influencer
            await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityService"].logActivity({
                userId: targetId,
                role: "INFLUENCER",
                type: "TASK_CREATED",
                title: "New Task Assigned",
                description: `A new task "${task.title}" has been added to your collaboration.`,
                relatedId: task.id
            });
        }
        return task;
    },
    async updateCollabTask (id, data) {
        const task = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$collaboration$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollaborationRepository"].updateTask(id, data);
        // Notify updated party (simplified)
        const request = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].findById(task.requestId);
        if (request) {
            const targetId = request.receiverId;
            await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityService"].logActivity({
                userId: targetId,
                role: "INFLUENCER",
                type: "TASK_UPDATED",
                title: "Task Updated",
                description: `The task "${task.title}" has been updated.`,
                relatedId: task.id
            });
        }
        return task;
    },
    async deleteCollabTask (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$collaboration$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollaborationRepository"].deleteTask(id);
    },
    // Chat Logic
    async getCollabMessages (requestId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$collaboration$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollaborationRepository"].getMessages(requestId);
    },
    async processNewMessage (data) {
        const message = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$collaboration$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollaborationRepository"].saveMessage({
            requestId: data.requestId,
            senderId: data.senderId,
            content: data.content
        });
        // Notify the recipient
        const request = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].findById(data.requestId);
        if (request) {
            const recipientId = message.senderId === request.senderId ? request.receiverId : request.senderId;
            const recipientRole = message.senderId === request.senderId ? "INFLUENCER" : "BRAND";
            await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityService"].logActivity({
                userId: recipientId,
                role: recipientRole,
                type: "NEW_MESSAGE",
                title: "New Message",
                description: `${message.sender.fullname} sent you a message: "${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}"`,
                relatedId: request.id
            });
        }
        return message;
    }
};
}),
"[project]/backend/core/src/socket/socket-handler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getIO",
    ()=>getIO,
    "setupSocketHandlers",
    ()=>setupSocketHandlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/socket.io/wrapper.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$collaboration$2f$collaboration$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/collaboration/collaboration-service.js [app-route] (ecmascript)");
;
;
let io;
const setupSocketHandlers = (server)=>{
    io = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Server"](server, {
        cors: {
            origin: "*",
            methods: [
                "GET",
                "POST"
            ]
        }
    });
    io.on('connection', (socket)=>{
        console.log('New client connected:', socket.id);
        socket.on('join_collab', (requestId)=>{
            socket.join(requestId);
            console.log(`Socket ${socket.id} joined collaboration: ${requestId}`);
        });
        socket.on('join_user', (userId)=>{
            socket.join(`user_${userId}`);
            console.log(`Socket ${socket.id} joined personal room: user_${userId}`);
        });
        // Chat Events
        socket.on('send_message', async (data)=>{
            try {
                const savedMessage = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$collaboration$2f$collaboration$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollaborationService"].processNewMessage(data);
                io.to(data.requestId).emit('receive_message', savedMessage);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });
        // Collaboration Requests
        socket.on('send_request', (data)=>{
            // data: { brandId (userId), request }
            console.log(`New request from influencer to brand user_${data.brandId}`);
            io.to(`user_${data.brandId}`).emit('receive_request', data.request);
        });
        socket.on('respond_request', (data)=>{
            // data: { influencerId (userId), requestId, status }
            console.log(`Request response to influencer user_${data.influencerId}: ${data.status}`);
            io.to(`user_${data.influencerId}`).emit('request_updated', {
                requestId: data.requestId,
                status: data.status
            });
        });
        // Task Events
        socket.on('task_update', async (data)=>{
            try {
                const updatedTask = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$collaboration$2f$collaboration$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CollaborationService"].updateCollabTask(data.taskId, data.update);
                io.to(data.requestId).emit('task_updated', updatedTask);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        });
        socket.on('disconnect', ()=>{
            console.log('Client disconnected:', socket.id);
        });
    });
    return io;
};
const getIO = ()=>io;
}),
"[project]/backend/core/src/services/activity/activity-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityService",
    ()=>ActivityService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$activity$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/activity-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$socket$2f$socket$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/socket/socket-handler.js [app-route] (ecmascript)");
;
;
const ActivityService = {
    async logActivity (data) {
        const activity = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$activity$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityRepository"].create({
            userId: data.userId,
            role: data.role,
            type: data.type,
            title: data.title,
            description: data.description || "",
            relatedId: data.relatedId || null,
            isRead: false
        });
        // Emit real-time notification
        const io = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$socket$2f$socket$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getIO"])();
        if (io) {
            io.to(`user_${data.userId}`).emit('new_activity', activity);
        }
        return activity;
    },
    async getUserActivities (userId, limit = 20, filter = null) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$activity$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityRepository"].getUserActivities(userId, limit, filter);
    },
    async markAsRead (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$activity$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityRepository"].markAsRead(id);
    },
    async markAllAsRead (userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$activity$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityRepository"].markAllAsRead(userId);
    },
    async deleteActivity (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$activity$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityRepository"].deleteById(id);
    },
    async searchActivities (userId, query) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$activity$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityRepository"].search(userId, query);
    }
};
}),
"[project]/backend/core/src/services/campaign/campaign-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CampaignService",
    ()=>CampaignService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/campaign-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/influencer-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$match$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/match-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$ai$2d$engine$2f$ranker$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/ai-engine/ranker.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/activity/activity-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/user-repository.js [app-route] (ecmascript)");
;
;
;
;
;
;
const CampaignService = {
    /**
     * Create a new campaign for a brand.
     * @param {Object} data - Campaign details including targets and requirements
     * @returns {Promise<Object>} The created campaign.
     */ async createCampaign (data) {
        const campaign = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CampaignRepository"].create({
            brandId: data.brandId,
            title: data.title,
            description: data.description || "",
            budgetMin: data.budgetMin || 0,
            budgetMax: data.budgetMax || 0,
            targetCategory: data.targetCategory || [],
            targetPlatform: data.targetPlatform || [],
            campaignTimeline: data.campaignTimeline || "",
            deliverables: data.deliverables || "",
            targetAudience: data.targetAudience || "",
            additionalRequirements: data.additionalRequirements || "",
            status: data.status || 'DRAFT'
        });
        // Log Activity
        await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityService"].logActivity({
            userId: campaign.brand.userId,
            role: "BRAND",
            type: "CAMPAIGN_CREATED",
            title: "Campaign Created",
            description: `You created a new campaign: ${campaign.title}`,
            relatedId: campaign.id
        });
        return campaign;
    },
    /**
     * Run AI matching for a campaign.
     * Fetches all influencers, runs the engine, stores results, returns top 10.
     * @param {string} campaignId
     * @returns {Promise<Object>} Campaign with ranked matches.
     */ async matchInfluencers (campaignId) {
        // 1. Get campaign
        const campaign = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CampaignRepository"].findById(campaignId);
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        // 2. Fetch all available influencers
        const influencers = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerRepository"].findAll();
        if (!influencers.length) {
            throw new Error('No influencers available for matching');
        }
        // 3. Run AI engine — returns top 10 ranked results
        const rankedMatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$ai$2d$engine$2f$ranker$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rankInfluencers"])(campaign, influencers, 10);
        // 4. Store matches in the database
        await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$match$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MatchRepository"].saveMatches(rankedMatches);
        // 5. Update campaign status to ACTIVE
        await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CampaignRepository"].updateStatus(campaignId, 'ACTIVE');
        // Log Activity
        await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityService"].logActivity({
            userId: campaign.brand.userId,
            role: "BRAND",
            type: "CAMPAIGN_UPDATED",
            title: "Influencers Matched",
            description: `AI matching completed for "${campaign.title}". Found ${rankedMatches.length} matches.`,
            relatedId: campaignId
        });
        return {
            campaignId,
            status: 'ACTIVE',
            totalInfluencersEvaluated: influencers.length,
            topMatches: rankedMatches
        };
    },
    /**
     * Full campaign flow: create + match.
     * @param {{ brandId: string, title: string, description: string, budget: number, niche?: string }} data
     * @returns {Promise<Object>} Campaign with matches.
     */ async createAndMatch (data) {
        const campaign = await this.createCampaign(data);
        const result = await this.matchInfluencers(campaign.id);
        return result;
    },
    /**
     * Get campaign details with match results.
     * @param {string} campaignId
     * @returns {Promise<Object>}
     */ async getCampaignWithMatches (campaignId) {
        const campaign = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CampaignRepository"].findById(campaignId);
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        const matches = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$match$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MatchRepository"].findByCampaignId(campaignId);
        return {
            ...campaign,
            matches
        };
    },
    /**
     * Get all campaigns for a brand.
     * @param {string} brandId
     * @returns {Promise<Array>}
     */ async getBrandCampaigns (brandId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CampaignRepository"].findByBrandId(brandId);
    },
    /**
     * Update campaign resources.
     * @param {string} campaignId
     * @param {Array} resources
     * @returns {Promise<Object>}
     */ async updateCampaignResources (campaignId, resources) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CampaignRepository"].update(campaignId, {
            resources
        });
    }
};
}),
"[project]/backend/core/src/services/brand/brand-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandService",
    ()=>BrandService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$brand$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/brand-repository.js [app-route] (ecmascript)");
;
const BrandService = {
    /**
     * Retrieve a brand's profile by their user ID.
     */ async getBrandProfile (userId) {
        let profile = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$brand$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BrandRepository"].findByUserId(userId);
        if (!profile) {
            // Resilient lookup: if profile is missing, try to create it
            // This handles users created before the registration fix
            try {
                profile = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$brand$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BrandRepository"].updateProfile(userId, {});
            } catch (error) {
                console.error(`Failed to auto-create brand profile for user ${userId}:`, error);
                throw new Error('Brand profile not found and could not be created');
            }
        }
        return profile;
    },
    /**
     * Update or create a brand's specific profile details.
     */ async updateBrandProfile (userId, profileData) {
        const profile = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$brand$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BrandRepository"].updateProfile(userId, profileData);
        // Log Activity
        const { ActivityService } = await __turbopack_context__.A("[project]/backend/core/src/services/activity/activity-service.js [app-route] (ecmascript, async loader)");
        await ActivityService.logActivity({
            userId,
            role: "BRAND",
            type: "PROFILE_UPDATED",
            title: "Profile Updated",
            description: "Your brand profile information has been successfully updated.",
            relatedId: profile.id
        });
        return profile;
    },
    /**
     * Get aggregate statistics for the brand dashboard.
     */ async getDashboardStats (brandId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$brand$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BrandRepository"].getDashboardStats(brandId);
    },
    /**
     * Search brands based on filters.
     */ async searchBrands (filters) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$brand$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BrandRepository"].search(filters);
    },
    /**
     * Get a brand's profile by its ID (for influencer view).
     */ async getBrandById (id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$brand$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BrandRepository"].findById(id);
    }
};
}),
"[project]/backend/core/src/services/request/request-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequestService",
    ()=>RequestService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/request-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/activity/activity-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/campaign-repository.js [app-route] (ecmascript)");
;
;
;
const RequestService = {
    /**
     * Create a collaboration request and log the activity.
     */ async sendRequest (data) {
        try {
            const request = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].create({
                campaignId: data.campaignId,
                senderId: data.senderId,
                receiverId: data.receiverId,
                proposedBudget: data.proposedBudget,
                note: data.note,
                status: "PENDING"
            });
            // Fetch campaign to get title for notification
            const campaign = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CampaignRepository"].findById(data.campaignId);
            // Notify Receiver
            await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityService"].logActivity({
                userId: data.receiverId,
                role: "INFLUENCER",
                type: "REQUEST_RECEIVED",
                title: "New Collaboration Request",
                description: `You have received a new collaboration request for campaign: ${campaign?.title}`,
                relatedId: request.id
            });
            return request;
        } catch (error) {
            // Prisma code P2002 is for unique constraint failed
            if (error.code === 'P2002') {
                throw new Error("Invitation already sent to this influencer for this campaign");
            }
            throw error;
        }
    },
    /**
     * Respond to a request (ACCEPT/REJECT/CANCEL).
     */ async respondToRequest (requestId, status, responderId) {
        const request = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].findById(requestId);
        if (!request) throw new Error("Request not found");
        if (request.receiverId !== responderId && request.senderId !== responderId) {
            throw new Error("Unauthorized to respond to this request");
        }
        const updatedRequest = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].updateStatus(requestId, status);
        // If accepted, update the campaign status as well
        if (status === 'ACCEPTED') {
            await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CampaignRepository"].updateStatus(request.campaignId, 'IN_PROGRESS');
        }
        // Notify the original sender about the decision
        const notifyTargetId = responderId === request.receiverId ? request.senderId : request.receiverId;
        await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ActivityService"].logActivity({
            userId: notifyTargetId,
            role: "BRAND",
            type: `REQUEST_${status}`,
            title: `Collaboration Request ${status}`,
            description: `A collaboration request for ${request.campaign.title} was ${status.toLowerCase()}.`,
            relatedId: requestId
        });
        return updatedRequest;
    },
    /**
     * Get all requests involving a specific brand's campaigns.
     */ async getBrandRequests (brandId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].getBrandRequests(brandId);
    },
    /**
     * Get all requests involving a specific influencer.
     */ async getInfluencerRequests (userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].getInfluencerRequests(userId);
    }
};
}),
"[project]/backend/core/src/services/brand/influencer-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InfluencerService",
    ()=>InfluencerService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/influencer-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/request-repository.js [app-route] (ecmascript)");
;
;
const InfluencerService = {
    /**
     * Get all influencers with their user profiles.
     */ async getAllInfluencers () {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerRepository"].findAll();
    },
    /**
     * Search influencers based on filters (category, platform, query).
     * @param {Object} filters
     */ async searchInfluencers (filters) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerRepository"].search(filters);
    },
    /**
     * Get a single influencer by ID with full details.
     * @param {string} id
     */ async getInfluencerById (id) {
        const byProfileId = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerRepository"].findById(id);
        if (byProfileId) return byProfileId;
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerRepository"].findByUserId(id);
    },
    /**
     * Get dashboard stats for an influencer
     * @param {string} userId
     */ async getDashboardStats (userId) {
        const influencer = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerRepository"].findByUserId(userId);
        if (!influencer) throw new Error("Influencer profile not found");
        const requests = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestRepository"].getInfluencerRequests(userId);
        const activeCampaignsCount = requests.filter((r)=>r.status === 'ACCEPTED').length;
        const pendingRequestsCount = requests.filter((r)=>r.status === 'PENDING' && r.receiverId === userId).length;
        // Mock earnings for now or calculate if payment model is ready
        // In a real app, we would sum up payments
        const totalEarnings = 0;
        const completedCount = requests.filter((r)=>r.status === 'COMPLETED').length;
        return {
            stats: {
                activeCampaigns: activeCampaignsCount,
                totalEarnings: `$${totalEarnings}`,
                pendingRequests: pendingRequestsCount,
                completed: completedCount
            },
            influencer
        };
    },
    /**
     * Update influencer profile and sync with user table.
     */ async updateInfluencerProfile (userId, profileData) {
        const influencer = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerRepository"].findByUserId(userId);
        if (!influencer) throw new Error("Influencer profile not found");
        const { fullName, profilePic, coverPic, bio, platforms, ...rest } = profileData;
        // 1. Prepare User update data
        const userData = {};
        if (fullName) userData.fullname = fullName;
        if (profilePic) userData.profilePic = profilePic;
        if (coverPic) userData.coverPic = coverPic;
        // 2. Prepare InfluencerProfile update data
        const influencerUpdateData = {
            ...rest
        };
        if (bio !== undefined) influencerUpdateData.about = bio;
        if (platforms) {
            try {
                influencerUpdateData.platforms = typeof platforms === 'string' ? JSON.parse(platforms) : platforms;
            } catch (e) {
                console.error("Failed to parse platforms:", e);
            }
        }
        // Use repository to handle the transaction and sync
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerRepository"].update(userId, influencerUpdateData, userData);
    }
};
}),
"[project]/backend/core/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// Database exports
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$user$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/user-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$campaign$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/campaign-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$brand$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/brand-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$activity$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/activity-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$request$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/request-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$influencer$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/influencer-repository.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$database$2f$repositories$2f$collaboration$2d$repository$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/database/repositories/collaboration-repository.js [app-route] (ecmascript)");
// Service exports
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$auth$2f$auth$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/auth/auth-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$auth$2f$permission$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/auth/permission-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$campaign$2f$campaign$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/campaign/campaign-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$brand$2f$brand$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/brand/brand-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$activity$2f$activity$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/activity/activity-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$request$2f$request$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/request/request-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$brand$2f$influencer$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/brand/influencer-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$collaboration$2f$collaboration$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/collaboration/collaboration-service.js [app-route] (ecmascript)");
// AI exports
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$ai$2d$engine$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/ai-engine/index.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/frontend/main-app/app/api/influencer/profile/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/backend/core/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$auth$2f$auth$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/auth/auth-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$brand$2f$influencer$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/core/src/services/brand/influencer-service.js [app-route] (ecmascript)");
;
;
async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Not authenticated'
        }, {
            status: 401
        });
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$auth$2f$auth$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthService"].validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unauthorized'
        }, {
            status: 403
        });
        const { influencer } = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$brand$2f$influencer$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerService"].getDashboardStats(decoded.userId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            profile: influencer
        });
    } catch (error) {
        console.error('Fetch profile error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function PATCH(req) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Not authenticated'
        }, {
            status: 401
        });
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$auth$2f$auth$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthService"].validateToken(token);
        if (!decoded || decoded.role !== 'INFLUENCER') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unauthorized'
        }, {
            status: 403
        });
        const data = await req.json();
        const updatedProfile = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$core$2f$src$2f$services$2f$brand$2f$influencer$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InfluencerService"].updateInfluencerProfile(decoded.userId, data);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            profile: updatedProfile
        });
    } catch (error) {
        console.error('Update profile error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8f13a4aa._.js.map