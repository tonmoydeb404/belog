import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware";
import * as authValidator from "../validators/auth.validator";

const authRouter = Router();

authRouter.post(
  "/login",
  authValidator.postLogin,
  validate,
  authController.postLogin
);

export default authRouter;
