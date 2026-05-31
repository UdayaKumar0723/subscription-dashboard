# Subscription Dashboard Client

React + Vite frontend for the Subscription Management Dashboard assessment.

## Setup

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Environment

```txt
VITE_API_BASE_URL=http://localhost:5000
```

For Vercel, set `VITE_API_BASE_URL` to the Render backend URL.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run lint` - run ESLint
- `npm run preview` - preview production build locally

## Pages

- `/login`
- `/register`
- `/plans`
- `/dashboard`
- `/admin/subscriptions`
