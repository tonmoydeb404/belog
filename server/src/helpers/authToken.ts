import { Request } from "express";

export const getAuthToken = (req: Request): null | string => {
  const { authorization } = req.headers;
  const { token } = req.cookies;

  if (token) return token;
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.split(" ")[1];
  }
  return null;
};
