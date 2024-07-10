import {
  getCategoriesListFeatured,
  getPostsListFeatured,
} from "@/lib/hygraph/services";
import { HomeView } from "@/views/home";

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
