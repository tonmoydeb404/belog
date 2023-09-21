import { validationResult } from "express-validator";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import { ApiError } from "../types/api.type";

const validate = asyncWrapper(async (req, res, next) => {
  const result = validationResult(req);

  // handle errors
  if (!result.isEmpty()) {
    // format error response
    const r = result.formatWith(
      (err): ApiError => ({
        message: err.msg,
        key: err.type === "field" ? err.path : "unknown",
      })
    );

    // send error response
    return res.status(400).json(
      apiResponse({
        status: "ERROR",
        message: "Invalid request",
        statusCode: 400,
        errors: r.array(),
      })
    );
  }

  return next();
});

export default validate;
