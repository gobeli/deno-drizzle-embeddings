export type Page<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  search?: string;
};
