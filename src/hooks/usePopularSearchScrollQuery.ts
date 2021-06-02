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
import { browseListings } from '../lib/browse';

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

const usePopularSearchScrollQuery = (
  search: PopularSearch,
  maxLength?: number
) => {
  const brandId =
    typeof localStorage !== 'undefined'
      ? parseInt(localStorage.getItem('brand_id'))
      : null;

  const cardRef = useRef<HTMLDivElement | null>(null);
  const { filter, brand } = useSelector((state: RootState) => state);
  const { startDate, endDate } = filter.dates;

  const [cursor, setCursor] = useState<number>(0);
  const [datesToFetch, setDatesToFetch] = useState<number[]>([]);
  const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false);
  const [isReadyToFetchMore, setIsReadyToFetchMore] = useState<boolean>(false);

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
    setCursor(0);
    setDatesToFetch(getDatesToFetch());
    setIsReadyToFetch(true);
  }, [search, filter.dates, brand.filterOn]);

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
      await browseListings(search, filter, pageCursor),
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
    if (results) {
      setIsReadyToFetchMore(true);
      if (
        results.length === 1 &&
        (maxLength ? results[0].length <= maxLength : results[0].length < 7)
      ) {
        if (startDate && !endDate) {
          setDatesToFetch(prev => [
            ...prev,
            parseInt(
              moment(prev[prev.length - 1])
                .add(1, 'day')
                .format('x')
            ),
          ]);
          initNextChunkFetch(1);
        } else if (startDate && endDate) {
          // if first day's results are less than 7, fetch next day's automatically
          initNextChunkFetch();
        }
      }
    }
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

    // array of dates to be fetched
    datesToFetch,
  };
};

export default usePopularSearchScrollQuery;
