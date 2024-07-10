export const getCategoriesListSchema = () => `
query GetCategoriesList {
  categories {
    title
    slug
    description
    featured
  }
}
`;

export const getCategoriesDetailsSchema = (slug: string) => `
query GetCategoriesDetails {
  category(where: {slug: "${slug}"}) {
    title
    slug
    description
    featured
    posts: post {
      title
      slug
      description
      featured
      content {
        html
      }
      createdAt
    }
  }
}
`;

export const getCategoriesListFeaturedSchema = () => `
query GetCategoriesListFeatured {
  categories(where: {featured: true}) {
    title
    slug
    description
    featured
  }
}
`;
