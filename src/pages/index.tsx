import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getAllPopularSearches } from '../lib/popularSearches';
import { PopularSearch } from '../@types/apiTypes/popularSearch';
import Home from '../components/pages/ssr/Home';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../@types/redux';
import { removePopularSearch } from '../redux/actions/search';
import useQueryCount from '../hooks/useQueryCount';
import Head from 'next/head';
import popularSearches from '../../data/popular-searches';

// interface PropTypes {
//   data: PopularSearch[];
// }

const Index = (): JSX.Element => {
  const { search, brand } = useSelector((state: RootState) => state);
  const counter = useQueryCount();
  const dispatch = useDispatch();
  const brandId =
    typeof localStorage !== 'undefined'
      ? parseInt(localStorage.getItem('brand_id'))
      : null;

  useEffect(() => {
    if (search !== null) dispatch(removePopularSearch());
  }, [dispatch, search]);

  // * hard-coded handler to skip hidden popular search
  useEffect(() => {
    if (counter.queryCount === 2) {
      counter.handleQueryCompletion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter.queryCount]);

  return (
    <>
      <Head>
        <title>{`Trusted Recommendations & VIP Experiences${
          brand.id !== 0 ? ' from ' + brand.name : ''
        } | TONGO`}</title>
      </Head>
      <Home
        data={popularSearches}
        brandId={brandId}
        carouselQueryCounter={counter}
      />
    </>
  );
};

export default Index;

// // * This gets called on every request (as SSR page)
// export const getServerSideProps: GetServerSideProps = async () => {
//   // Fetch data from Xano API
//   const popularSearches = await getAllPopularSearches();

//   // Pass data to the page via props
//   return { props: { data: popularSearches } };
// };
