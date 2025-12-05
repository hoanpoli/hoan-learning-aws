export type ApiParams<T> = {
  url: string;
  method: string;
  data?: T | null;
  params: T | null;
  multipart?: boolean;
};

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  sortBy: string;
  sortDirection: 'ASC' | 'DESC';
}
