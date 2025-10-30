import { refine } from "zod";

export const ZOD_MESSAGES = {
  NAME: {
    MIN: "Name must be at least 3 characters long",
    MAX: "Name must be at most 15 characters long",
  },
  REFINE: {
    UPDATE_ACCOUNT: "At least one of the fields: 'name' or 'scope' must be provided",
  },
};
