import { Request, Response } from "express";
import { planService } from "../services/plan.service";
import { sendSuccess } from "../utils/apiResponse";

export const planController = {
  async getPlans(_req: Request, res: Response) {
    const plans = await planService.getPlans();
    sendSuccess(res, 200, "Plans fetched successfully", { plans });
  }
};
