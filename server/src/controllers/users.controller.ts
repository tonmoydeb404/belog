import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import * as userService from "../services/user.service";
import { UserCreate, UserUpdate } from "../types/user.type";

export const getUsers = asyncWrapper(async (_req, res) => {
  const users = await userService.getAll();
  res.json(apiResponse({ results: users, length: users.length }));
});

export const getUser = asyncWrapper(async (req, res) => {
  const user = await userService.getOne("_id", req.params.id);
  if (!user) throw createHttpError(404, "User account not found.");

  res.json(apiResponse({ results: user.toObject() }));
});

export const postUser = asyncWrapper(async (req, res) => {
  const { firstName, lastName, username, email, password } = matchedData(
    req
  ) as UserCreate;

  const user = await userService.create({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  res.status(201).json(
    apiResponse({
      results: user.toObject(),
      status: "SUCCESS",
      statusCode: 201,
      message: "User account created successfully",
    })
  );
});

export const patchUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, email, password } = matchedData(
    req
  ) as UserUpdate;

  const user = await userService.getOne("_id", id);
  if (!user) throw createHttpError(404, "User account not found.");

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;

  // execute update
  await user.save();

  res.json(
    apiResponse({
      results: user.toObject(),
      status: "SUCCESS",
      message: "User account updated successfully",
    })
  );
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
