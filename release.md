# 🤖 AI Agent Context Document — Brandly (Brand-Influencer SaaS Platform)

> **Purpose of this document:** This file is the single source of truth for any AI agent, LLM, or developer to fully understand the current state, architecture, and context of the Brandly project without needing to read the entire codebase. Keep it updated whenever significant changes are made.

---

## 📌 Project Identity

| Field                 | Value                                                 |
| --------------------- | ----------------------------------------------------- |
| **Project Name**      | Brandly                                               |
| **Type**              | Final Year Project (FYP) — SaaS Web Application       |
| **Domain**            | Brand ↔ Influencer Marketing & Collaboration          |
| **Stage**             | Active Development (Post-MVP, Feature-Complete Phase) |
| **Last Updated**      | March 2026                                            |
| **Primary Developer** | Sami Afzal                                            |

---

## 🎯 What Is Brandly?

Brandly is a **B2B/B2C SaaS platform** that connects **Brands** with **Influencers** for marketing campaigns. It provides:

1. **AI-Powered Matching** — An AI engine scores and ranks influencers for each campaign using a weighted formula.
2. **Collaboration Management** — Brands send collaboration requests; influencers accept/reject; both parties manage tasks, deadlines, and chat in real-time.
3. **Real-Time Communication** — Socket.io powers an in-app chat between brands and influencers, live collaboration request updates, and popup/sound-based alert notifications.
4. **Activity & Notification Center** — All platform events (campaign created, match found, request sent/accepted, task updated) are logged as `Activity` records and surfaced in a notification UI with read/unread states.
5. **Role-Based Access** — Three roles: `BRAND`, `INFLUENCER`, `ADMIN`. Each has its own dedicated dashboard and API surface.

---

## 🏗️ Monorepo Architecture

The project is structured as an **npm workspaces monorepo** rooted at `/Brandly`.

```
Brandly/
├── frontend/
│   ├── main-app/          # Next.js 15 App Router — the entire UI (port 3000)
│   └── shared/
│       ├── ui/            # @repo/ui — shared React component library
│       └── store/         # @repo/store — Zustand global state stores
├── backend/
│   ├── core/              # @repo/core — Express-style services + Socket.io server (port 3001)
│   ├── database/          # @repo/database — Prisma ORM + Neon PostgreSQL
│   └── ai-engine/         # @repo/ai-engine — AI matching/ranking logic
├── shared/
│   └── config/            # Shared ESLint, Tailwind, PostCSS config
├── release.md             # ← THIS FILE (AI context document)
├── released.md            # Historical release notes (v1–v5)
├── models.md              # Quick Prisma model reference
└── package.json           # Root workspace config
```

### Package Aliases

| Alias             | Path                    | Role                         |
| ----------------- | ----------------------- | ---------------------------- |
| `@repo/ui`        | `frontend/shared/ui`    | Shared React components      |
| `@repo/store`     | `frontend/shared/store` | Zustand stores               |
| `@repo/core`      | `backend/core`          | Business logic services      |
| `@repo/database`  | `backend/database`      | Prisma client + repositories |
| `@repo/ai-engine` | `backend/ai-engine`     | AI scoring engine            |

### ⚠️ Critical Architectural Rule

> **ALWAYS use `@repo/core` services for business logic instead of writing raw Prisma queries directly in Next.js API routes.** This preserves the layered architecture. API routes should be thin — they only parse the request and call a service.

---

## ⚙️ Technical Stack

| Layer                  | Technology                                                                      |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Frontend Framework** | Next.js 15 (App Router, Turbopack)                                              |
| **Styling**            | Tailwind CSS v4 + custom glassmorphism design tokens                            |
| **State Management**   | Zustand (per-module stores: auth, campaign, UI)                                 |
| **Backend Services**   | Node.js + Express-compatible service classes (`@repo/core`)                     |
| **Real-Time**          | Socket.io (standalone server on port 3001)                                      |
| **ORM**                | Prisma with Neon PostgreSQL (serverless)                                        |
| **Auth**               | JWT in HTTP-only cookies (7-day expiry), `bcryptjs`, Edge-compatible `proxy.js` |
| **Email**              | Resend API (branded HTML OTP emails)                                            |
| **Image Storage**      | Cloudinary (profile pictures, logos, assets)                                    |
| **Package Manager**    | npm workspaces                                                                  |

