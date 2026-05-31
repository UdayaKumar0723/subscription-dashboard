import { Types } from "mongoose";
import { Subscription } from "../models/Subscription";

export const subscriptionRepository = {
  expireActiveForUser(userId: string | Types.ObjectId) {
    return Subscription.updateMany(
      { userId, status: "active" },
      { status: "expired", endDate: new Date() }
    );
  },

  create(input: {
    userId: string | Types.ObjectId;
    planId: string | Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: "active" | "expired" | "cancelled";
  }) {
    return Subscription.create(input);
  },

  findActiveByUser(userId: string | Types.ObjectId) {
    return Subscription.findOne({ userId, status: "active" })
      .populate("planId")
      .populate("userId", "name email role");
  },

  findAll() {
    return Subscription.find()
      .populate("userId", "name email role")
      .populate("planId")
      .sort({ createdAt: -1 });
  }
};
