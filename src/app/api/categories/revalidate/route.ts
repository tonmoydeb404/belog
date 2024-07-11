import { routes } from "@/router/routes";
import { revalidatePath, revalidateTag } from "next/cache";

export const POST = async (request: Request) => {
  const payload = await request.json();

  const operation = payload?.operation;
  const slug = payload?.data?.slug;

  if (!operation || !slug)
    return Response.json({ revalidated: false, message: "Invalid payload" });

  switch (payload.operation) {
    case "publish":
      revalidateTag("featured-categories");
      revalidateTag(`category-${slug}`);
      break;
    case "unpublish":
      revalidateTag("featured-categories");
      revalidatePath(routes.categories.details(slug));
    case "delete":
      revalidateTag("featured-categories");
      revalidatePath(routes.categories.details(slug));
    default:
      return Response.json({
        revalidated: false,
        message: "Invalid operation",
      });
  }

  return Response.json({
    revalidated: true,
  });
};
