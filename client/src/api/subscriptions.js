import { api } from "./client";

export const subscriptionApi = {
  getPlans() {
    return api.get("/api/plans");
  },

  subscribe(planId) {
    return api.post(`/api/subscribe/${planId}`);
  },

  getMySubscription() {
    return api.get("/api/my-subscription");
  },

  getAllSubscriptions() {
    return api.get("/api/admin/subscriptions");
  }
};
