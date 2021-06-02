/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../@types/redux';
import moment from 'moment';
import { useInfiniteQuery } from 'react-query';
import popularSearchQuery, {
  createListingApiResponse,
  ListingApiResponse,
  ReqBody,
} from '../lib/popularSearchQuery';
import { PopularSearch } from '../@types/apiTypes/popularSearch';
import { FilterState } from '../@types/state';
import { getPopularSearchResults } from '../lib/popularSearches';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { browseListings, browseResults } from '../lib/browse';

export const createNewFilterObj = (
  filter: FilterState,
  dateToFetch: number
): FilterState => ({
  ...filter,
  dates: {
    ...filter.dates,
    startDate: parseInt(moment(dateToFetch).format('x')),
    endDate: null,
  },
});

const usePopularSearchScrollQuery = (search: PopularSearch) => {
  const brandId =
    typeof localStorage !== 'undefined'
      ? parseInt(localStorage.getItem('brand_id'))
      : null;

  const cardRef = useRef<HTMLDivElement | null>(null);
  const { filter, brand } = useSelector((state: RootState) => state);
  const { startDate, endDate } = filter.dates;
  const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false);
  const [isReadyToFetchMore, setIsReadyToFetchMore] = useState<boolean>(false);

  // for each search update, reset cursor and set new dates
  useEffect(() => {
    setIsReadyToFetch(true);
  }, [search, filter.dates, brand.filterOn]);

  // *** I just changed the fetch fn and getFetchMore fn
  // *** Next, need to make it cooperate with infinite scoll system
  // ??  Then implement SSR w/ initial data in useQuery hook

  const {
    data: results,
    isLoading,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    [
      'popular-search-infinite',
      { search, filter, brand, filterOn: brand.filterOn },
    ],
    async (str, id, pageCursor = 1) =>
      await browseResults(search, filter, pageCursor),
    {
      enabled: isReadyToFetch && (!brandId || (brandId && brand.id !== 0)),
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      keepPreviousData: true,
      getFetchMore: last => last.nextPage,
    }
  );

  const initNextChunkFetch = async (cursor?: number) => {
    await fetchMore(cursor ? cursor : undefined);
    setIsReadyToFetchMore(true);
  };

  useEffect(() => {
    if (results) setIsReadyToFetchMore(true);
  }, [results]);

  useScrollPosition(
    ({ currPos }) => {
      if (startDate && endDate) {
        if (!isFetchingMore && !isLoading && results) {
          if (
            currPos.y < window.innerHeight &&
            isReadyToFetchMore &&
            canFetchMore
          ) {
            initNextChunkFetch();
            setIsReadyToFetchMore(false);
          }
        }
      }
    },
    [results, isReadyToFetchMore],
    cardRef
  );

  return {
    // useInfiniteQuery
    results,
    isFetchingMore,
    cardRef,

    // redux state
    filter,
    brand,
  };
};

export default usePopularSearchScrollQuery;
