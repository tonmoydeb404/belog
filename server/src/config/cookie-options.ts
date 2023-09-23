import { CookieOptions } from "express";
import loadEnv from "../helpers/loadEnv";
import { authExpire } from "./token-expire";

// auth cookies options
export const authCookie: CookieOptions = {
  httpOnly: false,
  sameSite: loadEnv.NODE_ENV === "production" ? "none" : "lax",
  secure: loadEnv.NODE_ENV === "production",
  maxAge: authExpire,
};
export const authCookieHTTP: CookieOptions = {
  httpOnly: true,
  sameSite: loadEnv.NODE_ENV === "production" ? "none" : "lax",
  secure: loadEnv.NODE_ENV === "production",
  maxAge: authExpire,
};
