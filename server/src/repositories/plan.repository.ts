import { Plan } from "../models/Plan";

export const planRepository = {
  findAll() {
    return Plan.find().sort({ price: 1 });
  },

  findById(id: string) {
    return Plan.findById(id);
  },

  upsertByName(plan: { name: string; price: number; duration: number; features: string[] }) {
    return Plan.findOneAndUpdate({ name: plan.name }, plan, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
  }
};
