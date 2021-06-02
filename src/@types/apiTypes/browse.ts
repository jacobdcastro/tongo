import { XanoListing } from './listing';
import { XanoVenue } from './venue';

export interface BrowseVenuesAPIResponse {
  itemsRecieved: number;
  curPage: number;
  nextPage: number;
  prevPage: number;
  items: XanoVenue[];
}

export interface BrowseListingsAPIResponse {
  itemsRecieved: number;
  curPage: number;
  nextPage: number;
  prevPage: number;
  items: XanoListing[];
}

export interface BrowseResults {
  curPage: number;
  nextPage: number;
  prevPage: number;
  items: (XanoListing | XanoVenue)[];
}
