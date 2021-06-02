import React, { useState, useEffect } from 'react';
import { PopularSearch } from '../../../../@types/apiTypes/popularSearch';
import { FilterState } from '../../../../@types/state';
import { UseQueryCountReturn } from '../../../../hooks/useQueryCount';
import VenueCard from '../../../general/cards/VenueCard';

interface PropTypes {
  data: PopularSearch;
  filter: FilterState;
  featuredCounter: UseQueryCountReturn;
}

const FeaturedVenuesChunk = ({
  data,
  filter,
  featuredCounter,
}: PropTypes): JSX.Element => {
  const [featuredVenues, setFeaturedVenues] = useState([, , ,]);

  useEffect(() => {
    if (data) {
      setFeaturedVenues(data.featured_venues);
    }
  }, [data, filter]);

  return (
    <>
      {featuredVenues.map((id, index) => (
        <VenueCard
          key={index}
          data={{ id, index }}
          dates={filter.dates}
          searchId={data.id}
          counter={{
            queryCount: featuredCounter.queryCount,
            handleQueryCompletion: featuredCounter.handleQueryCompletion,
            resetCount: featuredCounter.resetCount,
          }}
          isFullWidth
        />
      ))}
    </>
  );
};

export default FeaturedVenuesChunk;
