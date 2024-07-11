export const hygraphFetch = (schema: string, tags: string[] = []) => {
  const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT as string;
  return fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: schema,
    }),
    next: { tags },
  });
};
