import { BlogCard } from "@/components/cards/blog-card";
import { CategoryCard } from "@/components/cards/category-card";
import { RouterLink } from "@/router/components";
import { routes } from "@/router/routes";
import { CategoryInterface } from "@/types/category";
import { PostInterface } from "@/types/post";
import { LucideBookmark, LucideText } from "lucide-react";

type Props = {
  categories: CategoryInterface[];
  posts: PostInterface[];
};

export const HomeView = (props: Props) => {
  const { categories, posts } = props;

  return (
    <div>
      <div className="flex items-center justify-between mb-10 mt-10">
        <div className="inline-flex item-center gap-2">
          <LucideBookmark />
          <h3 className="text-xl font-semibold">Featured Categories</h3>
        </div>

        <RouterLink
          className="text-primary-base text-sm"
          href={routes.categories.root}
        >
          View All
        </RouterLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.slug} />
        ))}
      </div>

      <div className="flex items-center justify-between mb-10">
        <div className="inline-flex item-center gap-2">
          <LucideText />
          <h3 className="text-xl font-semibold">Featured Posts</h3>
        </div>

        <RouterLink
          className="text-primary-base text-sm"
          href={routes.posts.root}
        >
          View All
        </RouterLink>
      </div>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
};
