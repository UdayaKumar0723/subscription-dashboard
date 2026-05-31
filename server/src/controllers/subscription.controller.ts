import { Request, Response } from "express";
import { subscriptionService } from "../services/subscription.service";
import { sendSuccess } from "../utils/apiResponse";

export const subscriptionController = {
  async subscribe(req: Request, res: Response) {
    const subscription = await subscriptionService.subscribe(req.user!.userId, String(req.params.planId));
    sendSuccess(res, 201, "Subscription activated successfully", { subscription });
  },

  async getMySubscription(req: Request, res: Response) {
    const subscription = await subscriptionService.getMySubscription(req.user!.userId);
    sendSuccess(res, 200, "Subscription fetched successfully", { subscription });
  },

  async getAllSubscriptions(_req: Request, res: Response) {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    sendSuccess(res, 200, "Subscriptions fetched successfully", { subscriptions });
  }
};
