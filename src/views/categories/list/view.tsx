import Breadcrumb from "@/components/breadcrumb";
import { CategoryCard } from "@/components/cards/category-card";
import { routes } from "@/router/routes";
import { CategoryInterface } from "@/types/category";

type Props = {
  categories: CategoryInterface[];
};

export const CategoriesListViews = (props: Props) => {
  const { categories } = props;

  return (
    <div className="mt-10">
      <div className="mb-10">
        <h3 className="font-semibold text-3xl mb-2">Categories</h3>
        <Breadcrumb links={[{ title: "Home", path: routes.root }]} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.slug} />
        ))}
      </div>
    </div>
  );
};