---

## 🗂️ Frontend Structure (`frontend/main-app/app/`)

### Route Groups

```
app/
├── (auth)/                          # Auth layout — auto-redirects authenticated users
│   ├── login/page.js
│   ├── signup/page.js               # Role selector: Brand / Influencer
│   ├── signup/brand/page.js
│   ├── signup/influencer/page.js
│   └── forgot-password/
│       ├── page.js                  # Email input → send OTP
│       ├── otp/page.js              # OTP verification
│       └── new-password/page.js
│
├── (dashboard)/                     # Protected — guarded by proxy.js middleware
│   ├── brand/
│   │   ├── page.js                  # Brand dashboard (stats, recent activity, campaigns)
│   │   ├── layout.js                # Brand sidebar layout
│   │   ├── campaigns/page.js        # View all brand campaigns
│   │   ├── create-campaign/page.js  # Campaign creation form
│   │   ├── ai-match/page.js         # AI match results for a campaign
│   │   ├── search-influencers/page.js # Browse + filter influencers
│   │   ├── influencer/page.js       # View individual influencer profile
│   │   ├── collaborations/page.js   # Active collaborations list
│   │   ├── collaborations/[id]/page.js # Collaboration detail: chat + tasks
│   │   ├── my-requests/page.js      # Outgoing collaboration requests
│   │   ├── notifications/page.js    # Notification center (with search/filter)
│   │   └── profile-settings/page.js # Brand profile editor (Cloudinary upload)
│   │
│   ├── influencer/
│   │   ├── page.js                  # Influencer dashboard
│   │   ├── layout.js                # Influencer sidebar layout
│   │   ├── campaigns/page.js        # Browse available brand campaigns
│   │   ├── campaigns/[id]/page.js   # Campaign detail view
│   │   ├── search-brands/page.js    # Browse brands
│   │   ├── brands/page.js           # Brand listing
│   │   ├── collaborations/page.js   # Active collaborations
│   │   ├── collaborations/[id]/page.js # Collaboration detail: chat + tasks
│   │   ├── collaboration-requests/page.js # Incoming requests (accept/reject)
│   │   ├── pending-requests/page.js  # Sent requests pending response
│   │   ├── notifications/page.js    # Notification center
│   │   └── profile-settings/page.js # Influencer profile editor
│   │
│   └── admin/page.js                # Admin dashboard
│
├── (marketing)/                     # Public landing + feature pages
│   ├── page.js                      # Landing page (Hero, Features, Stats, CTA)
│   ├── features/analytics/
│   ├── features/campaigns/
│   ├── features/find-matches/
│   ├── features/verification/
│   ├── resources/blog/
│   ├── resources/case-studies/
│   └── resources/help-center/
│
└── api/                             # Next.js API Routes (thin layer → @repo/core)
    ├── auth/
    │   ├── register/route.js
    │   ├── login/route.js
    │   ├── logout/route.js
    │   ├── me/route.js              # Returns full user + role-based profile
    │   ├── forgot-password/route.js
    │   ├── verify-otp/route.js
    │   └── reset-password/route.js
    ├── brand/
    │   ├── campaigns/route.js           # GET all / POST create campaign
    │   ├── campaigns/[id]/route.js      # GET / PATCH / DELETE single campaign
    │   ├── campaigns/[id]/matches/route.js # POST: trigger AI match
    │   ├── collaborations/route.js      # GET brand collaborations
    │   ├── collaborations/[id]/route.js # GET single collaboration detail
    │   ├── dashboard-stats/route.js     # GET brand KPIs
    │   ├── influencers/route.js         # GET paginated influencer list
    │   ├── influencers/[id]/route.js    # GET single influencer profile
    │   ├── profile/route.js             # GET / PATCH brand profile
    │   ├── ai-recommendations/route.js  # GET AI recommendations
    │   ├── recent-activity/route.js     # GET recent brand activities
    │   └── requests/route.js            # GET / POST collaboration requests
    ├── influencer/
    │   ├── brands/route.js              # GET brand listing
    │   ├── collaborations/route.js      # GET influencer collaborations
    │   ├── collaborations/[id]/route.js # GET collaboration detail
    │   ├── dashboard-stats/route.js     # GET influencer KPIs
    │   ├── profile/route.js             # GET / PATCH influencer profile
    │   ├── profile/[id]/route.js        # GET influencer profile by ID
    │   └── requests/route.js            # GET / PATCH collaboration requests (accept/reject)
    ├── campaigns/[id]/route.js          # Public campaign detail view
    ├── influencers/route.js             # Public influencer list
    └── notifications/
        ├── route.js                     # GET all notifications
        ├── [id]/route.js                # PATCH single notification (mark read)
        ├── read/route.js                # PATCH mark one notification read
        └── read-all/route.js            # PATCH mark all notifications read
```

