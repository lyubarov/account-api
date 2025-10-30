import { z } from "zod";
import { common } from "./common";
import { ZOD_MESSAGES } from "../const/zodMessages";

export const accountSchema = common.extend({
  name: z.string()
    .min(3, { error: ZOD_MESSAGES.NAME.MIN })
    .max(15, { error: ZOD_MESSAGES.NAME.MAX }),
  scope: z.enum(["account", "prospect", "child"]),
})
.strict();

export const createAccountSchema = z
  .object({
    name: z.string()
      .min(3, { error: ZOD_MESSAGES.NAME.MIN })
      .max(15, { error: ZOD_MESSAGES.NAME.MAX }),
    scope: z.enum(["account", "prospect", "child"])
  })
  .strict();

export const updateAccountSchema = z
  .object({
    name: z.string()
      .min(3, { error: ZOD_MESSAGES.NAME.MIN })
      .max(15, { error: ZOD_MESSAGES.NAME.MAX })
      .optional(),
    scope: z.enum(["account", "prospect", "child"]).optional()
  })
  .refine(data => data.name || data.scope, {
    message: ZOD_MESSAGES.REFINE.UPDATE_ACCOUNT,
  })
  .strict();


export type Account = z.infer<typeof accountSchema>;
export type CreateAccountPayload = z.infer<typeof createAccountSchema>;
export type UpdateAccountPayload = z.infer<typeof updateAccountSchema>;