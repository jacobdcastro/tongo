import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { StartEndDates, XanoListing } from '../@types/apiTypes/listing';
import moment from 'moment';
import { XanoVenue } from '../@types/apiTypes/venue';
import { findTodayObj, createTodayMomentFromTimeString } from './dates';
import { ReactDatesObj } from '../@types/state';
import {
  sortForAllDays,
  sortForDateRange,
  sortForOneDay,
  sortGreaterLesser,
} from './sort';
import { XanoListingOrVenue } from '../@types/apiTypes/xanoGeneral';

export const getAllListings = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/listing',
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getAllListings()', error.response);
    return error;
  }
};

export const getListingById = async (id: number): Promise<XanoListing> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/listing/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getListingById()', error.response);
    return error;
  }
};

export const getListingCardById = async (id: number): Promise<XanoListing> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:5deb20/listing/card/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getListingById()', error.response);
    return error;
  }
};

export const removeDuplicateResults = (
  allResults: XanoListingOrVenue[]
): XanoListingOrVenue[] => {
  const arr = allResults.flat();
  const filteredResultsArr = Array.from(
    new Set(arr.map(a => (isXanoVenue(a) ? a.name : a.title)))
  ).map(str => {
    return arr.find(a => (isXanoVenue(a) ? a.name === str : a.title === str));
  });
  return filteredResultsArr;
};

// checks if item is of type XanoVenue
export const isXanoVenue = (item: XanoListingOrVenue): item is XanoVenue => {
  return (item as XanoVenue).name !== undefined;
};

export const createUpcomingListings = (
  listings: XanoListingOrVenue[]
): XanoListingOrVenue[] => {
  return listings.flatMap(listing => {
    if (listing === undefined) return;
    if (isXanoVenue(listing) || listing.recurring.type === '') return listing;
    return listing.upcoming_dates.map(dates => new XanoListing(listing, dates));
  });
};

// * FILTER ALREADY APPLIED
export const sortUpcomingResults = (
  results: XanoListingOrVenue[],
  dates?: ReactDatesObj,
  length?: number
): XanoListingOrVenue[] => {
  const { startDate, endDate } = dates;

  // separate venues and listings
  const venues: XanoVenue[] = results.filter(item => isXanoVenue(item));
  const listings: XanoListing[] = results.filter(item => !isXanoVenue(item));

  if (listings.length > 1)
    listings.sort((a, b) => a.start_date_time - b.start_date_time);

  // FILTER for all days (no filter applied)
  if (!startDate) {
    const sorted = sortForAllDays(listings, venues, dates);
    return length !== undefined ? sorted.slice(0, length) : sorted;
  }

  // FILTER for one day (filter applied)
  if (startDate && !endDate) {
    const sorted = sortForOneDay(listings, venues, dates);
    return length !== undefined ? sorted.slice(0, length) : sorted;
  }

  if (startDate && endDate) {
    const sorted = sortForDateRange(listings, venues, dates);
    return length !== undefined ? sorted.slice(0, length) : sorted;
  }
};
