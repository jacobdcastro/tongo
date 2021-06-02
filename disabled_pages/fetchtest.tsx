import React, { useEffect, useState } from 'react';
import { XanoListing } from '../src/@types/apiTypes/listing';
import { XanoVenue } from '../src/@types/apiTypes/venue';
import {
  createUpcomingListings,
  getAllListings,
  getListingById,
} from '../src/lib/listings';
import { populateUpcomingDates } from '../src/lib/recurring';
import { getAllVenues } from '../src/lib/venues';
import moment from 'moment';
import generateDates from '../src/lib/generateDates';

const Fetchtest = () => {
  // const [state, setState] = useState<XanoListing>();

  const fetch = async () => {
    // generateDates();
    const listing = await getListingById(19);
    console.log(listing);
  };

  useEffect(() => {
    fetch();
  }, []);

  return <div></div>;
};

export default Fetchtest;
