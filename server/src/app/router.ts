import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
import authenticate from "../middlewares/authenticate.middleware";
import authRouter from "../routes/auth.route";
import categoriesRouter from "../routes/categories.route";
import postsRouter from "../routes/posts.route";
import usersRouter from "../routes/users.router";

const router = Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", authenticate, usersRouter);
router.use("/api/v1/categories", categoriesRouter);
router.use("/api/v1/posts", postsRouter);
// health route
router.all("/api/v1/health", getHealth);

export default router;
