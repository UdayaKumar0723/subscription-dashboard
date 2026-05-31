import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import planRoutes from "./routes/plan.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api", subscriptionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
