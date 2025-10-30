import { Router } from "express";
import { createAccount, updateAccount, getStats } from "../controllers";
import { validate } from "../middlewares/validate";
import { createAccountSchema, updateAccountSchema } from "../schemas/accountSchema";

const router = Router();

router.post("/", validate(createAccountSchema), createAccount);

router.patch("/:id", validate(updateAccountSchema), updateAccount);

router.get("/stats", getStats);

export default router;
