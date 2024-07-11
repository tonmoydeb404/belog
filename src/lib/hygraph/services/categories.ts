import { CategoryInterface } from "@/types/category";
import asyncWrapper from "@/utills/async-wrapper";
import { hygraphFetch } from "../helpers";
import {
  getCategoriesDetailsSchema,
  getCategoriesListFeaturedSchema,
  getCategoriesListSchema,
  getCategorySlugSchema,
} from "../schema";

export const getCategoriesList = asyncWrapper(async () => {
  const response = await hygraphFetch(getCategoriesListSchema(), [
    "categories",
  ]);
  const json = await response.json();

  return json.data.categories as CategoryInterface[];
});

export const getCategoriesListFeatured = asyncWrapper(async () => {
  const response = await hygraphFetch(getCategoriesListFeaturedSchema(), [
    "categories-featured",
  ]);
  const json = await response.json();

  return json.data.categories as CategoryInterface[];
});

export const getCategoriesDetails = asyncWrapper(async (slug: string) => {
  const response = await hygraphFetch(getCategoriesDetailsSchema(slug), [
    `categories-${slug}`,
  ]);
  const json = await response.json();

  return json.data.category as CategoryInterface;
});

export const getCategorySlug = asyncWrapper(async (id: string) => {
  const response = await hygraphFetch(getCategorySlugSchema(id));
  const json = await response.json();

  return json.data.category as { slug: string };
});
