export const getPostsListSchema = () => `
query GetPostsList {
  posts(first: 1000) {
    title
    slug
    description
    featured
    createdAt
  }
}
`;

export const getPostsDetailsSchema = (slug: string) => `
query GetPostsDetails {
  post(where: {slug: "${slug}"}) {
    title
    slug
    featured
    description
    content {
      html
    }
    createdAt
    tags
    category {
      title
      slug
    }
  }
}
`;

export const getPostsListFeaturedSchema = () => `
query GetPostsListFeatured {
  posts(where: {featured: true}, first: 1000) {
    title
    slug
    description
    featured
    createdAt
  }
}
`;
