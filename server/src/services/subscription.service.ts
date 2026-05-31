import { planRepository } from "../repositories/plan.repository";
import { subscriptionRepository } from "../repositories/subscription.repository";
import { ApiError } from "../utils/apiError";

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subscriptionService = {
  async subscribe(userId: string, planId: string) {
    const plan = await planRepository.findById(planId);
    if (!plan) {
      throw new ApiError(404, "Plan not found");
    }

    await subscriptionRepository.expireActiveForUser(userId);

    const startDate = new Date();
    const endDate = addDays(startDate, plan.duration);

    const subscription = await subscriptionRepository.create({
      userId,
      planId,
      startDate,
      endDate,
      status: "active"
    });

    return subscription.populate("planId");
  },

  async getMySubscription(userId: string) {
    const subscription = await subscriptionRepository.findActiveByUser(userId);

    if (!subscription) {
      return null;
    }

    if (subscription.endDate < new Date()) {
      subscription.status = "expired";
      await subscription.save();
      return null;
    }

    return subscription;
  },

  getAllSubscriptions() {
    return subscriptionRepository.findAll();
  }
};
