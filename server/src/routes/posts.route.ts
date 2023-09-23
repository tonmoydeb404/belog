import { Router } from "express";
import * as postsController from "../controllers/posts.controller";
import authenticate from "../middlewares/authenticate.middleware";
import validate from "../middlewares/validate.middleware";
import { checkId, checkSlug } from "../validators/common.validator";
import * as postsValidator from "../validators/posts.validator";

const postsRouter = Router();

postsRouter
  .route("/")
  .get(postsController.getPosts)
  .post(
    authenticate,
    postsValidator.postPost,
    validate,
    postsController.postPost
  );
postsRouter
  .route("/:id")
  .get(authenticate, checkId(), validate, postsController.getPost)
  .patch(
    authenticate,
    checkId(),
    postsValidator.patchPost,
    validate,
    postsController.patchPost
  )
  .delete(authenticate, checkId(), validate, postsController.deletePost);
postsRouter.route("/s/:slug").get(checkSlug(), postsController.getPostBySlug);

export default postsRouter;
