import { getPostsList } from "@/lib/hygraph/services";
import { PostListView } from "@/views/posts";

type Props = {};

const PostsPage = async (props: Props) => {
  const postsResponse = await getPostsList();

  return <PostListView posts={postsResponse.data || []} />;
};

export default PostsPage;

// Others ----------------------------------------------------------------------
export const metadata = {
  title: "Posts",
};
