import { matchedData } from "express-validator";
import createHttpError from "http-errors";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import * as postService from "../services/post.service";
import { PostCreate, PostUpdate } from "../types/post.type";

export const getPosts = asyncWrapper(async (_req, res) => {
  const posts = await postService.getAll().populate("categories");
  res.json(apiResponse({ results: posts, length: posts.length }));
});

export const getPost = asyncWrapper(async (req, res) => {
  const post = await postService.getOne("_id", req.params.id);
  if (!post) throw createHttpError(404, "Post not found.");

  res.json(apiResponse({ results: post.toObject() }));
});

export const getPostBySlug = asyncWrapper(async (req, res) => {
  const { slug } = matchedData(req);
  const post = await postService.getOne("slug", slug).populate("categories");
  if (!post) throw createHttpError(404, "Post not found.");

  res.json(apiResponse({ results: post.toObject() }));
});

export const postPost = asyncWrapper(async (req, res) => {
  const { title, author, content, categories, meta, slug, status, thumbnail } =
    matchedData(req) as PostCreate;

  const post = await postService.create({
    title,
    author,
    content,
    categories,
    meta,
    slug,
    status,
    thumbnail,
  });

  res.status(201).json(
    apiResponse({
      results: post.toObject(),
      status: "SUCCESS",
      statusCode: 201,
      message: "Post created successfully",
    })
  );
});

export const patchPost = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { title, slug, categories, content, meta, status, thumbnail } =
    matchedData(req) as PostUpdate;

  const post = await postService.getOne("_id", id);
  if (!post) throw createHttpError(404, "Post not found.");

  if (title) post.title = title;
  if (slug) post.slug = slug;
  if (categories) post.categories = categories;
  if (content) post.content = content;
  if (meta) post.meta = meta;
  if (status) post.status = status;
  if (thumbnail) post.thumbnail = thumbnail;

  // execute update
  await post.save();

  res.json(
    apiResponse({
      results: post.toObject(),
      status: "SUCCESS",
      message: "Post updated successfully",
    })
  );
});

export const deletePost = asyncWrapper(async (req, res) => {
  const { id } = matchedData(req);

  const post = await postService.getOne("_id", id);
  if (!post) throw createHttpError(404, "Post not found.");

  // execute delete
  await post.deleteOne();

  res.json(
    apiResponse({
      results: post.id,
      status: "SUCCESS",
      message: "Post deleted successfully",
    })
  );
});
