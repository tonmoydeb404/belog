import { Schema, model } from "mongoose";
import { sluggerPlugin } from "mongoose-slugger-plugin";
import { ICategory } from "../types/category.type";

const categorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create index for slug
categorySchema.index({ slug: 1 }, { name: "category_slug", unique: true });
// config auto slug generator
categorySchema.plugin(sluggerPlugin, {
  slugPath: "slug",
  generateFrom: ["title"],
  index: "category_slug",
});

// posts virtuals
categorySchema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "categories",
});

const Category = model("category", categorySchema);

export default Category;
