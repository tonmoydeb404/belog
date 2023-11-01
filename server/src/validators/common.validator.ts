import { checkSchema, ParamSchema } from "express-validator";
import * as userServices from "../services/user.service";

// check URL param id is a valid mongoDB id or not
export const checkId = (key: string = "id") =>
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

// check URL param slug is a valid slug or not
export const checkSlug = (key: string = "slug") =>
  checkSchema(
    {
      [key]: {
        isSlug: {
          errorMessage: `"${key}" is not a valid.`,
        },
      },
    },
    ["params"]
  );

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
