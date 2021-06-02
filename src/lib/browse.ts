import axios from 'axios';
import {
  BrowseListingsAPIResponse,
  BrowseResults,
  BrowseVenuesAPIResponse,
} from '../@types/apiTypes/browse';
import { XanoListing } from '../@types/apiTypes/listing';
import { PopularSearch } from '../@types/apiTypes/popularSearch';
import { XanoSubcategory } from '../@types/apiTypes/subcategoriy';
import { XanoVenue } from '../@types/apiTypes/venue';
import { XanoListingOrVenue } from '../@types/apiTypes/xanoGeneral';
import { FilterState } from '../@types/state';
import { isXanoVenue } from './listings';
import { getAllSubcategories } from './subcategories';
import { getAllVenues } from './venues';

export const browseListings = async (
  search: PopularSearch,
  filter: FilterState,
  pageCursor: number | unknown
): Promise<BrowseListingsAPIResponse> => {
  try {
    const res = await axios({
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:5deb20/browse/listings',
      method: 'POST',
      data: {
        start_date: filter.dates.startDate,
        end_date: filter.dates.endDate,
        external: {
          page: pageCursor,
        },
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const browseVenues = async (
  search: PopularSearch,
  filter: FilterState,
  pageCursor: number | unknown
): Promise<BrowseVenuesAPIResponse> => {
  try {
    const res = await axios({
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:5deb20/browse/venue',
      method: 'POST',
      data: {
        start_date: null,
        end_date: null,
        external: {
          page: pageCursor,
        },
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const filterResultsByPopSearch = async (
  search: PopularSearch,
  results: XanoListingOrVenue[]
): Promise<XanoListingOrVenue[]> => {
  const catIds = search.categories.map(cat => cat.category_id);
  const subcatIds = search.subcategories.map(subcat => subcat.subcategory_id);
  const allSubcategories: XanoSubcategory[] = await getAllSubcategories();

  const isValidByCategory = (item: XanoListingOrVenue) => {
    const _subcatIds: number[] = item.subcategories
      .map(
        subcat =>
          subcat !== null &&
          subcat.subcategory_id !== 0 &&
          subcat.subcategory_id
      )
      .filter(subcat => subcat > 0);

    return _subcatIds.some(subcatId => {
      const subcategory = allSubcategories.find(s => s.id === subcatId);
      const catId = subcategory.category_id;
      return catIds.includes(catId);
    });
  };

  const isValidBySubcategory = (item: XanoListingOrVenue) => {
    return item.subcategories.some(i => {
      if (i === null || i.subcategory_id === 0) return false;
      return subcatIds.includes(i.subcategory_id);
    });
  };

  const filteredResults = results.filter(
    item => isValidByCategory(item) || isValidBySubcategory(item)
  );

  return filteredResults.sort((a, b) => {
    const aTime =
      a.start_date_time ?? (isXanoVenue(a) ? a.active_ts : a.start_date_time);
    const bTime =
      b.start_date_time ?? (isXanoVenue(b) ? b.active_ts : b.start_date_time);
    return aTime - bTime;
  });
};

// *** MAIN FUNCTION
export const browseResults = async (
  search: PopularSearch,
  filter: FilterState,
  pageCursor: number | unknown
): Promise<BrowseResults> => {
  try {
    const listings = await browseListings(search, filter, pageCursor);
    const venues = await browseVenues(search, filter, pageCursor);

    const items = await filterResultsByPopSearch(search, [
      ...listings.items,
      ...venues.items,
    ]);

    return {
      curPage: venues.curPage,
      nextPage: venues.nextPage,
      prevPage: venues.prevPage,
      items,
    };
  } catch (error) {
    console.error(error);
  }
};
