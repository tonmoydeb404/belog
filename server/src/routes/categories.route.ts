import { Router } from "express";
import * as categoriesController from "../controllers/categories.controller";
import validate from "../middlewares/validate.middleware";
import * as categoriesValidator from "../validators/categories.validator";
import { checkId, checkSlug } from "../validators/common.validator";

const categoriesRouter = Router();

categoriesRouter
  .route("/")
  .get(categoriesController.getCategories)
  .post(
    categoriesValidator.postCategory,
    validate,
    categoriesController.postCategory
  );
categoriesRouter
  .route("/:id")
  .get(checkId(), validate, categoriesController.getCategory)
  .patch(
    checkId(),
    categoriesValidator.patchCategory,
    validate,
    categoriesController.patchCategory
  )
  .delete(checkId(), validate, categoriesController.deleteCategory);
categoriesRouter
  .route("/s/:slug")
  .get(checkSlug(), categoriesController.getCategoryBySlug);

export default categoriesRouter;
