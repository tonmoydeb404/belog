import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import * as categoryService from "../services/category.service";
import { CategoryCreate, CategoryUpdate } from "../types/category.type";

export const getCategories = asyncWrapper(async (_req, res) => {
  const categories = await categoryService.getAll();
  res.json(apiResponse({ results: categories, length: categories.length }));
});

export const getCategory = asyncWrapper(async (req, res) => {
  const category = await categoryService.getOne("_id", req.params.id);
  if (!category) throw createHttpError(404, "Category not found.");

  res.json(apiResponse({ results: category.toObject() }));
});

export const getCategoryBySlug = asyncWrapper(async (req, res) => {
  const { slug } = matchedData(req);
  const category = await categoryService.getOne("slug", slug);
  if (!category) throw createHttpError(404, "Category not found.");

  res.json(apiResponse({ results: category.toObject() }));
});

export const postCategory = asyncWrapper(async (req, res) => {
  const { title, description, slug } = matchedData(req) as CategoryCreate;

  const category = await categoryService.create({
    title,
    description,
    slug,
  });

  res.status(201).json(
    apiResponse({
      results: category.toObject(),
      status: "SUCCESS",
      statusCode: 201,
      message: "Category created successfully",
    })
  );
});

export const patchCategory = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { title, slug, description } = matchedData(req) as CategoryUpdate;

  const category = await categoryService.getOne("_id", id);
  if (!category) throw createHttpError(404, "Category not found.");

  if (title) category.title = title;
  if (slug) category.slug = slug;
  if (description) category.description = description;

  // execute update
  await category.save();

  res.json(
    apiResponse({
      results: category.toObject(),
      status: "SUCCESS",
      message: "Category updated successfully",
    })
  );
});

export const deleteCategory = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const category = await categoryService.getOne("_id", id);
  if (!category) throw createHttpError(404, "Category not found.");

  // execute delete
  await category.deleteOne();

  res.json(
    apiResponse({
      results: category.id,
      status: "SUCCESS",
      message: "Category deleted successfully",
    })
  );
});
