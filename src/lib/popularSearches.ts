import axios, { AxiosResponse } from 'axios';
import { XanoBrand } from '../@types/apiTypes/brand';
import { PopularSearch } from '../@types/apiTypes/popularSearch';
import { XanoListingOrVenue } from '../@types/apiTypes/xanoGeneral';
import { BrandState, FilterState } from '../@types/state';
import { checkAllCriteria } from './filterCheck';
import {
  createUpcomingListings,
  removeDuplicateResults,
  sortUpcomingResults,
} from './listings';
import { getSearchedListingsAndVenues } from './search';

export const getAllPopularSearches = async (): Promise<AxiosResponse> => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/popular_search',
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getAllPopularSearches()', error.response);
  }
};

// get all listings applied to search filter,
// then remove duplicates,
// create upcoming listing cards,
// and sort by date
export const getPopularSearchResults = async (
  search: PopularSearch,
  filter: FilterState,
  brand: BrandState,
  filterOn: boolean,
  resultsLength?: number
): Promise<XanoListingOrVenue[]> => {
  const { startDate, endDate } = filter.dates;
  return await getSearchedListingsAndVenues(search).then(
    (array: XanoListingOrVenue[]) => {
      const allResults = removeDuplicateResults(array);
      const venuesAndAllUpcomingListings = createUpcomingListings(allResults);
      const filteredResults = venuesAndAllUpcomingListings.filter(result =>
        checkAllCriteria(
          result,
          filter,
          brand,
          filterOn,
          search.featured_venues
        )
      );
      const sortedResults = sortUpcomingResults(
        filteredResults,
        { startDate, endDate },
        resultsLength
      );
      if (search.id === 1) {
        // console.log([
        //   { array },
        //   { allResults },
        //   { venuesAndAllUpcomingListings },
        //   { filteredResults },
        //   { sortedResults },
        // ]);
      }
      return sortedResults;
    }
  );
};
