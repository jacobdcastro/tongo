import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getAllPopularSearches } from '../src/lib/popularSearches';
import { PopularSearch } from '../src/@types/apiTypes/popularSearch';
import SsrPage from '../src/components/layout/SsrPage';
import HeroBanner from '../src/components/general/HeroBanner';
import CategoryCarouselSectionTest from '../src/components/general/carousels/test/CarouselTest';

interface PropTypes {
  data: PopularSearch[];
}

const CarouselTest = (props: PropTypes): JSX.Element => {
  const [state] = useState(props.data.find(p => p.id === 1));
  return (
    <SsrPage>
      <HeroBanner />
      <div>
        <CategoryCarouselSectionTest key={state.id} data={state} />
      </div>
    </SsrPage>
  );
};

export default CarouselTest;

// * This gets called on every request (as SSR page)
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from Xano API
  const popularSearches = await getAllPopularSearches();

  // Pass data to the page via props
  return { props: { data: popularSearches } };
};
