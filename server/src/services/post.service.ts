import readingTime from "reading-time";
import Post from "../models/Post.model";
import { IPost, PostCreate, PostUpdate } from "../types/post.type";

// get all posts
export const getAll = () => {
  return Post.find();
};

// get one post by property filter
export const getOne = (key: keyof IPost, value: any) => {
  if (key === "_id") {
    return Post.findById(value);
  }

  return Post.findOne({ [key]: value });
};

// create post account
export const create = (data: PostCreate) => {
  // add read time
  const stats = readingTime(data.content);

  return new Post({ ...data, readTime: stats.time }).save();
};

// update post account by id
export const updateById = (id: string, data: PostUpdate) => {
  return Post.findByIdAndUpdate(id, data);
};

// delete post account by id
export const deleteById = (id: string) => {
  return Post.findByIdAndDelete(id);
};
