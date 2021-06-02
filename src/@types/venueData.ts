type Price = '$' | '$$' | '$$$';

export interface Venue {
  _id: string;
  name: string;
  price: string | Price;
}
