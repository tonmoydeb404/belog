import { getPostsDetails, getPostsList } from "@/lib/hygraph/services";
import { PostsDetailsView } from "@/views/posts";
import { Metadata } from "next";
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

export const generateStaticParams = async () => {
  const postsResponse = await getPostsList();

  if (postsResponse.data?.length) {
    return postsResponse.data.map((post) => ({
      slug: post.slug,
    }));
  }

  return [];
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const {
    params: { slug },
  } = props;

  const postResponse = await getPostsDetails(slug);

  if (postResponse.data) {
    return {
      title: postResponse.data.title,
      description: postResponse.data.description,
      keywords: postResponse.data.tags,
    };
  }

  return {
    title: "Category",
  };
};
