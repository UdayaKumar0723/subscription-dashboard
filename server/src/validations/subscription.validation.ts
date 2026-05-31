import { z } from "zod";

export const subscribeSchema = z.object({
  params: z.object({
    planId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid plan id")
  })
});
