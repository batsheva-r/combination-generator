export interface GetAllRequest {
  n: number;
  startIndex: string;
  page: string;
  pageSize: number;
}

export interface GetAllItem {
  index: string;
  permutation: number[];
}

export interface GetAllResponse {
  page: string;
  page_size: number;
  total_pages: string;
  total_items: string;
  has_next: boolean;
  has_prev: boolean;
  items: GetAllItem[];
}