---

## 🗄️ Database Schema (Prisma — Neon PostgreSQL)

12 models total. Key relationships described below.

### Models Overview

| Model                  | Purpose                        | Key Fields                                                                                                                                                                               |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Role`                 | User role definition           | `name` (BRAND/INFLUENCER/ADMIN), `permissions[]`                                                                                                                                         |
| `User`                 | Core user account              | `email`, `password`, `roleId`, `profilePic`, `coverPic`, `isVerified`, `lastLogin`, soft delete via `deletedAt`                                                                          |
| `BrandProfile`         | Brand-specific data            | `brandName`, `industry`, `website`, `address`, `description`, `logo`, `budgetMin`, `budgetMax`                                                                                           |
| `InfluencerProfile`    | Influencer-specific data       | `username`, `about`, `category`, `location`, `portfolio`, `averageRating`, `isAvailable`, `platforms` (JSON array of `{name, handle, followers, engagementRate}`)                        |
| `Campaign`             | Marketing campaign             | `title`, `description`, `budgetMin/Max`, `targetCategory[]`, `targetPlatform[]`, `campaignTimeline`, `deliverables`, `targetAudience`, `status` (ACTIVE/COMPLETED/ARCHIVED), soft delete |
| `CollaborationRequest` | Brand↔Influencer collaboration | `campaignId`, `senderId`, `receiverId`, `proposedBudget`, `note`, `status` (PENDING/ACCEPTED/REJECTED), unique per (sender, receiver, campaign)                                          |
| `Message`              | In-collaboration chat messages | `requestId` (→ CollaborationRequest), `senderId`, `content`                                                                                                                              |
| `CampaignTask`         | Task within a collaboration    | `requestId`, `title`, `description`, `status` (PENDING/IN_PROGRESS/DONE), `dueDate`                                                                                                      |
| `Activity`             | Notification/activity log      | `userId`, `role`, `type`, `title`, `description`, `relatedId`, `isRead`                                                                                                                  |
| `MatchScore`           | AI scoring result              | `campaignId`, `influencerId`, `score`, `breakdown` (JSON: per-factor scores), unique per (campaign, influencer)                                                                          |
| `Analytics`            | Campaign analytics data        | `campaignId`, `metric`, `value`, `date`                                                                                                                                                  |
| `Payment`              | Payment records                | `amount`, `status`, `type` (ESCROW/PAYOUT), `reference`                                                                                                                                  |

### Prisma Schema Location

```
backend/database/prisma/schema.prisma
```

---

## 🤖 AI Engine (`@repo/ai-engine`)

### Weighted Scoring Formula

```
Score = (Niche × 0.30) + (Demographic × 0.25) + (Engagement × 0.20) + (Budget × 0.15) + (History × 0.10)
```

| Factor          | Weight | Current Logic                                                         |
| --------------- | ------ | --------------------------------------------------------------------- |
| **Niche**       | 30%    | Exact match → 100, partial match → 70, no match → 0                   |
| **Demographic** | 25%    | ⚠️ Placeholder — returns neutral 50 (pending proper demographic data) |
| **Engagement**  | 20%    | `min(engagementRate × 10, 100)` — normalized                          |
| **Budget**      | 15%    | Full score if within campaign budget range; penalty for overrun       |
| **History**     | 10%    | ⚠️ Placeholder — returns default 50 (pending historical data)         |

**Exports:** `calculateCompatibility(campaign, influencer)`, `rankInfluencers(campaign, influencers, topN)`, `WEIGHTS`

**⚠️ Next Milestone:** Improve Demographic (25%) and History (10%) factor scoring with real data.

---

## 🔌 Real-Time Layer (Socket.io)

A **standalone Socket.io server** runs separately from Next.js on **port 3001**.

**Server location:** `backend/core/server.js`
**Handler:** `backend/core/src/socket/socket-handler.js`

### Socket Events

| Event (Client → Server)  | Event (Server → Client)                | Description                                     |
| ------------------------ | -------------------------------------- | ----------------------------------------------- |
| `join_collab(requestId)` | —                                      | Join collaboration-specific room                |
| `join_user(userId)`      | —                                      | Join personal notification room `user_{userId}` |
| `send_message(data)`     | `receive_message(message)`             | Send and persist a chat message                 |
| `send_request(data)`     | `receive_request(request)`             | Notify brand of new collaboration request       |
| `respond_request(data)`  | `request_updated({requestId, status})` | Notify influencer of brand's response           |
| `task_update(data)`      | `task_updated(task)`                   | Update and broadcast task status change         |

**Frontend connects to:** `http://localhost:3001` (configurable via env)

