import { PartialBy } from "./common.type";

export interface ICategory {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// SERVICE types
export type CategoryCreate = PartialBy<
  Pick<ICategory, "title" | "slug" | "description">,
  "slug"
>;
export type CategoryUpdate = Partial<
  Pick<ICategory, "title" | "slug" | "description">
>;
