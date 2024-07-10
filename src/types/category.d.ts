import { PostInterface } from "./post";

export interface CategoryInterface {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  featured: boolean;
  posts: PostInterface[];
}
