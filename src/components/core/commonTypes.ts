export interface Meta {
  filters: Record<string, any>;
  pagination: {
    page: number;
    rowsPerPage: number;
  };
}
