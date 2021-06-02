import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { PopularSearch } from '../@types/apiTypes/popularSearch';
import { RootState } from '../@types/redux';
import { getPopularSearchResults } from '../lib/popularSearches';
import { createListingApiResponse, ReqBody } from '../lib/popularSearchQuery';
import { createNewFilterObj } from './usePopularSearchScrollQuery';
import moment from 'moment';
import { useQuery } from 'react-query';
import slugify from '../lib/slugify';
import { UseQueryCountReturn } from './useQueryCount';

const usePopularSearchCarouselQuery = (
  search: PopularSearch,
  brandId: number,
  queryCounter: UseQueryCountReturn
) => {
  const { filter, brand } = useSelector((state: RootState) => state);
  const { startDate, endDate } = filter.dates;

  const [datesToFetch, setDatesToFetch] = useState<number[]>([]);
  const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false);
  const [isReadyToFetchMore, setIsReadyToFetchMore] = useState(false);

  const getItAll = async (s, obj: ReqBody) => {
    // console.log(fetchMoreInfo || startDate);
    const results = await getPopularSearchResults(
      obj.search,
      createNewFilterObj(obj.filter, startDate),
      obj.brand,
      obj.filterOn
    );
    return createListingApiResponse(results);
  };

  const getDatesToFetch = useCallback(() => {
    const dur =
      startDate && endDate ? moment(endDate).diff(startDate, 'day') : 0;
    const days: number[] = [];
    for (let i = 0; i <= dur; i++) {
      days.push(parseInt(moment(startDate).add(i, 'day').format('x')));
      // days.push(moment(startDate).add(i, 'day').format('ddd MMM Do'));
    }
    return days;
  }, [startDate, endDate]);

  // for each search update, reset cursor and set new dates
  useEffect(() => {
    setDatesToFetch(getDatesToFetch());
    setIsReadyToFetch(true);
  }, [search.id, filter.dates, brand.filterOn, getDatesToFetch]);

  const test = useQuery(
    [
      `popular-search-carousel-${search.id}`,
      { search, filter, brand, filterOn: brand.filterOn },
    ],
    getItAll,
    {
      enabled: isReadyToFetch && (!brandId || (brandId && brand.id !== 0)),
      onSuccess: () => queryCounter.handleQueryCompletion(),
    }
  );
};

export default usePopularSearchCarouselQuery;
