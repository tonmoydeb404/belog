import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import apiResponse from "../helpers/apiResponse";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(createHttpError(404, "Requested content not found"));
};

export const defaultError = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorStatus = error?.status || 500;
  const errorMessage = error?.status
    ? error.message
    : "something wents to wrong";

  const errorResponse = apiResponse({
    status: "ERROR",
    statusCode: errorStatus,
    errors: [],
    message: errorMessage,
  });

  console.log(error?.message);

  return res.status(errorStatus).json(errorResponse);
};
