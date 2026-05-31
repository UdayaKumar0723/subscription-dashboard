import { Router } from "express";
import { subscriptionController } from "../controllers/subscription.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { subscribeSchema } from "../validations/subscription.validation";

const router = Router();

router.post(
  "/subscribe/:planId",
  authenticate,
  authorize("user", "admin"),
  validate(subscribeSchema),
  asyncHandler(subscriptionController.subscribe)
);

router.get(
  "/my-subscription",
  authenticate,
  authorize("user", "admin"),
  asyncHandler(subscriptionController.getMySubscription)
);

router.get(
  "/admin/subscriptions",
  authenticate,
  authorize("admin"),
  asyncHandler(subscriptionController.getAllSubscriptions)
);

export default router;
