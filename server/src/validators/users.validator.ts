import { checkSchema, ParamSchema } from "express-validator";
import { UserCreate, UserUpdate } from "../types/user.type";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "./common.validator";

// User create data schema
const postUserSchema: Record<keyof UserCreate, ParamSchema> = {
  email: {
    ...emailSchema,
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
  firstName: {
    trim: true,
    notEmpty: {
      errorMessage: "First name is required",
    },
  },
  lastName: {
    trim: true,
    optional: true,
  },
  password: {
    ...passwordSchema,
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
  username: {
    ...usernameSchema,
  },
};
export const postUser = checkSchema(postUserSchema, ["body"]);

// User update data schema
const patchUserSchema: Record<keyof UserUpdate, ParamSchema> = {
  email: {
    ...emailSchema,
    optional: true,
  },
  firstName: {
    trim: true,
    optional: true,
  },
  lastName: {
    trim: true,
    optional: true,
  },
  password: {
    ...passwordSchema,
    optional: true,
  },
  username: {
    ...usernameSchema,
    optional: true,
  },
};
export const patchUser = checkSchema(patchUserSchema, ["body"]);
