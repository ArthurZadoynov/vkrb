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

export type TeamState = State &
  Page & {
    data: Team[];
  };
