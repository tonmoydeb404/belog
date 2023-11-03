import createHttpError from "http-errors";
import asyncWrapper from "../helpers/asyncWrapper";

const authenticate = asyncWrapper(async (req, _res, next) => {
  if (!req.isAuthenticated() || !req.user)
    throw createHttpError(401, "User is not authenticated");

  next();
});

export default authenticate;
