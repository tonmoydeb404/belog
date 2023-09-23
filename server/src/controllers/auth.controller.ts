import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import { authCookie, authCookieHTTP } from "../config/cookie-options";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import * as authService from "../services/auth.service";
import { EmailLogin, UsernameLogin } from "../types/auth.type";

export const postLogin = asyncWrapper(async (req, res) => {
  const { email, username, password } = matchedData(req) as EmailLogin &
    UsernameLogin;

  const response = await authService.login({ email, username, password });
  if (!response) throw createHttpError(401, "Authentication failed!");

  // add credantials in cookies
  res.cookie("token", response.token, authCookieHTTP);
  res.cookie("logged_in", true, authCookie);

  res.status(200).json(
    apiResponse({
      message: "Authenticated successfully",
      statusCode: 200,
      results: { payload: response.payload, token: response.token },
    })
  );
});
