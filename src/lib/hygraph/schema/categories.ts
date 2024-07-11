export const getCategoriesListSchema = () => `
query GetCategoriesList {
  categories(first: 1000) {
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
    id
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
  categories(where: {featured: true}, first:1000) {
    title
    slug
    description
    featured
  }
}
`;

export const getCategorySlugSchema = (id: string) => `
query GetCategorySlug {
  category(where: {id: "${id}"}) {
    slug
  }
}
`;
