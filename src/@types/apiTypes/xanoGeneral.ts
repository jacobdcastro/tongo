import { XanoListing } from './listing';
import { XanoVenue } from './venue';

export interface VenueHoursDay {
  open: string;
  close: string;
  day:
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday';
}

export type VenueHours = VenueHoursDay[];

export interface XanoCategory {
  id: number;
  created_at: number;
  name: string;
  suggested_tags: [
    {
      tag: string;
    }
  ];
  type: string;
  _listings_of_category?: XanoListing[];
}

export interface XanoCTAButton {
  label:
    | 'Menu'
    | 'Buy'
    | 'Tickets'
    | 'Book'
    | 'Call'
    | 'Directions'
    | 'Website'
    | '';
  type:
    | 'menu'
    | 'buy'
    | 'tickets'
    | 'book'
    | 'call'
    | 'directions'
    | 'website'
    | '';
  url: string;
}

export type XanoListingOrVenue = XanoListing | XanoVenue;
