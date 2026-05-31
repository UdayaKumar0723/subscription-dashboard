# Subscription Management Dashboard

Mini SaaS admin dashboard assessment project.

## Project Structure

```txt
subscription-dashboard/
+-- client/   # Frontend app
`-- server/   # Backend API
```

The backend is complete in `server/`. The frontend will be added in `client/`.

## Backend

```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Deploy Backend On Render

Use the `render.yaml` blueprint from the repository root, or create a Web Service manually with:

```txt
Root Directory: server
Build Command: npm install && npm run build
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
