import { PostInterface } from "@/types/post";
import asyncWrapper from "@/utills/async-wrapper";
import { hygraphFetch } from "../helpers";
import {
  getPostsDetailsSchema,
  getPostsListFeaturedSchema,
  getPostsListSchema,
} from "../schema";

export const getPostsList = asyncWrapper(async () => {
  const response = await hygraphFetch(getPostsListSchema(), ["posts"]);
  const json = await response.json();

  return json.data.posts as PostInterface[];
});

export const getPostsListFeatured = asyncWrapper(async () => {
  const response = await hygraphFetch(getPostsListFeaturedSchema(), [
    "posts-featured",
  ]);
  const json = await response.json();

  return json.data.posts as PostInterface[];
});

export const getPostsDetails = asyncWrapper(async (slug: string) => {
  const response = await hygraphFetch(getPostsDetailsSchema(slug), [
    `posts-${slug}`,
  ]);
  const json = await response.json();

  return json.data.post as PostInterface;
});
