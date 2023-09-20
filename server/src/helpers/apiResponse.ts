import { ApiResponse } from "../types/api.type";

const apiResponse = (res: ApiResponse): ApiResponse => {
  if (res.status === "ERROR") return res;

  return {
    status: "SUCCESS",
    results: res.results,
    message: res.message,
    statusCode: res.statusCode || 200,
    ...res,
  };
};

export default apiResponse;
