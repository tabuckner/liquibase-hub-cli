export interface PageableModel {
  page: number;
  size: number;
  sort: Array<string>;
}

export interface PagedResponseModel<T> {
  totalPages: number;
  totalElements: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  content: Array<T>;
  number: number;
  first: boolean;
  pageable: PageableModel;
  last: boolean;
  empty: boolean;
}
