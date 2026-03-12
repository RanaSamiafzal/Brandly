# 📡 Brandly API Documentation

This document provides a comprehensive reference for all backend API endpoints available in the Brandly platform.

## 🔐 Authentication API
**Base Path:** `/api/auth`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Create a new user account with role selection (`BRAND` or `INFLUENCER`). |
| `POST` | `/login` | Authenticate user and set HTTP-only JWT cookie. |
| `POST` | `/logout` | Clear authentication cookie. |
| `GET` | `/me` | Retrieve current authenticated user data and profile. |
| `POST` | `/forgot-password` | Generate and dispatch an OTP via email for password reset. |
| `POST` | `/verify-otp` | Validate the provided OTP against the stored record. |
| `POST` | `/reset-password` | Set a new password using a valid OTP session. |

---

## 🏢 Brand API
**Base Path:** `/api/brand`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/profile` | Retrieve the active brand's profile data. |
| `PATCH` | `/profile` | Update brand profile (logo, industry, website, description). |
| `GET` | `/dashboard-stats` | Get high-level KPIs (active campaigns, pending requests). |
| `GET` | `/campaigns` | List all campaigns created by the brand. |
| `POST` | `/campaigns` | Create a new campaign (Draft/Active). |
| `GET` | `/campaigns/[id]` | Get detailed view of a specific campaign. |
| `GET` | `/campaigns/[id]/matches` | Trigger or retrieve AI influencer matches for a campaign. |
| `GET` | `/requests` | View all collaboration requests sent to influencers. |
| `POST` | `/requests` | Send a new collaboration request to an influencer. |
| `GET` | `/influencers` | Search and filter the global influencer directory. |
| `GET` | `/influencers/[id]` | View a detailed public profile of an influencer. |
| `GET` | `/ai-recommendations` | Get platform-wide AI recommendations for influencers. |

---

## 🤳 Influencer API
**Base Path:** `/api/influencer`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/profile` | Retrieve the active influencer's profile data. |
| `PATCH` | `/profile` | Update bio, categories, location, and social handles. |
| `GET` | `/dashboard-stats` | Get performance metrics and request invitations. |
| `GET` | `/requests` | List incoming collaboration requests from brands. |
| `PATCH` | `/requests` | Accept or reject a specific collaboration request. |
| `GET` | `/collaborations` | View all active and past collaborations. |
| `GET` | `/brands` | Browse and search available brand profiles. |

---

## 🤝 Collaboration & Tasks
**Base Path:** `/api/[role]/collaborations/[id]`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get full collaboration details (chat history, tasks). |
| `GET` | `/tasks` | List all deliverables and deadlines for the collaboration. |
| `POST` | `/tasks` | Create a new task (Brand only). |
| `PATCH` | `/tasks/[taskId]` | Update task status (Pending → In Progress → Done). |

---

## 🔔 Notifications & Activity
**Base Path:** `/api/notifications`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Retrieve paginated notification/activity log. |
| `PATCH` | `/read` | Mark a specific notification as read. |
| `PATCH` | `/read-all` | Mark all notifications for the user as read. |

---

## 🔌 Real-Time Events (Socket.io)
**Server:** `http://localhost:3001`

| Event | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `join_collab` | C → S | `{ requestId }` | Join a room for a specific collaboration chat. |
| `send_message` | C → S | `{ requestId, content }` | Send a chat message. |
| `receive_message`| S → C | `Message Object` | Broadcasted to all room participants. |
| `task_update` | C → S | `{ taskId, status }` | Broadcast task changes to the other party. |
