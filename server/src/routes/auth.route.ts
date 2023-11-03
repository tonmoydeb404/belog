import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import authenticate from "../middlewares/authenticate.middleware";

const authRouter = Router();

authRouter.get("/logout", authenticate, authController.getLogout);
authRouter.get("/refresh", authenticate, authController.getRefresh);

authRouter.get("/result", authController.getResult);

// google
authRouter.get(
  "/google",
  authController.getOauth("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  authController.getOauthCallback("google", {})
);

// github
authRouter.get(
  "/github",
  authController.getOauth("github", { scope: ["profile", "email"] })
);
authRouter.get(
  "/github/callback",
  authController.getOauthCallback("github", {})
);

export default authRouter;