---

## 🔐 Authentication & Authorization

### Flow

```
User → /api/auth/login
       → AuthService.login() (bcrypt verify + JWT sign)
       → HTTP-only cookie set (JWT, 7-day expiry)
       → Zustand useAuthStore updated client-side

All dashboard routes protected by proxy.js (Edge Runtime)
       → Decodes JWT via atob (no jsonwebtoken in Edge)
       → Checks role → redirects if unauthorized
```

### Auth API Endpoints

| Endpoint                    | Method | Purpose                            |
| --------------------------- | ------ | ---------------------------------- |
| `/api/auth/register`        | POST   | Create user with role              |
| `/api/auth/login`           | POST   | Authenticate, set JWT cookie       |
| `/api/auth/logout`          | POST   | Clear cookie                       |
| `/api/auth/me`              | GET    | Return current user + role profile |
| `/api/auth/forgot-password` | POST   | Generate + email OTP via Resend    |
| `/api/auth/verify-otp`      | POST   | Validate OTP                       |
| `/api/auth/reset-password`  | POST   | Hash + save new password           |

### Defensive Checks in `/api/auth/me`

Returns both `user.brandProfile` or `user.influencerProfile` alongside role to avoid frontend crashes when profiles are incomplete.

---

## 🛠️ Backend Services (`backend/core/src/services/`)

Business logic is fully encapsulated in service classes, organized into subdirectories:

| Service File                             | Responsibility                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| `auth/auth-service.js`                   | Registration, login, OTP lifecycle, password reset                          |
| `auth/permission-service.js`             | RBAC — `hasPermission()`, `authorize()`, `getPermissions()`                 |
| `brand/brand-service.js`                 | Brand profile CRUD, Cloudinary logo sync                                    |
| `campaign/campaign-service.js`           | `createCampaign`, `matchInfluencers` (calls AI engine), `getBrandCampaigns` |
| `collaboration/collaboration-service.js` | Collaboration requests, `processNewMessage`, `updateCollabTask`             |
| `activity/activity-service.js`           | Log and retrieve `Activity` records (notifications)                         |
| `request/request-service.js`             | Collaboration request lifecycle (send, accept, reject)                      |

---

## 📦 Zustand Stores (`frontend/shared/store/`)

| Store              | File                | State                                  |
| ------------------ | ------------------- | -------------------------------------- |
| `useAuthStore`     | `auth-store.js`     | Current user, login/logout actions     |
| `useCampaignStore` | `campaign-store.js` | Campaign list, add/set actions         |
| `useUIStore`       | `ui-store.js`       | Marketing page content (feature pages) |

---

## 🌐 Environment Variables

### `backend/core/.env`

| Variable         | Purpose                               |
| ---------------- | ------------------------------------- |
| `AUTH_SECRET`    | JWT signing key                       |
| `RESEND_API_KEY` | Resend email API key for OTP          |
| `FRONTEND_URL`   | CORS allowed origin                   |
| `SOCKET_PORT`    | Socket.io server port (default: 3001) |

### `backend/database/.env`

| Variable       | Purpose                           |
| -------------- | --------------------------------- |
| `DATABASE_URL` | Neon PostgreSQL connection string |

### `frontend/main-app/.env.local`

