import User from "../models/User.model";
import { IUser, UserCreate, UserUpdate } from "../types/user.type";

// get all users
export const getAll = () => {
  return User.find();
};

// get one user by property filter
export const getOne = (key: keyof IUser, value: any) => {
  if (key === "_id") {
    return User.findById(value);
  }

  return User.findOne({ [key]: value });
};

// create user account
export const create = (data: UserCreate) => {
  return new User(data).save();
};

// update user account by id
export const updateById = (id: string, data: UserUpdate) => {
  return User.findByIdAndUpdate(id, data);
};

// delete user account by id
export const deleteById = (id: string) => {
  return User.findByIdAndDelete(id);
};
