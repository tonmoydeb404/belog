import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
import categoriesRouter from "../routes/categories.route";
import usersRouter from "../routes/users.router";

const router = Router();

router.use("/api/v1/users", usersRouter);
router.use("/api/v1/categories", categoriesRouter);
// health route
router.all("/api/v1/health", getHealth);

export default router;
