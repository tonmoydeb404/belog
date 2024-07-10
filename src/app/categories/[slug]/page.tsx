import { getCategoriesDetails } from "@/lib/hygraph/services";
import { CategoriesDetailsView } from "@/views/categories";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

const CategoryDetailsPage = async (props: Props) => {
  const {
    params: { slug },
  } = props;

  const categoryResponse = await getCategoriesDetails(slug);

  if (!categoryResponse.data) return notFound();

  return <CategoriesDetailsView category={categoryResponse.data} />;
};

export default CategoryDetailsPage;
