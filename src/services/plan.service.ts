import { planRepository } from "../repositories/plan.repository";

export const planService = {
  getPlans() {
    return planRepository.findAll();
  }
};
