import { Types } from "mongoose";
import { PartialBy } from "./common.type";

export type PostStatus = "PUBLISHED" | "DRAFT";
export type PostMeta = {
  title?: string;
  description?: string;
};

export interface IPost {
  _id: string;
  slug: string;
  thumbnail: string | null;
  title: string;
  content: string;
  author: typeof Types.ObjectId;
  readTime: number;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  meta: PostMeta;
  categories: (typeof Types.ObjectId)[];
}

// SERVICE Types
export type PostCreate = PartialBy<
  Pick<
    IPost,
    | "title"
    | "content"
    | "thumbnail"
    | "categories"
    | "author"
    | "meta"
    | "slug"
    | "status"
  >,
  "slug" | "meta" | "thumbnail" | "status" | "categories"
>;
// TODO: Remove author after implementing authentication

export type PostUpdate = Partial<
  Pick<
    IPost,
    | "title"
    | "slug"
    | "content"
    | "categories"
    | "meta"
    | "status"
    | "thumbnail"
  >
>;
