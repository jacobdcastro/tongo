import React from 'react';
import { PopularSearch } from '../../../@types/apiTypes/popularSearch';
import CategoryCarouselSection from '../../general/carousels/CategoryCarouselSection';
import SsrPage from '../../layout/SsrPage';
import HeroBanner from '../../general/HeroBanner';
import { UseQueryCountReturn } from '../../../hooks/useQueryCount';

interface PropTypes {
  data: PopularSearch[];
  brandId: number;
  carouselQueryCounter?: UseQueryCountReturn;
}

const Home = (props: PropTypes): JSX.Element => {
  return (
    <SsrPage>
      <HeroBanner />
      <div>
        {props.data
          .sort((a, b) => a.id - b.id)
          .map((popularSearch, i) =>
            popularSearch.id === 3 ? null : (
              <CategoryCarouselSection
                key={popularSearch.id}
                carouselIndex={i}
                data={popularSearch}
                brandId={props.brandId}
                carouselQueryCounter={props.carouselQueryCounter}
              />
            )
          )}
      </div>
    </SsrPage>
  );
};

export default Home;
