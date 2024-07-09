export const routes = {
  root: "/",
  categories: {
    root: "/categories",
    details: (slug: string) => `/categories/${slug}`,
  },
  posts: {
    root: "/posts",
    details: (slug: string) => `/posts/${slug}`,
  },
};
