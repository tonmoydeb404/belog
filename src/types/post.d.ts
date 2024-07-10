import { CategoryInterface } from "./category";

export interface PostInterface {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  content: { html: string } | null;
  featured: boolean;
  category: CategoryInterface;
  tags: string[];
}
