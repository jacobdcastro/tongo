/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import HeroBanner from '../src/components/general/HeroBanner';
import SsrPage from '../src/components/layout/SsrPage';
import { GetServerSideProps } from 'next';
import { NextRouter, useRouter, withRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { applyPopularSearch } from '../src/redux/actions/search';
import { PopularSearch } from '../src/@types/apiTypes/popularSearch';
import ResultsCardSkeleton from '../src/components/general/cards/LoadingCard';
import usePopularSearchScrollQuery from '../src/hooks/usePopularSearchScrollQuery';
import ResultsChunk from '../src/components/pages/ssr/explore/ResultsChunk';
import popularSearches from '../data/popular-searches';
import useQueryCount from '../src/hooks/useQueryCount';
import Head from 'next/head';
import ResultsLayout from '../src/components/pages/ssr/explore/ResultsLayout';
import FeaturedVenuesChunk from '../src/components/pages/ssr/explore/FeaturedVenuesChunk';

interface PropTypes {
  data?: PopularSearch;
  query: { item: string };
  router?: NextRouter;
}

const SearchResult = (): JSX.Element => {
  const router = useRouter();
  const [query, setQuery] = useState<{ item: string }>({
    item: router.asPath[router.asPath.length - 1],
  });
  const [data, setData] = useState<PopularSearch>(
    popularSearches[parseInt(router.asPath[router.asPath.length - 1]) - 1]
  );

  useEffect(() => {
    if (router) console.log(parseInt(router.asPath[router.asPath.length - 1]));
  }, [router]);

  const {
    results,
    isFetchingMore,
    cardRef,
    filter,
    brand,
    datesToFetch,
  } = usePopularSearchScrollQuery(data);
  const dispatch = useDispatch();
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
    <SsrPage>
      <Head>
        <title>{`${data ? data.name : ''} Recommendations ${
          brand.id !== 0 ? `from ${brand.name}` : 'in Santa Barbara'
        }`}</title>
      </Head>

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
    </SsrPage>
  );
};

export default SearchResult;

// * This gets called on every request (as SSR page)
// export const getServerSideProps: GetServerSideProps = async ctx => {
//   // const queryCache = new QueryCache();
//   // await queryCache.prefetchQuery(['popular-search-infinite'], getQuery);

//   // TODO Fetch data from Xano API
//   // const popularSearch = await getPopularSearchById(parseInt(ctx.query.item));

//   // Pass data to the page via props
//   return {
//     props: {
//       // data: popularSearch ? popularSearch : null,
//       query: ctx.query,
//     },
//   };
// };
