import Breadcrumb from "@/components/breadcrumb";
import { BlogCard } from "@/components/cards/blog-card";
import { routes } from "@/router/routes";
import { CategoryInterface } from "@/types/category";
import { LucideBookmark } from "lucide-react";

type Props = {
  category: CategoryInterface;
};

export const CategoriesDetailsView = (props: Props) => {
  const { category } = props;

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
        {category.posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
};
