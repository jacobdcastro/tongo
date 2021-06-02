import axios, { AxiosResponse } from 'axios';
import { XanoListing } from '../@types/apiTypes/listing';
import { PopularSearch } from '../@types/apiTypes/popularSearch';
import { XanoVenue } from '../@types/apiTypes/venue';
import { XanoListingOrVenue } from '../@types/apiTypes/xanoGeneral';
import { BrandState, FilterState } from '../@types/state';

const initialBrandState = {
  id: 0,
  name: '',
  slug: '',
  type: '',
  filterOn: false,
  img: '',
};

export interface ReqBody {
  search: PopularSearch;
  filter: FilterState;
  brand: BrandState;
  filterOn: boolean;
  resultsLength?: number;
}

export interface ListingApiResponse {
  id: number;
  type: string;
  start_date_time: number;
  end_date_time: number;
  index?: number;
}

export const createListingApiResponse = (
  results: (XanoVenue | XanoListing)[]
): ListingApiResponse[] =>
  results.map(({ id, type, start_date_time, end_date_time }) => ({
    id,
    type,
    start_date_time,
    end_date_time,
  }));

const popularSearchQuery = async (
  search: PopularSearch,
  filter: FilterState,
  brand: BrandState,
  filterOn: boolean,
  length?: number
): Promise<ListingApiResponse[]> => {
  // console.log({ search, filter, brand });
  const fetchWithBrand = async () => {
    const data: ReqBody = { search, filter, brand, filterOn };
    if (length) data.resultsLength = length;
    const results: AxiosResponse<XanoListingOrVenue[]> = await axios({
      method: 'POST',
      url: 'api/search/fetch',
      data,
    });
    return createListingApiResponse(results.data);
  };

  const fetchWithoutBrand = async () => {
    const data: ReqBody = {
      search,
      filter,
      brand: initialBrandState,
      filterOn,
    };
    if (length) data.resultsLength = length;
    const results: AxiosResponse<XanoListingOrVenue[]> = await axios({
      method: 'POST',
      url: 'api/search/fetch',
      data,
    });
    return createListingApiResponse(results.data);
  };

  try {
    if (brand && brand.id > 0) return await fetchWithBrand();
    return await fetchWithoutBrand();
  } catch (error) {
    console.error('popularSearchQuery()', error);
  }
};

export default popularSearchQuery;
