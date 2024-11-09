interface ValidationType {
  field: string;
  constraint: string[] | string;
}

interface SuccessResponse<T> {
  data?: T;
}

interface ErrorResponse {
  error?: {
    name: string;
    message: string;
    validationErrors?: ValidationType[];
    stack?: string;
  };
}

export interface BaseListFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IApiResponse<T> extends SuccessResponse<T>, ErrorResponse {}
