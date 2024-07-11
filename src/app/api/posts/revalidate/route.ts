import { getCategorySlug } from "@/lib/hygraph/services";
import { routes } from "@/router/routes";
import { revalidatePath, revalidateTag } from "next/cache";

const revalidateCategory = async (id: string) => {
  const categoryResponse = await getCategorySlug(id);

  if (categoryResponse.error || !categoryResponse.data) {
    return "Could not revalidate category";
    // return categoryResponse;
  }

  revalidateTag(`categories-${categoryResponse.data.slug}`);

  return undefined;
};

export const POST = async (request: Request) => {
  const payload = await request.json();

  const operation = payload?.operation;
  const slug = payload?.data?.slug;
  const categoryId = payload?.data?.category?.id;
  let message;

  if (!operation || !slug)
    return Response.json({ revalidated: false, message: "Invalid payload" });

  switch (payload.operation) {
    case "publish":
      revalidateTag("posts");
      revalidateTag("posts-featured");
      revalidateTag(`posts-${slug}`);
      break;
    case "unpublish":
      revalidateTag("posts");
      revalidateTag("posts-featured");
      revalidatePath(routes.posts.details(slug));
    case "delete":
      revalidateTag("posts");
      revalidateTag("posts-featured");
      revalidatePath(routes.posts.details(slug));
    default:
      return Response.json({
        revalidated: false,
        message: "Invalid operation",
      });
  }

  if (categoryId) message = await revalidateCategory(categoryId);

  return Response.json({
    revalidated: true,
    message,
  });
};
