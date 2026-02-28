# Brandly Database Models Reference

These models represent the core entities for the Brandly platform, based on the provided Mongoose schemas. They serve as a reference for structuring the backend database and will be kept updated as the system evolves.

## 1. User Model

Core authentication and user identity model.

- **Fields**: `fullname`, `email`, `password`, `role` (brand/influencer/admin), `isVerified`, `isBlocked`, `refreshToken`, `profilePic`, `coverPic`, `googleId`, `isGoogleUser`, etc.
- **Methods**: `generateAccessToken`, `generateRefreshToken`, `generatePasswordResetOTP`, `isPasswordCorrect`.
- **Hooks**: Pre-save hook to hash string passwords using `bcrypt`.

## 2. Brand Model

Extended profile for users with the "brand" role.

- **Fields**: `user` (ref: User), `brandname`, `industry`, `budgetRange` (min, max), `website`, `address`, `description`, `logo`.

## 3. Influencer Model

Extended profile for users with the "influencer" role.

- **Fields**: `user` (ref: User), `about`, `username`, `category`, `portfolio`, `averageRating`, `location`, `isAvailable`.
- **Platforms**: Array of connected social platforms (Instagram, YouTube, etc.) with `followers`, `profileUrl`, `influenceRate` (1-10).
- **Services**: Nested inside platforms, defining what the influencer offers (Post, Reel, etc.) and their `price`.

## 4. Campaign Model

Created by brands to find influencers and manage collaborations.

- **Fields**: `brand` (ref: Brand), `title`, `description`, `budget` (min, max), `targetCategory`, `targetPlatform`, `campaignTimeline`.
- **Requirements**: `deliverables`, `targetAudience`, `additionalRequirements`.
- **Status**: `draft`, `active`, `closed`, `completed`.
- **Soft Delete**: `isDeleted`, `deletedAt`.

## 5. Collaboration Request Model

Represents the connection/proposal between a brand and an influencer for a specific campaign.

- **Fields**: `sender` (ref: User), `receiver` (ref: User), `campaignRelated` (ref: Campaign), `proposedBudget`, `note`.
- **Status**: `pending`, `accepted`, `rejected`, `cancelled`.
- **Constraints**: Unique compound index on `[sender, receiver, campaignRelated]` to prevent duplicate requests.

## 6. Activity Model

Audit log and notification source for user actions on the platform.

- **Fields**: `user` (ref: User), `role`, `type` (campaign_created, request_sent, etc.), `title`, `description`, `relatedId`, `isRead`.

---

> **Note on Implementation:** The project currently uses Prisma with a SQL database (`schema.prisma`), but these Mongoose schemas provide the exact data structure and relationships needed. We will adapt these structures (including the AI Matching engine additions) into our backend services/repositories.
