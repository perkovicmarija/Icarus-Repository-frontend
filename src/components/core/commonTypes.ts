export interface Meta {
  filters: Record<string, any>;
  pagination: {
    page: number;
    rowsPerPage: number;
  };
}

export interface ResponseWrapper<T> {
  data: T;
  meta: {
    totalCount: number;
  };
  message: string;
  code: string;
}
