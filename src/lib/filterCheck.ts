import { XanoListing } from '../@types/apiTypes/listing';
import { XanoVenue } from '../@types/apiTypes/venue';
import { isXanoVenue } from './listings';
import {
  listingIsWithinDateRange,
  venueIsWithinDateRange,
  passesBrandFilter,
  // isInTimeOfDay,
  // isWithinDistance,
  // isInPopularSearch,
} from './search';
import { BrandState, FilterState } from '../@types/state';
import { XanoListingOrVenue } from '../@types/apiTypes/xanoGeneral';

const check = (
  a: boolean,
  b: boolean,
  c?: boolean
  // d?: boolean,
  // e?: boolean
): boolean => (typeof c === 'boolean' ? a && b && c : a && b);

export const checkAllCriteria = (
  data: XanoListingOrVenue,
  filter: FilterState,
  brand: BrandState,
  filterOn: boolean,
  featured_venues?: number[]
): boolean => {
  if (!isXanoVenue(data)) {
    return (
      // data.published &&
      check(
        listingIsWithinDateRange(
          // check date range
          filter.dates,
          data.start_date_time,
          data.end_date_time
        ),
        passesBrandFilter(
          // check brand filter
          data.venue_id,
          brand,
          filterOn
        )
        // isInTimeOfDay(filter.timeOfDay, data.start_date_time), // check time of day
        // isWithinDistance(), // check distance
        // isInPopularSearch()
      )
    );
  }

  if (isXanoVenue(data)) {
    return (
      // data.published &&
      check(
        venueIsWithinDateRange(
          filter.dates,
          data.hours_of_operation,
          data.name
        ), // check date range
        passesBrandFilter(
          // check brand filter
          data.id,
          brand,
          filterOn
        ),
        featured_venues ? !featured_venues.includes(data.id) : true
      )
    );
  }
};
