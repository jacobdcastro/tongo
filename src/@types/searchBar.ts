export interface SearchBarObj {
  value: string;
  popularSearchId: number | null;
  setValue?: (val: string) => void;
  setPopularSearchId?: (id: number) => void;
  setValueAndPopSearch?: (obj: SearchBarObj) => void;
}
