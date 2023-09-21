import Category from "../models/Category.model";
import {
  CategoryCreate,
  CategoryUpdate,
  ICategory,
} from "../types/category.type";

// get all categories
export const getAll = () => {
  return Category.find();
};

// get one category by property filter
export const getOne = (key: keyof ICategory, value: any) => {
  if (key === "_id") {
    return Category.findById(value);
  }

  return Category.findOne({ [key]: value });
};

// create category account
export const create = (data: CategoryCreate) => {
  return new Category(data).save();
};

// update category account by id
export const updateById = (id: string, data: CategoryUpdate) => {
  return Category.findByIdAndUpdate(id, data);
};

// delete category account by id
export const deleteById = (id: string) => {
  return Category.findByIdAndDelete(id);
};
