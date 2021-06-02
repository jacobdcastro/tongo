import { XanoListing } from './apiTypes/listing';
import { XanoVenue } from './apiTypes/venue';
import { XanoListingOrVenue } from './apiTypes/xanoGeneral';
import { ReactDatesObj } from './state';

export type SortResultsFunction = (
  listings: XanoListing[],
  venues: XanoVenue[],
  dates: ReactDatesObj
) => XanoListingOrVenue[];
