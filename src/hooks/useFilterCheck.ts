import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../@types/redux';
import { XanoListing } from '../@types/apiTypes/listing';
import {
  listingIsWithinDateRange,
  passesBrandFilter,
  isInTimeOfDay,
  isWithinDistance,
  isInPopularSearch,
} from '../lib/search';
import { XanoVenue } from '../@types/apiTypes/venue';
import { isXanoVenue } from '../lib/listings';
import { XanoListingOrVenue } from '../@types/apiTypes/xanoGeneral';

const useFilterCheck = (data: XanoListingOrVenue): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>();
  const { filter, search, brand } = useSelector((state: RootState) => state);
  const { dates, refine, timeOfDay, area, distance } = filter;

  // ? if any function check returns false
  const checkAllCriteria = (
    a: boolean,
    b: boolean,
    c: boolean,
    d: boolean,
    e: boolean
  ): void => setIsVisible(a && b && c && d && e);

  useEffect(() => {
    if (!isXanoVenue(data)) {
      checkAllCriteria(
        listingIsWithinDateRange(
          dates,
          data.start_date_time,
          data.end_date_time
        ), // check date range
        passesBrandFilter(
          // check brand filter
          isXanoVenue(data) ? data.id : data.venue_id,
          brand
        ),
        isInTimeOfDay(timeOfDay, data.start_date_time), // check time of day
        isWithinDistance(), // check distance
        isInPopularSearch()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filter, brand.filterOn, search]);

  if (isXanoVenue(data)) return true;
  return isVisible;
};

export default useFilterCheck;
