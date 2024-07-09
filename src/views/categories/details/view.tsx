import Breadcrumb from "@/components/breadcrumb";
import { BlogCard } from "@/components/cards/blog-card";
import { routes } from "@/router/routes";
import { categories, posts } from "@/views/home";
import { LucideBookmark } from "lucide-react";

type Props = {};

const category = categories[0];

export const CategoriesDetailsView = (props: Props) => {
  return (
    <div className="mt-10">
      <div className="flex items-start justify-between gap-3 mb-10">
        <div>
          <h3 className="font-semibold text-3xl mb-2">{category.title}</h3>
          <Breadcrumb
            links={[
              { title: "Home", path: routes.root },
              { title: "Categories", path: routes.categories.root },
            ]}
            className="mb-3"
          />
          <p className="text-base">{category.description}</p>
        </div>

        <LucideBookmark className="size-12 text-primary-base" />
      </div>

      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
};
