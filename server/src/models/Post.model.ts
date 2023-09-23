import { Schema, Types, model } from "mongoose";
import { sluggerPlugin } from "mongoose-slugger-plugin";
import { IPost, PostMeta, PostStatus } from "../types/post.type";

export const postStatuses: PostStatus[] = ["DRAFT", "PUBLISHED"];

const postMetaSchema = new Schema<PostMeta>({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
      default: null,
      trim: true,
    },
    status: {
      type: String,
      enum: postStatuses,
      default: "DRAFT",
    },
    meta: {
      type: postMetaSchema,
    },
    readTime: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "user",
    },
    categories: {
      type: [Types.ObjectId],
      ref: "category",
      default: [],
    },
  },
  { timestamps: true }
);

// create index for slug
postSchema.index({ slug: 1 }, { name: "post_slug", unique: true });
// config auto slug generator
postSchema.plugin(sluggerPlugin, {
  slugPath: "slug",
  generateFrom: ["title"],
  index: "post_slug",
});

const Post = model("post", postSchema);

export default Post;
