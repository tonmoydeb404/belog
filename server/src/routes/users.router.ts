import { Router } from "express";
import * as usersController from "../controllers/users.controller";
import validate from "../middlewares/validate.middleware";
import { checkId } from "../validators/common.validator";
import * as usersValidators from "../validators/users.validator";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(usersController.getUsers)
  .post(usersValidators.postUser, validate, usersController.postUser);
usersRouter
  .route("/:id")
  .get(checkId(), validate, usersController.getUser)
  .patch(
    checkId(),
    usersValidators.patchUser,
    validate,
    usersController.patchUser
  )
  .delete(checkId(), validate, usersController.deleteUser);

export default usersRouter;
