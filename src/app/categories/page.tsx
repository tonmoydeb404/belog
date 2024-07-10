import { getCategoriesList } from "@/lib/hygraph/services";
import { CategoriesListViews } from "@/views/categories";

type Props = {};

const CategoryPage = async (props: Props) => {
  const categoriesResponse = await getCategoriesList();
  return <CategoriesListViews categories={categoriesResponse.data || []} />;
};

export default CategoryPage;

// Others ----------------------------------------------------------------------
export const metadata = {
  title: "Categories",
};
