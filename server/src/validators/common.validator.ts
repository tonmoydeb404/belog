import { checkSchema, ParamSchema } from "express-validator";
import * as userServices from "../services/user.service";

// check URL param id is a valid mongoDB id or not
export const checkParam = (key: string = "id") =>
  checkSchema(
    {
      [key]: {
        isMongoId: {
          errorMessage: `"${key}" is not a valid id.`,
        },
      },
    },
    ["params"]
  );

// validate usernameSchema
export const usernameSchema: ParamSchema = {
  isLength: {
    options: { min: 3, max: 50 },
    errorMessage:
      "Username should be at least minimum 3 chars & maximum 50 chars",
  },
  custom: {
    options: async (value) => {
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        throw new Error(
          "Username can only contain letters, numbers, and underscores."
        );
      }

      const user = await userServices.getOne("username", value);
      if (user) throw new Error("Username already in use");
    },
  },
  trim: true,
  toLowerCase: true,
};
// validate password schema
export const passwordSchema: ParamSchema = {
  isStrongPassword: {
    options: {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
    },
    errorMessage:
      "Password must be at least 8 characters long with 1 lowercase, 1 uppercase, and 1 number",
  },
};
// validate email schema
export const emailSchema: ParamSchema = {
  isEmail: {
    errorMessage: "Invalid email",
  },
  custom: {
    options: async (value) => {
      const user = await userServices.getOne("email", value);
      if (user) throw new Error("Email already in use");
    },
  },
};
