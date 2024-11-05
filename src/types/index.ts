export type Sneaker = {
  id: number;
  vendorСode: string;
  inStock: number;
  title: string;
  description: string;
  imgUrl: string;
  stars: number;
  sizes: number[];
  price: number;
  oldPrice: number;
  gender: string;
  color: string;
  compound: string;
  country: string;
};

export type Team = {
  id: number;
  imgUrl: string;
  name: string;
  role: string;
};

export type Page = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export interface LimitParams {
  price: number;
  oldPrice: number;
  gender: string;
  sizes: number[];
}
