import { Model } from "mongoose";
import Category from "./Category.model";
import Post from "./Post.model";
import User from "./User.model";

const models: Model<any>[] = [User, Category, Post];

export default models;
