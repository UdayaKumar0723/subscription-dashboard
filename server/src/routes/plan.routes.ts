import { Router } from "express";
import { planController } from "../controllers/plan.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(planController.getPlans));

export default router;
