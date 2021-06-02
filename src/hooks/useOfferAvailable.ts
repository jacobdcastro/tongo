import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { XanoVenue } from '../@types/apiTypes/venue';
import { RootState } from '../@types/redux';

const useOfferAvailable = (venue: XanoVenue): boolean => {
  const [offerIsAvailable, setOfferIsAvailable] = useState<boolean>(false);
  const brand = useSelector((state: RootState) => state.brand);

  useEffect(() => {
    if (
      venue &&
      venue._offer_of_venue &&
      venue._offer_of_venue.length > 0 &&
      brand.id !== 0 &&
      brand.approved_venues.length > 0
    ) {
      const venueIsApproved = brand.approved_venues.some(
        v => v.venue_id === venue.id
      );
      setOfferIsAvailable(venueIsApproved && brand.filterOn);
    }
  }, [brand, venue]);

  return offerIsAvailable;
};

export default useOfferAvailable;
