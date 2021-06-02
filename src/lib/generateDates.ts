/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { getAllListings } from './listings';
import { XanoListing } from '../@types/apiTypes/listing';
import { populateUpcomingDates } from './recurring';

async function generateDates(): Promise<XanoListing[]> {
  const listings = await getAllListings();
  await listings.forEach(async (listing: XanoListing) => {
    const upcoming_dates = populateUpcomingDates({
      start: listing.start_date_time,
      end: listing.end_date_time,
      recurring: listing.recurring,
    });

    await axios({
      method: 'POST',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/listing/${listing.id}`,
      data: { ...listing, upcoming_dates },
    });
  });

  return listings;
}

export default generateDates;
