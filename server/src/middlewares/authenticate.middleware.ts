import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import asyncWrapper from "../helpers/asyncWrapper";
import { getAuthPayload } from "../helpers/authPayload";
import { getAuthToken } from "../helpers/authToken";
import * as userService from "../services/user.service";
import { AuthPayload } from "../types/auth.type";
import { getTokenValue, verifyToken } from "../utils/token";

const authenticate = asyncWrapper(async (req, res, next) => {
  try {
    // make sure you got the token from request
    const token = getAuthToken(req);
    if (!token) throw new Error("Auth token not found");

    // make sure payload is valid
    let payload = getTokenValue(token) as AuthPayload | null;
    if (!payload?._id || !isValidObjectId(payload?._id))
      throw new Error("Invalid payload");

    // make sure payload user is valid
    const user = await userService
      .getOne("_id", payload._id)
      .select("+password");
    if (!user) throw new Error("User account not found");

    // verify the token
    payload = verifyToken(token, user.password) as AuthPayload | null;
    if (!payload) throw new Error("Token is invalid");

    // refresh payload
    payload = getAuthPayload(user);

    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    next(createHttpError(401, "Authenticaion failed"));
  }
});

export default authenticate;
