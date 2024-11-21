import { Sneaker, Team, Page } from ".";

type State = {
  isLoading: boolean;
  isError: boolean;
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
