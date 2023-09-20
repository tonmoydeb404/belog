import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
import usersRouter from "../routes/users.router";

const router = Router();

router.use("/api/v1/users", usersRouter);
// health route
router.all("/api/v1/health", getHealth);

export default router;
