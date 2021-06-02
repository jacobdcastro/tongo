import React from 'react';
import { isXanoVenue } from '../../../../lib/listings';
import ResultsCard from '../CategoryCarouselCard';
import { useWindowWidth } from 'window-dimensions-hooks';
import SeeAllCard from '../SeeAllCard';
import { XanoListing } from '../../../../@types/apiTypes/listing';

const GenerateCards = ({
  listings,
}: {
  listings: XanoListing[];
}): JSX.Element => {
  return (
    <>
      {listings.map((listing, i) => {
        if (
          (listing && listing.venue_id !== 0 && i < 6) ||
          isXanoVenue(listing)
        )
          return <ResultsCard key={i} data={listing} />;
      })}
      {/* {viewportWidth <= 768 && <SeeAllCard path={`/explore?item=${data.id}`} />} */}
    </>
  );
};

export default GenerateCards;
