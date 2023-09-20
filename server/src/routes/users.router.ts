import { Router } from "express";
import * as usersController from "../controllers/users.controller";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(usersController.getUsers)
  .post(usersController.postUser);
usersRouter
  .route("/:id")
  .get(usersController.getUser)
  .patch(usersController.patchUser)
  .delete(usersController.deleteUser);

export default usersRouter;
