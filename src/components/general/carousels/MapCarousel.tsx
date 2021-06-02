import React from 'react';
import useCarousel from '../../../hooks/useCarousel';
import Carousel from './Carousel';
import MapCarouselCard from './MapCarouselCard';
import { XanoListing } from '../../../@types/apiTypes/listing';

interface PropTypes {
  listings: XanoListing[];
}

const MapCarousel = ({ listings }: PropTypes): JSX.Element => {
  const { state, handlers } = useCarousel(300, listings.length);

  return (
    <Carousel
      {...handlers}
      listingNum={listings.length}
      translateVal={state.currentTranslateVal}
      changeVal={state.changeVal}
      isMap
    >
      {/* {listings.map((listing, i) => {
        if (listing._venue !== null && listing._venue.name.length > 0) {
          return <MapCarouselCard key={i} data={listing} />;
        }
      })} */}
    </Carousel>
  );
};

export default MapCarousel;
