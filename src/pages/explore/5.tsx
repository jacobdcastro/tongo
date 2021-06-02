import Head from 'next/head';
import React, { useState } from 'react';
import SsrPage from '../../components/layout/SsrPage';
import popularSearches from '../../../data/popular-searches';
import { useSelector } from 'react-redux';
import { RootState } from '../../@types/redux';
import ExploreResults from '../../components/pages/ssr/explore';

const Explore1 = (): JSX.Element => {
  const [data] = useState(popularSearches[4]);
  const brand = useSelector((state: RootState) => state.brand);

  return (
    <SsrPage>
      <Head>
        <title>{`${data ? data.name : ''} Recommendations ${
          brand.id !== 0 ? `from ${brand.name}` : 'in Santa Barbara'
        }`}</title>
      </Head>

      <ExploreResults data={data} />
    </SsrPage>
  );
};

export default Explore1;

// * This gets called on every request (as SSR page)
// export const getServerSideProps: GetServerSideProps = async ctx => {
//   // TODO Fetch data from Xano API
//   // const popularSearch = await getPopularSearchById(parseInt(ctx.query.item));

//   const mockFetchPopularSearch = async (id: number) => popularSearches[id - 1];
//   const data = await mockFetchPopularSearch(parseInt(ctx.params.id));

//   // Pass data to the page via props
//   return {
//     props: {
//       data,
//       query: ctx.query,
//     },
//   };
// };
