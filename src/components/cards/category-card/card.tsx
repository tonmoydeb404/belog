import { RouterLink } from "@/router/components";
import { routes } from "@/router/routes";
import { CategoryInterface } from "@/types/category";

type Props = {
  category: CategoryInterface;
};

export const CategoryCard = (props: Props) => {
  const { category } = props;

  return (
    <div className="">
      <div className="">
        <h1 className="text-2xl font-bold mb-1 line-clamp-1">
          <RouterLink
            href={routes.categories.details(category.slug)}
            className="underline decoration-transparent decoration-wavy hover:decoration-primary-base duration-200 ease-out"
          >
            {category.title}
          </RouterLink>
        </h1>

        <p className="text-base leading-snug mb-3 line-clamp-2">
          {category.description}
        </p>
      </div>
    </div>
  );
};
