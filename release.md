# 🤖 Project Context: Brand-Influencer SaaS (Brandly)

## 🎯 Project Overview

**Brandly** is a high-performance SaaS platform designed to facilitate seamless collaborations between Brands and Influencers. It features an AI-driven matching engine, a robust activity tracking system, and a modern, glassmorphism-inspired UI.

### 🏗️ Monorepo Architecture

| Workspace        | Path                    | Responsibility                                    |
| ---------------- | ----------------------- | ------------------------------------------------- |
| **Frontend**     | `frontend/main-app`     | Next.js 16 (App Router), Dashboard, Landing Pages |
| **Backend Core** | `backend/core`          | Business logic (Services), Auth, Permissions      |
| **Database**     | `backend/database`      | Prisma schemas, PostgreSQL Repositories           |
| **AI Engine**    | `backend/ai-engine`     | Weighted scoring & ranking algorithms             |
| **Shared UI**    | `frontend/shared/ui`    | Reusable React components                         |
| **Shared Store** | `frontend/shared/store` | Zustand state management (Auth, UI, Campaigns)    |

---

## 🛠️ Technical Stack

- **Frontend**: Next.js 16 (Turbopack), Tailwind CSS, Lucide Icons, Framer Motion.
- **State Management**: Zustand (Per-module stores).
- **Backend API**: Next.js API Routes (Route Groups for Auth, Brand, Influencer).
- **ORM**: Prisma (with Neon PostgreSQL).
- **Auth**: JWT in HTTP-Only cookies, bcryptjs, Edge-compatible Middleware.
- **Email**: Resend (OTP dispatch).
- **Storage**: Cloudinary (Image/Asset management).

---

## 🤖 AI Matching Logic

**Weighted Scoring Formula:**
`Score = (Niche × 0.30) + (Demographic × 0.25) + (Engagement × 0.20) + (Budget × 0.15) + (History × 0.10)`

- **`Niche`**: Exact platform/category match.
- **`Engagement`**: Normalized interaction rates.
- **`Budget`**: Proximity to campaign budget range.

---

## 🚦 Key API Endpoints

- `/api/auth/me`: Returns current user session with role-based profile data.
- `/api/brand/campaigns/[id]/matches`: Triggers AI matching and returns ranked influencers.
- `/api/brand/requests`: Handles manual collaboration invitations.
- `/api/notifications`: Returns user-specific activity logs with search/filter support.

---

## 📋 Recent Task Context (Last 10 Tasks)

These tasks represent the most recent logic changes and feature additions:

1.  **AI Match 500 Fix**: Resolved unique constraint (`P2002`) and foreign key (`P2003`) errors during matching.
2.  **ESM Import Resolution**: Fixed missing `.js` extensions in backend repositories allowing shared core logic to load in Next.js.
3.  **Manual Invitations**: Implemented a "Request to Campaign" UI on the search page with real-time toast feedback.
4.  **Cloudinary DB Sync**: Synchronized Cloudinary public URLs between `User.profilePic` and `BrandProfile.logo` using Prisma transactions.
5.  **Activity Tracking System**: Automated logging for campaign creation, matching, and profile updates across services.
6.  **Notification Center**: Built a full Notification UI with search, filtering (All/Unread), and "View Details" drawers.
7.  **Defensive Auth Logic**: Added role-existence checks in `/api/auth/me` to prevent frontend crashes on incomplete profiles.
8.  **Calendar Input**: Updated campaign creation forms to use date pickers instead of hardcoded strings.
9.  **Influencer Profile UI**: Corrected data mismatch in influencer cards to show real-time stats (Engagement rate, category).
10. **Role-Based Redirection**: Fixed authentication redirects to ensure users land on `/brand` or `/influencer` dashboards correctly.

---

## 🚀 Current Technical State

- **Stability**: High. Backend initialized successfully via diagnostic scripts. All 500 errors resolved.
- **Auth**: Functional session persistence and role-based guarding.
- **Data Flow**: Services now use proper `userId` for notifications, resolving earlier database failures.
- **Next Version/Milestone**: Optimization of the AI Engine demographics weighing (currently using 50% placeholder).

---

**Agent Instruction**: Prioritize `@repo/core` services for business logic rather than writing raw Prisma queries in API routes to maintain architectural integrity.

