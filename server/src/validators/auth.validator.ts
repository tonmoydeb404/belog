import { ParamSchema, checkSchema, oneOf } from "express-validator";
import { EmailLogin, UsernameLogin } from "../types/auth.type";

const usernameLoginSchema: Record<keyof UsernameLogin, ParamSchema> = {
  username: {
    notEmpty: {
      errorMessage: "Username is required.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
};
const emailLoginSchema: Record<keyof EmailLogin, ParamSchema> = {
  email: {
    isEmail: {
      errorMessage: "Email address is not valid",
    },
    notEmpty: {
      errorMessage: "Email is required.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
};
export const postLogin = oneOf(
  [checkSchema(usernameLoginSchema), checkSchema(emailLoginSchema)],
  { message: "Use email or username." }
);
