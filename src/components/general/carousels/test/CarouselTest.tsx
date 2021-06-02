import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useWindowWidth } from 'window-dimensions-hooks';
import { PopularSearch } from '../../../../@types/apiTypes/popularSearch';
import useCarousel from '../../../../hooks/useCarousel';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../@types/redux';
import { checkAllCriteria } from '../../../../lib/filterCheck';
import CategorySection from '../CategorySection';
import Loader from '../../Loader';
import Carousel from '../Carousel';
import GenerateCards from './generate';

import { useSpring, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { clamp } from 'lodash';
import useCarouselTest from '../../../../hooks/useCarouselTest';

interface PropTypes {
  data: PopularSearch;
}

const CategoryCarouselSection = ({ data }: PropTypes): JSX.Element => {
  const [filteredListings, setFilteredListings] = useState([]);
  const { bind, x } = useCarouselTest(filteredListings.length);
  const { isLoading, data: listings } = useQuery(data.name, () =>
    axios({ method: 'POST', url: 'api/search/fetch', data })
  );
  const { filter, search, brand } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (listings && filter && brand) {
      const hi = listings.data.map(listing => {
        if (checkAllCriteria(listing, filter, brand)) {
          return listing;
        }
      });
      setFilteredListings([...hi]);
    }
  }, [listings, filter, search, brand]);

  if (isLoading) return <Loader />;
  return (
    <CategorySection>
      <div className="scrollArea">
        <animated.div
          {...bind()}
          style={{
            transform: interpolate([x], x => `translateX(${x}px)`),
          }}
        >
          <Carousel id="carousel" listingNum={listings.data.length}>
            <GenerateCards listings={filteredListings} />
          </Carousel>
        </animated.div>
      </div>
    </CategorySection>
  );
};

export default CategoryCarouselSection;
