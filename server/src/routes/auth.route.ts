import { Router } from "express";
import passport from "passport";
import * as authController from "../controllers/auth.controller";
import authenticate from "../middlewares/authenticate.middleware";

const authRouter = Router();

authRouter.get("/logout", authController.getLogout);
authRouter.get("/refresh", authenticate, authController.getRefresh);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureMessage: true }),
  authController.getCallback
);

export default authRouter;
