import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import authenticate from "../middlewares/authenticate.middleware";
import validate from "../middlewares/validate.middleware";
import * as authValidator from "../validators/auth.validator";

const authRouter = Router();

authRouter.post(
  "/login",
  authValidator.postLogin,
  validate,
  authController.postLogin
);
authRouter.get("/logout", authController.getLogout);
authRouter.get("/refresh", authenticate, authController.getRefresh);

export default authRouter;
