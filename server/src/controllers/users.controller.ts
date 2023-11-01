import createHttpError from "http-errors";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import * as userService from "../services/user.service";

export const getUsers = asyncWrapper(async (_req, res) => {
  const users = await userService.getAll();
  res.json(apiResponse({ results: users, length: users.length }));
});

export const getUser = asyncWrapper(async (req, res) => {
  const user = await userService.getOne("_id", req.params.id);
  if (!user) throw createHttpError(404, "User account not found.");

  res.json(apiResponse({ results: user.toObject() }));
});

export const deleteUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const user = await userService.getOne("_id", id);
  if (!user) throw createHttpError(404, "User account not found.");

  // execute delete
  await user.deleteOne();

  res.json(
    apiResponse({
      results: user.id,
      status: "SUCCESS",
      message: "User account deleted successfully",
    })
  );
});
