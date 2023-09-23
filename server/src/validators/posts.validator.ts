import { ParamSchema, checkSchema } from "express-validator";
import { validateImage } from "image-validator";
import { isValidObjectId } from "mongoose";
import { postStatuses } from "../models/Post.model";
import * as categoryService from "../services/category.service";
import * as postService from "../services/post.service";
import { PostCreate, PostUpdate } from "../types/post.type";

// slug validate schema
export const slugSchema: ParamSchema = {
  isSlug: {
    errorMessage: "Invalid slug",
  },
  custom: {
    options: async (value) => {
      const post = await postService.getOne("slug", value);
      if (post) throw new Error("Slug already in use");
    },
  },
};

// Category create data schema
const postPostSchema: Record<keyof PostCreate | "categories.*", ParamSchema> = {
  title: {
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
    },
    isString: {
      errorMessage: "Title must be a valid string",
    },
    isLength: {
      options: { max: 200 },
      errorMessage: "Maximum 200 characters are allowed in Title",
    },
  },
  slug: {
    ...slugSchema,
    optional: true,
  },
  author: {
    isMongoId: true,
    errorMessage: "invalid author",
  },
  categories: {
    optional: true,
    isArray: {
      errorMessage: "Invalid categories.",
    },
  },
  "categories.*": {
    errorMessage: "Invalid category id.",
    custom: {
      options: async (value) => {
        if (!isValidObjectId(value)) throw new Error("Invalid category id.");
        const category = await categoryService.getOne("_id", value);
        if (!category) throw new Error("Category does not exist.");
      },
    },
  },
  content: {
    errorMessage: "Invalid content",
    isString: true,
  },
  meta: {
    optional: true,
  },
  status: {
    optional: true,
    isIn: {
      options: postStatuses,
      errorMessage: "Invalid status.",
    },
  },
  thumbnail: {
    errorMessage: "Invalid Thumbnail",
    isURL: true,
    optional: true,
    custom: {
      options: async (value) => {
        const valid = await validateImage(value);
        if (!valid) throw new Error("Thumbnail url is not valid");
      },
    },
  },
};
export const postPost = checkSchema(postPostSchema, ["body"]);

// Category update data schema
const patchPostSchema: Record<keyof PostUpdate | "categories.*", ParamSchema> =
  {
    title: {
      ...postPostSchema.title,
      optional: true,
    },
    slug: {
      ...slugSchema,
      optional: true,
    },
    categories: {
      isArray: {
        errorMessage: "Invalid categories.",
      },
      optional: true,
    },
    "categories.*": {
      errorMessage: "Invalid category id.",
      custom: {
        options: async (value) => {
          if (!isValidObjectId(value)) throw new Error("Invalid category id.");
          const category = await categoryService.getOne("_id", value);
          if (!category) throw new Error("Category does not exist.");
        },
      },
    },
    content: {
      errorMessage: "Invalid content",
      isString: true,
      optional: true,
    },
    meta: {
      optional: true,
    },
    status: {
      optional: true,
      isIn: {
        options: postStatuses,
        errorMessage: "Invalid status.",
      },
    },
    thumbnail: postPostSchema.thumbnail,
  };
export const patchPost = checkSchema(patchPostSchema, ["body"]);
