# Subscription Dashboard Backend

TypeScript, Express, MongoDB, Mongoose, JWT access tokens, refresh-token cookies, Zod validation, and role-based authorization.

## Setup

```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - compile TypeScript
- `npm start` - run compiled server
- `npm run seed` - seed plans and default admin

## Render Deployment

When deploying manually on Render, use:

```txt
Root Directory: server
Build Command: npm install && npm run build
Start Command: npm start
Health Check Path: /health
```

Add the environment variables from `.env.example` in the Render dashboard. Set `NODE_ENV=production`.

## Default Admin

- Email: `admin@test.com`
- Password: `Admin@123`

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/plans`
- `POST /api/subscribe/:planId`
- `GET /api/my-subscription`
- `GET /api/admin/subscriptions`
