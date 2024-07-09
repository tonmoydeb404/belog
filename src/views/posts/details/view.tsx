import Breadcrumb from "@/components/breadcrumb";
import { routes } from "@/router/routes";
import { posts } from "@/views/home";

type Props = {};

const post = posts[0];

export const PostsDetailsView = (props: Props) => {
  return (
    <div className="mt-10">
      <div className="mb-10">
        <h3 className="font-semibold text-3xl mb-2">{post.title}</h3>
        <Breadcrumb
          links={[
            { title: "Home", path: routes.root },
            { title: "Posts", path: routes.posts.root },
          ]}
          className="mb-3"
        />
        <p className="text-base">{post.description}</p>
      </div>

      <article
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="prose prose-invert prose-sm w-full max-w-full"
      />
    </div>
  );
};
