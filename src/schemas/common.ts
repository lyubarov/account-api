import { z } from "zod";

export const common = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});