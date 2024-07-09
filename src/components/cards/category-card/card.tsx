import { RouterLink } from "@/router/components";
import { routes } from "@/router/routes";
import { CategoryInterface } from "@/types/category";

type Props = {
  category: CategoryInterface;
};

export const CategoryCard = (props: Props) => {
  const { category } = props;

  return (
    <div className="blog_card">
      <div className="card_body">
        <h1 className="card_title text-2xl font-bold mb-0.5">
          <RouterLink
            href={routes.categories.details(category.slug)}
            className="underline decoration-transparent decoration-wavy hover:decoration-primary duration-200 ease-out"
          >
            {category.title}
          </RouterLink>
        </h1>
        {/* <p className="mb-4">27 June, 2023</p> */}

        <p className="card_text text-base leading-snug mb-3">
          {category.description}
        </p>
      </div>
    </div>
  );
};
