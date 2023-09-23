import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import { authCookie, authCookieHTTP } from "../config/cookie-options";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import { EmailLogin, UsernameLogin } from "../types/auth.type";

export const postLogin = asyncWrapper(async (req, res) => {
  const { email, username, password } = matchedData(req) as EmailLogin &
    UsernameLogin;

  const response = await authService.login({ email, username, password });
  if (!response) throw createHttpError(401, "Invalid credentials!");

  // add credantials in cookies
  res.cookie("token", response.token, authCookieHTTP);
  res.cookie("logged_in", true, authCookie);

  res.status(200).json(
    apiResponse({
      message: "Loggedin successfully",
      statusCode: 200,
      results: { payload: response.payload, token: response.token },
    })
  );
});

export const getLogout = asyncWrapper(async (_req, res) => {
  // remove credantials from cookies
  res.clearCookie("token");
  res.cookie("logged_in", false, authCookie);

  res.status(200).json(
    apiResponse({
      message: "Logged out successfully",
      statusCode: 200,
      status: "SUCCESS",
      results: {},
    })
  );
});

export const getRefresh = asyncWrapper(async (req, res) => {
  const user = await userService.getOne("_id", req.user._id);

  const { token, payload } = user.generateAuthToken();

  // add credantials in cookies
  res.cookie("token", token, authCookieHTTP);
  res.cookie("logged_in", true, authCookie);

  res.status(200).json(
    apiResponse({
      message: "Auth token refreshed.",
      statusCode: 200,
      results: { payload, token },
    })
  );
});
