import Breadcrumb from "@/components/breadcrumb";
import { BlogCard } from "@/components/cards/blog-card";
import { routes } from "@/router/routes";
import { posts } from "@/views/home";

type Props = {};

export const PostListView = (props: Props) => {
  return (
    <div className="mt-10">
      <div className="mb-10">
        <h3 className="font-semibold text-3xl mb-2">Posts</h3>
        <Breadcrumb links={[{ title: "Home", path: routes.root }]} />
      </div>

      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
};