| Variable                 | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `NEXT_PUBLIC_SOCKET_URL` | Socket.io server URL (http://localhost:3001) |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary account                           |
| `CLOUDINARY_API_KEY`     | Cloudinary API key                           |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret                        |
| `JWT_SECRET`             | JWT verification in API routes               |

---

## 🚀 Running the Project

```bash
# Root — install all workspace dependencies
npm install

# Start everything (frontend + backend socket server)
npm run dev

# Start ONLY frontend (Next.js on port 3000)
npm run dev --workspace=frontend/main-app

# Start ONLY socket server (port 3001)
node backend/core/server.js

# Prisma Studio (DB GUI)
npx prisma studio --schema=backend/database/prisma/schema.prisma

# Push schema changes to DB
npx prisma db push --schema=backend/database/prisma/schema.prisma

# Seed the database
node backend/database/seed.js
```

**Access Points:**

- Frontend: `http://localhost:3000`
- Socket Server: `http://localhost:3001`
- Prisma Studio: `http://localhost:5555`

---

## 📋 Feature Completion Status

### ✅ Fully Implemented

- [x] Role-based auth (JWT, HTTP-only cookies, Edge middleware)
- [x] Password reset via email OTP (Resend API)
- [x] Brand dashboard with KPIs and recent activity
- [x] Influencer dashboard with KPIs
- [x] Campaign creation form with date pickers
- [x] Campaign listing and management
- [x] AI-powered influencer matching (`/brand/ai-match`)
- [x] Manual collaboration requests (brand → influencer)
- [x] Collaboration request responses (influencer accept/reject)
- [x] Real-time in-collaboration chat (Socket.io)
- [x] Collaboration task management (create/update tasks)
- [x] Search & filter influencers (brand) and brands (influencer)
- [x] Activity/Notification Center with search, filter (All/Unread), mark as read
- [x] Real-time alert popups with sound for new notifications
- [x] Unread message badge on chat icon
- [x] Brand profile settings (Cloudinary image upload for logo + profilePic)
- [x] Influencer profile settings (platform data, bio, category)
- [x] Cloudinary sync between `User.profilePic` and `BrandProfile.logo`
- [x] Admin dashboard (basic)
- [x] Landing page + 4 feature marketing pages + 3 resource pages

### ⚠️ Partially Implemented / Pending

- [ ] **AI Demographics Factor** — currently returns neutral 50; needs real audience data
- [ ] **AI History Factor** — currently returns default 50; needs historical collaboration data
- [ ] **Admin Dashboard** — basic shell only; management features not built
- [ ] **Payment System** — `Payment` model exists but no payment UI or gateway integrated
- [ ] **Analytics Charts** — `Analytics` model exists; dashboard charts are placeholder/static
- [ ] **Google OAuth** — `googleId` and `isGoogleUser` fields exist on User; not yet wired up
- [ ] **Email Verification** — `isVerified` field exists but verified email flow not implemented

---

## 🚀 Release History
 
 ### v5.0.0 — Production-Ready SaaS (Feb 27, 2026)
 - **Edge Runtime Middleware**: All dashboards protected by JWT role-based proxy.
 - **Admin Dashboard**: New role and management shell added.
 - **Real Email OTP**: Integrated Resend API for branded authentication emails.
 - **RBAC Service**: Modular permission system for all roles.
 - **Marketing Pages**: 7 production-ready public routes (Analytics, Case Studies, Help Center).
 
 ### v4.0.0 — Real-Time Chat & Collaboration
 - **Socket.io Integration**: Live chat and task updates for active collaborations.
 - **Task Management**: Brands can assign and track deliverables in real-time.
 - **Notification UI**: Popup alerts with sound for platform-wide events.
 
 ### v3.0.0 — AI Matching Engine
 - **Scoring Algorithm**: Weighted niche, engagement, and budget matching.
 - **Match Results UI**: Ranked influencer lists for brand campaigns.
 
 ### v2.0.0 — Core SaaS Foundation
 - **Monorepo**: npm workspaces setup (core, database, shared).
 - **Prisma Core**: Schema design for 9 core models.
 - **Brand/Influencer Profiles**: Initial dashboard and profile configuration.
 
 ### v1.0.0 — Project Genesis
 - **Initial Commit**: Base Next.js 15 and Node.js folder structure.
 
 ---
 
 ## 🔄 Recent Development History (Last ~10 Sessions)

| Session                       | Change                                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Real-time Alerts              | Added popup notifications with sound + unread badge on chat for all new events                             |
| API 500 Fixes                 | Resolved all 500 errors on collaboration endpoints; fixed Next.js 15 dynamic route params (`await params`) |
| Socket Real-time Chat         | Implemented Socket.io collaboration rooms, `send_message`, `task_update` events                            |
| Message & CampaignTask Models | Added `Message` and `CampaignTask` to Prisma schema; migrated DB                                           |
| Middleware → Proxy Rename     | Renamed `middleware.js` → `proxy.js` per Next.js deprecation warning                                       |
| Code Sync                     | Merged and pushed local changes; resolved git merge conflicts                                              |
| API Docs                      | Restructured `api.md` with full route documentation                                                        |
| ESM Import Fix                | Added `.js` extensions to all backend imports for ESM compatibility                                        |
| Cloudinary Sync               | Synced Cloudinary URLs between `User.profilePic` and `BrandProfile.logo`                                   |
| Role-Based Redirect           | Fixed post-login redirect to correct dashboard (`/brand` or `/influencer`)                                 |

---

## 🧩 Key Design Decisions & Conventions

1. **Monorepo with workspaces** — All packages share types and utilities without duplication.
2. **Service layer mandatory** — No raw Prisma in API routes. Always go through `@repo/core` services.
3. **Soft deletes** — `User.deletedAt` and `Campaign.isDeleted` / `Campaign.deletedAt` for safe deletion without data loss.
4. **Activity as unified notifications** — All platform events (campaign, match, request, task) are logged to the `Activity` model. This is the single source for the notification center.
5. **Socket.io separate process** — Socket server runs independently from Next.js to allow real-time features without Next.js serverless limitations.
6. **HTTP-only JWT cookies** — Prevents XSS token theft; Edge-compatible decoding uses `atob` in `proxy.js`.
7. **Platforms as JSON** — `InfluencerProfile.platforms` is a JSON array of `{ name, handle, followers, engagementRate }` objects to support multiple social accounts flexibly.
8. **Unique collaboration constraint** — `CollaborationRequest` has a unique index on `(senderId, receiverId, campaignId)` to prevent duplicate requests.

---

## 📊 Codebase Metrics

| Metric                     | Count                                                              |
| -------------------------- | ------------------------------------------------------------------ |
| Workspace packages         | 7                                                                  |
| Prisma models              | 12                                                                 |
| Repository modules         | 5                                                                  |
| Backend service files      | 7+                                                                 |
| API route groups           | 6 (auth, brand, influencer, campaigns, influencers, notifications) |
| Total API endpoints        | ~25+                                                               |
| Brand dashboard pages      | 9                                                                  |
| Influencer dashboard pages | 8                                                                  |
| Marketing pages            | 7                                                                  |
| Zustand stores             | 3                                                                  |
| Socket.io events           | 7                                                                  |

---

## 🤖 Instructions for AI Agents

If you are an AI agent or LLM being given this file to understand the project:

1. **Architecture first**: This is a layered monorepo. API routes are thin; all business logic lives in `@repo/core` services. Do not write raw Prisma queries in API routes.
2. **Check the schema**: The full Prisma schema is at `backend/database/prisma/schema.prisma`. Refer to it before adding any new fields or relations.
3. **Socket for real-time**: Any real-time feature (chat, live updates, notifications) should go through the Socket.io server at `backend/core/src/socket/socket-handler.js`.
4. **Activity = Notifications**: All notification data comes from the `Activity` model. When adding a new event that should notify the user, create an `Activity` record via `ActivityService`.
5. **Next.js 15 dynamic routes**: Route params in `app/api/.../[id]/route.js` must be awaited: `const { id } = await params;` — not `params.id` directly.
6. **Tailwind v4 + glassmorphism**: UI components use Tailwind v4 utility classes and the glassmorphism design language. Match the existing aesthetic.
7. **ESM imports**: All backend files use ES Module syntax (`import`/`export`). Always include `.js` file extensions in import paths within the backend.
8. **Preferred workflow**: `read existing service → extend or add a method → call from API route → log to Activity if needed`.
