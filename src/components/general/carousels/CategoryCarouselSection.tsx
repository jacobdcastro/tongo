import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import useCarousel from '../../../hooks/useCarousel';
import Carousel from './Carousel';
import { BlackWideButton } from '../buttons';
import SeeAllCard from './SeeAllCard';
import { useWindowWidth } from 'window-dimensions-hooks';
import { PopularSearch } from '../../../@types/apiTypes/popularSearch';
import slugify from '../../../lib/slugify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../@types/redux';
import CategorySection from './CategorySection';
import useCarouselTest from '../../../hooks/useCarouselTest';
import { animated, interpolate } from 'react-spring';
import { SearchBarContext } from '../../layout/components/Context/SearchBarContext';
import useQueryCount, {
  UseQueryCountReturn,
} from '../../../hooks/useQueryCount';
import VenueCard from '../cards/VenueCard';

// TODO prevent scroll past beginning/end of carousel

interface PropTypes {
  data: PopularSearch;
  brandId: number;
  carouselQueryCounter?: UseQueryCountReturn;
  carouselIndex?: number;
}

const CategoryCarouselSection = ({
  data,
  brandId,
  carouselQueryCounter,
  carouselIndex,
}: PropTypes): JSX.Element => {
  const viewportWidth = useWindowWidth();
  const { state, handlers, reactDispatch } = useCarousel(245, 10);
  const { queryCount, handleQueryCompletion } = useQueryCount();
  const { filter, brand } = useSelector((state: RootState) => state);
  const { bind, x } = useCarouselTest(4);
  const { popularSearchId, setValueAndPopSearch } = useContext(
    SearchBarContext
  );

  useEffect(() => {
    if (queryCount === 3) {
      carouselQueryCounter.handleQueryCompletion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryCount]);

  // if (!results) return <LoadingCarousel />;
  // if (results.length === 0) return null;

  // if (data.id === 1) {
  //   console.log({ results: results.flat() });
  // }

  return (
    <CategorySection>
      <div className="sectionHeader">
        <h2>{data.name.toUpperCase()}</h2>
      </div>

      <div className="scrollArea">
        <animated.div
          {...bind()}
          style={{ transform: interpolate([x], x => `translateX(${x}px)`) }}
        >
          <Carousel
            id={`${slugify(data.name)}-carousel`}
            listingNum={data.featured_venues.length}
            {...handlers}
          >
            {data.featured_venues.map((id, i) => {
              if (i > 5) return null;
              return (
                <VenueCard
                  key={i}
                  carouselCounter={{
                    counter: carouselQueryCounter,
                    index: carouselIndex,
                  }}
                  counter={{
                    queryCount,
                    handleQueryCompletion,
                  }}
                  data={{ id, index: i }}
                  dates={filter.dates}
                />
              );
            })}
            {viewportWidth <= 768 && (
              <SeeAllCard
                path={{
                  pathname: `/explore/${data.id}`,
                }}
              />
            )}
          </Carousel>
        </animated.div>
      </div>
      <div className="exloreLinkContainer">
        <Link
          href={{
            pathname: `/explore/${data.id}`,
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="exploreLink">
            <BlackWideButton
              onClick={() => {
                setValueAndPopSearch({
                  value: data.name,
                  popularSearchId: data.id,
                });
              }}
              uppercase
            >
              explore all
            </BlackWideButton>
          </a>
        </Link>
      </div>
    </CategorySection>
  );
};

export default CategoryCarouselSection;
