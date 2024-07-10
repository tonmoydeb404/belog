import {
  getCategoriesDetails,
  getCategoriesList,
} from "@/lib/hygraph/services";
import { CategoriesDetailsView } from "@/views/categories";
import { Metadata } from "next";
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

export const generateStaticParams = async () => {
  const categoriesResponse = await getCategoriesList();

  if (categoriesResponse.data?.length) {
    return categoriesResponse.data.map((category) => ({
      slug: category.slug,
    }));
  }

  return [];
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const {
    params: { slug },
  } = props;

  const categoryResponse = await getCategoriesDetails(slug);

  if (categoryResponse.data) {
    return {
      title: categoryResponse.data.title,
      description: categoryResponse.data.description,
    };
  }

  return {
    title: "Category",
  };
};
