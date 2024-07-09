import { RouterLink } from "@/router/components";
import { routes } from "@/router/routes";
import { PostInterface } from "@/types/post";

type Props = {
  post: PostInterface;
};

export const BlogCard = (props: Props) => {
  const { post } = props;

  return (
    <div className="blog_card">
      <div className="card_body">
        <h1 className="card_title text-2xl font-bold mb-0.5">
          <RouterLink
            href={routes.posts.details(post.slug)}
            className="underline decoration-transparent decoration-wavy hover:decoration-primary duration-200 ease-out"
          >
            {post.title}
          </RouterLink>
        </h1>
        <p className="mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>

        <p className="card_text text-base leading-snug mb-3">
          {post.description}
        </p>
        <div className="card_actions flex items-center">
          <RouterLink
            href={routes.posts.details(post.slug)}
            className="text-primary"
          >
            Read More
          </RouterLink>
        </div>
      </div>
    </div>
  );
};
