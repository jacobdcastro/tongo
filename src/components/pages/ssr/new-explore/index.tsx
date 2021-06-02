/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import HeroBanner from '../../../general/HeroBanner';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { applyPopularSearch } from '../../../../redux/actions/search';
import { PopularSearch } from '../../../../@types/apiTypes/popularSearch';
import ResultsCardSkeleton from '../../../general/cards/LoadingCard';
import usePopularSearchScrollQuery from '../../../../hooks/useNewPopSearchScrollQuery';
import ResultsChunk from './ResultsChunk';
import popularSearches from '../../../../../data/popular-searches';
import useQueryCount from '../../../../hooks/useQueryCount';
import ResultsLayout from './ResultsLayout';
import FeaturedVenuesChunk from './FeaturedVenuesChunk';

interface PropTypes {
  data: PopularSearch;
}

const ExploreResults = ({ data }: PropTypes): JSX.Element => {
  const {
    results,
    isFetchingMore,
    cardRef,
    filter,
    brand,
  } = usePopularSearchScrollQuery(data);

  const dispatch = useDispatch();
  const router = useRouter();
  const totalResultsLength = useMemo(() => results && results.flat().length, [
    results,
  ]);
  const featuredCounter = useQueryCount();
  const indexToFetchMore = useMemo(
    () =>
      results &&
      (totalResultsLength < 7
        ? totalResultsLength - 1
        : totalResultsLength - 5),
    [results]
  );

  if (results) console.log(results);

  useEffect(() => {
    // * TEMPORARY SOLUTION
    featuredCounter.resetCount();

    // if url query is valid and returns data, save to Redux store
    // otherwise, redirect back home
    if (data.id > popularSearches.length || data.id === 0) router.push('/');
    else dispatch(applyPopularSearch(data));

    // if (!data) router.push('/');
    // if (data) dispatch(applyPopularSearch(data));
  }, [data]);

  return (
    <>
      <HeroBanner title={data.name} />
      <ResultsLayout>
        <FeaturedVenuesChunk
          data={data}
          filter={filter}
          featuredCounter={featuredCounter}
        />

        {!results ? (
          <>
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
          </>
        ) : (
          results.map((chunk, i) => (
            <ResultsChunk
              key={i}
              chunk={chunk}
              previousChunksLength={totalResultsLength - chunk.length}
              filter={filter}
              indexToFetchMore={indexToFetchMore}
              cardRef={cardRef}
              dateFetched={datesToFetch[i]}
            />
          ))
        )}
        {isFetchingMore && (
          <>
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
            <ResultsCardSkeleton isFullWidth />
          </>
        )}
      </ResultsLayout>
    </>
  );
};

export default ExploreResults;
