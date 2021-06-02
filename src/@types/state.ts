export interface FilterState {
  dates: ReactDatesObj;
  timeOfDay: {
    anytime: boolean;
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  refine: {
    specialOffers: boolean;
    happyHour: boolean;
    walkingDistance: boolean;
  };
  area?: {
    all: boolean;
    downtown: boolean;
    funkzone: boolean;
    waterfront: boolean;
    montecito: boolean;
    goleta: boolean;
  };
  distance: number;
}

export type ReactDatesObj = {
  startDate: number | null;
  endDate: number | null;
  label?: string;
};

export interface BrandState {
  id: number;
  name: string;
  slug: string;
  type: string;
  filterOn: boolean;
  img: string;
  approved_venues?: [{ venue_id: number }];
}
