# CompuPay Deployment Guide

This guide explains how to deploy the **Client** and **Server** separately for production.

---

## 1. Hosting Strategy

### **Client (Frontend)**

- **Recommended Host:** [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
- **Why:** Optimized for Next.js, Edge Network, automatic scaling.
- **Deployment:**
  - Connect your GitHub repository.
  - Set Root Directory to `client`.
  - Build Command: `next build` (default).
  - Output Directory: `.next` (default).

### **Server (Backend)**

- **Recommended Host:** [Render](https://render.com), [Railway](https://railway.app), [Fly.io](https://fly.io), or [AWS Fargate](https://aws.amazon.com/fargate/).
- **Why:** Persistent processes required for Workers/Queues.
- **Deployment:**
  - Connect GitHub repository.
  - Set Root Directory to `server`.
  - Use the `Dockerfile` for build.

---

## 2. Serverless vs. Containers for Backend

**Is Serverless (AWS Lambda, Vercel Functions) suitable for the Server?**

**NO.**

### Reasons:

1.  **Background Workers:** The architecture relies on `BullMQ` (Redis) workers to process heavy payroll calculations and AI tasks asynchronously. Serverless functions are ephemeral (they spin down after execution) and cannot reliably host long-running worker processes.
2.  **Connection Limits:** Database (Postgres) and Redis connection pooling is difficult to manage in serverless without proxies (like PgBouncer), often leading to "too many connections" errors.
3.  **Startup Latency:** "Cold starts" can slow down the API, whereas a container is always running (or has simpler auto-scaling parameters).

**Verdict:** Use a **Containerized Service** (Docker) for the Backend to support the Worker Architecture.

---

## 3. Deployment Steps (Separate)

### Deploying Client (e.g., Vercel)

1.  Push repo to GitHub.
2.  Import project in Vercel.
3.  **Important:** Configure `Root Directory` to `client`.
4.  Add Environment Variables:
    - `NEXT_PUBLIC_API_URL`: The full URL of your active backend (e.g., `https://api.myapp.com`).

### Deploying Server (e.g., Railway/Rent)

1.  Push repo to GitHub.
2.  Create a project based on the repo.
3.  **Important:** Configure `Root Directory` to `server` or specify `server/Dockerfile`.
4.  Add Environment Variables (See `server/.env.example`):
    - `DATABASE_URL`: Connection string to your production Postgres.
    - `REDIS_URL`: Connection string to your production Redis (ensure it is accessible).
    - `JWT_SECRET`: A strong, random string for security.
    - `NODE_ENV`: Set to `production`.

## 4. Troubleshooting

### `"/prisma": not found` or `COPY failed`

- **Cause:** The **Root Directory** setting in your hosting provider (Railway/Vercel) is incorrect. The Dockerfile expects to run from inside the `server` folder, but it's running from the repo root.
- **Fix:** Go to Railway project settings -> **General** -> **Root Directory** and set it to `server`.

---
