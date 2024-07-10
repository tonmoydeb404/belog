import { PostInterface } from "@/types/post";
import asyncWrapper from "@/utills/async-wrapper";
import { hygraphFetch } from "../helpers";
import {
  getPostsDetailsSchema,
  getPostsListFeaturedSchema,
  getPostsListSchema,
} from "../schema";

export const getPostsList = asyncWrapper(async () => {
  const response = await hygraphFetch(getPostsListSchema());
  const json = await response.json();

  return json.data.posts as PostInterface[];
});

export const getPostsListFeatured = asyncWrapper(async () => {
  const response = await hygraphFetch(getPostsListFeaturedSchema());
  const json = await response.json();

  return json.data.posts as PostInterface[];
});

export const getPostsDetails = asyncWrapper(async (slug: string) => {
  const response = await hygraphFetch(getPostsDetailsSchema(slug));
  const json = await response.json();

  return json.data.post as PostInterface;
});
