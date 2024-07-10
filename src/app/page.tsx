import {
  getCategoriesListFeatured,
  getPostsListFeatured,
} from "@/lib/hygraph/services";
import { HomeView } from "@/views/home";
import { Metadata } from "next";

const HomePage = async () => {
  const categoriesResponse = await getCategoriesListFeatured();
  const postsResponse = await getPostsListFeatured();

  return (
    <HomeView
      categories={categoriesResponse.data || []}
      posts={postsResponse.data || []}
    />
  );
};

export default HomePage;

// Others ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: {
    absolute: "Belog - Personal Blog",
  },
};
