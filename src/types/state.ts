import { Sneaker, Team } from ".";

type State = {
  isLoading: boolean;
  isError: boolean;
};

type Page = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type SneakerState = State & {
  data: Sneaker | null;
};

export type SneakersState = State &
  Page & {
    data: Sneaker[];
  };

export type BasketState = State & {
  data: Sneaker[];
};

export type TeamState = State &
  Page & {
    data: Team[];
  };

export type FiltersState = {
  size: number[];
  price: {
    min?: number;
    max?: number;
  };
  gender: {
    male: boolean;
    female: boolean;
  };
  limit: number;
};
