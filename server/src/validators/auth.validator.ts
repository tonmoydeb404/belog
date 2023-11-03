import { ParamSchema, checkSchema } from "express-validator";

const OauthSchema: Record<string, ParamSchema> = {
  redirect: {
    notEmpty: {
      errorMessage: "In query redirect url is required",
    },
  },
};
export const getOauth = checkSchema(OauthSchema, ["query"]);
