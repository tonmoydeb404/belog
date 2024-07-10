import { CategoryInterface } from "@/types/category";
import asyncWrapper from "@/utills/async-wrapper";
import { hygraphFetch } from "../helpers";
import {
  getCategoriesDetailsSchema,
  getCategoriesListFeaturedSchema,
  getCategoriesListSchema,
} from "../schema";

export const getCategoriesList = asyncWrapper(async () => {
  const response = await hygraphFetch(getCategoriesListSchema());
  const json = await response.json();

  return json.data.categories as CategoryInterface[];
});

export const getCategoriesListFeatured = asyncWrapper(async () => {
  const response = await hygraphFetch(getCategoriesListFeaturedSchema());
  const json = await response.json();

  return json.data.categories as CategoryInterface[];
});

export const getCategoriesDetails = asyncWrapper(async (slug: string) => {
  const response = await hygraphFetch(getCategoriesDetailsSchema(slug));
  const json = await response.json();

  return json.data.category as CategoryInterface;
});
