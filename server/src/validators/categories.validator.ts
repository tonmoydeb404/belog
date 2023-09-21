import { ParamSchema, checkSchema } from "express-validator";
import * as categoryService from "../services/category.service";
import { CategoryCreate, CategoryUpdate } from "../types/category.type";

// slug validate schema
export const slugSchema: ParamSchema = {
  isSlug: {
    errorMessage: "Invalid slug",
  },
  custom: {
    options: async (value) => {
      const category = await categoryService.getOne("slug", value);
      if (category) throw new Error("Slug already in use");
    },
  },
};

// Category create data schema
const postCategorySchema: Record<keyof CategoryCreate, ParamSchema> = {
  title: {
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
    },
    isString: {
      errorMessage: "Title must be a valid string",
    },
    isLength: {
      options: { max: 100 },
      errorMessage: "Maximum 100 characters are allowed in Title",
    },
  },
  description: {
    trim: true,
    optional: true,
    isString: {
      errorMessage: "Description must be a valid string",
    },
    isLength: {
      options: { max: 300 },
      errorMessage: "Maximum 300 characters are allowed in Description",
    },
  },
  slug: {
    ...slugSchema,
    optional: true,
  },
};
export const postCategory = checkSchema(postCategorySchema, ["body"]);

// Category update data schema
const patchCategorySchema: Record<keyof CategoryUpdate, ParamSchema> = {
  title: {
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
    },
    isString: {
      errorMessage: "Title must be a valid string",
    },
    isLength: {
      options: { max: 100 },
      errorMessage: "Maximum 100 characters are allowed in Title",
    },
    optional: true,
  },
  description: {
    trim: true,
    optional: true,
    isString: {
      errorMessage: "Description must be a valid string",
    },
    isLength: {
      options: { max: 300 },
      errorMessage: "Maximum 300 characters are allowed in Description",
    },
  },
  slug: {
    ...slugSchema,
    optional: true,
  },
};
export const patchCategory = checkSchema(patchCategorySchema, ["body"]);
