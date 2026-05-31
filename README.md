# Subscription Management Dashboard

Mini SaaS admin dashboard assessment project.

## Candidate

Name: Udaya Kumar

Email: udayakumar0723@gmail.com

## Project Structure

```txt
subscription-dashboard/
+-- client/   # Frontend app
`-- server/   # Backend API
```

The backend is in `server/`. The frontend is in `client/`.

## Backend

```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Set the frontend API URL in `client/.env`:

```txt
VITE_API_BASE_URL=http://localhost:5000
```

For production on Vercel, set `VITE_API_BASE_URL` to the Render API URL.

## Deploy Backend On Render

Use the `render.yaml` blueprint from the repository root, or create a Web Service manually with:

```txt
Root Directory: server
Build Command: npm install --include=dev && npm run build
Start Command: npm start
Health Check Path: /health
```

Required environment variables:

```txt
NODE_ENV=production
MONGO_URI=<your MongoDB Atlas connection string>
CLIENT_URL=<your deployed frontend URL, or http://localhost:5173 during testing>
JWT_ACCESS_SECRET=<strong random secret>
JWT_REFRESH_SECRET=<strong random secret>
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

## Deploy Frontend On Vercel

Create a Vercel project from the same GitHub repository with:

```txt
Root Directory: client
Build Command: npm run build
Output Directory: dist
```

Required environment variable:

```txt
VITE_API_BASE_URL=<your Render backend URL>
```

After Vercel gives you the frontend URL, update Render's `CLIENT_URL` environment variable to that Vercel URL and redeploy the backend.
