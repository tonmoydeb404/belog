export type ApiStatus = "SUCCESS" | "ERROR";

export type ApiError = {
  key: string | number;
  message: string;
};

type ApiErrorResponse = {
  status: "ERROR";
  statusCode: number;
  message: string;
  errors: ApiError[];
};

type ApiSuccessResponse = {
  status?: "SUCCESS";
  statusCode?: number;
  message?: string;
  results: any;
} & Record<string, any>;

export type ApiResponse = ApiErrorResponse | ApiSuccessResponse;
