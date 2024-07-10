import { getPostsDetails } from "@/lib/hygraph/services";
import { PostsDetailsView } from "@/views/posts";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

const PostsDetailsPage = async (props: Props) => {
  const {
    params: { slug },
  } = props;

  const postResponse = await getPostsDetails(slug);

  if (!postResponse.data) return notFound();

  return <PostsDetailsView post={postResponse.data} />;
};

export default PostsDetailsPage;
