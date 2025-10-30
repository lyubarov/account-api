import { Router } from "express";
import accountsRouter from "./accountsRouter.ts";

const router = Router();

router.use("/accounts", accountsRouter);

export default router;
