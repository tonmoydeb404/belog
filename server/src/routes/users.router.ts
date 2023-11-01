import { Router } from "express";
import * as usersController from "../controllers/users.controller";
import validate from "../middlewares/validate.middleware";
import { checkId } from "../validators/common.validator";

const usersRouter = Router();

usersRouter.route("/").get(usersController.getUsers);
usersRouter
  .route("/:id")
  .get(checkId(), validate, usersController.getUser)
  .delete(checkId(), validate, usersController.deleteUser);

export default usersRouter;
