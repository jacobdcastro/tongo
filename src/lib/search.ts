import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import { XanoListing } from '../@types/apiTypes/listing';
import { getListingsByCategoryId } from './categories';
import { PopularSearch } from '../@types/apiTypes/popularSearch';
import { getAllListings, isXanoVenue } from './listings';
import { getAllVenues } from './venues';
import { XanoVenue } from '../@types/apiTypes/venue';
import { getDistance } from './geocode';
import { LatLng } from '../@types/apiTypes/geocode';
import { BrandState, ReactDatesObj } from '../@types/state';
import { getAllSubcategories } from './subcategories';
import { XanoSubcategory } from '../@types/apiTypes/subcategoriy';
import { VenueHours, XanoListingOrVenue } from '../@types/apiTypes/xanoGeneral';
import { start } from 'repl';
import { createMomentFromTimeString } from './dates';

const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const getPopularSearchById = async (
  id: number
): Promise<PopularSearch> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://x608-3b7f-b1ce.n7.xano.io/api:704ee1/popular_search/${id}`,
    });
    return res.data;
  } catch (error) {
    console.error('FUNCTION: getPopularSearchById()', error.response);
  }
};

export const listingIsWithinDateRange = (
  dates: ReactDatesObj,
  listingStartDate: number | Date,
  listingEndDate: number | Date
): boolean => {
  // only run check if date of event has not passed
  if (moment().isBefore(moment(listingEndDate))) {
    // no dates selected (all are visible)
    if (dates.startDate === null) return true;

    // single day selected w/o date range
    if (dates.endDate === null) {
      // console.log({
      //   dates,
      //   listingStartDate,
      //   listingEndDate,
      //   isSameDay: moment(listingStartDate).isSame(
      //     moment(dates.startDate),
      //     'day'
      //   ),
      // });
      return moment(listingStartDate).isSame(moment(dates.startDate), 'day');
    }
    // determines whether event is within date range
    if (dates.endDate && dates.startDate) {
      return moment(listingStartDate).isBetween(
        moment(dates.startDate),
        moment(dates.endDate),
        'day',
        '[]'
      );
    }
  }
  // return `false` if event is in past
  return false;
};

export const venueIsWithinDateRange = (
  dates: ReactDatesObj,
  times: VenueHours,
  name?: string
): boolean => {
  const { startDate, endDate } = dates;

  // check if venue is closed
  const nowIsAfterClosing = todaysHours => {
    const todaysOpeningMoment = createMomentFromTimeString(
      todaysHours.open,
      moment()
    );
    const todaysClosingMoment = createMomentFromTimeString(
      todaysHours.close,
      moment()
    );
    if (todaysClosingMoment.isBefore(todaysOpeningMoment))
      todaysClosingMoment.add(1, 'day');
    return moment().isAfter(todaysClosingMoment);
  };

  if (startDate === null || moment(startDate).isSame(moment(), 'day')) {
    const todaysHours = times.find(
      item => moment().format('dddd').toLowerCase() === item.day
    );
    if (!todaysHours) return false;
    return nowIsAfterClosing(todaysHours) ? false : true;
  } else if (startDate && !endDate) {
    const day = moment(startDate).format('dddd').toLowerCase();
    const find = times.find(item => item.day === day);
    const some = times.some(item => item.day === day);
    // console.log({ find, some });
    return times.some(item => item.day === day);
  } else if (startDate && endDate) {
    const dur = moment(endDate).diff(startDate, 'days');
    for (let i = 0; i <= dur; i++) {
      const newDay = moment(startDate).add(i, 'day');
      const daysHours = times.find(
        item => item.day === moment(newDay).format('dddd').toLowerCase()
      );
      // if (i === 0) console.log({ times, newDay });
      if (daysHours) {
        const closingMoment = createMomentFromTimeString(
          daysHours.close,
          newDay
        );
        if (moment().isAfter(closingMoment, 'minute')) return false;
        return true;
      }
    }
    return false;
  }
};

export const passesBrandFilter = (
  id: number,
  brand: BrandState,
  filterOn: boolean
): boolean => {
  if (brand.id === 0) return true;
  if (!filterOn) return true;
  const isApproved = brand.approved_venues.some(
    ({ venue_id }) => venue_id === id
  );
  return isApproved;
};

export const isInTimeOfDay = (
  timeOfDay: {
    anytime: boolean;
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  },
  listingStartDate: number | Date
): boolean => {
  const { anytime, morning, afternoon, evening } = timeOfDay;
  const hour = moment(listingStartDate).hour();

  if (anytime) return true;
  if (morning && hour > 3 && hour < 12) return true;
  if (afternoon && hour >= 12 && hour < 17) return true;
  if (evening && hour >= 17 && hour <= 23) return true;

  // return `false` if event is in past
  return false;
};

export const isWithinDistance = (): boolean => true;

export const isInPopularSearch = (): boolean => true;

export const getSearchedListingsAndVenues = async (
  obj: PopularSearch,
  coords?: LatLng
) => {
  const get = async id => {
    const d = await getListingsByCategoryId(id);
    return d._listings_of_category;
  };
  const catIds = obj.categories.map(cat => cat.category_id);
  const subcatIds = obj.subcategories.map(subcat => subcat.subcategory_id);
  const searchedListings: XanoListingOrVenue[] = [];
  try {
    const allVenues: XanoVenue[] = await getAllVenues();
    const allSubcategories: XanoSubcategory[] = await getAllSubcategories();

    // get & filter venues by subcategory
    if (obj.subcategories.length > 0) {
      const arr: XanoVenue[] = [];
      allVenues.forEach((venue: XanoVenue) => {
        const passes = venue.subcategories.some(i => {
          if (i === null || i.subcategory_id === 0) return false;
          return subcatIds.includes(i.subcategory_id);
        });
        if (passes) arr.push(venue);
      });

      // add 'type' field to each venue
      const arrWithTypeField = arr.map(venue => {
        venue.type = 'venue';
        return venue;
      });

      searchedListings.push(...arrWithTypeField);
    }

    // for each venue
    // 1. look at subcategories,
    // 2. see if any subcatgories of venue match category id
    // 3. if match, add venue to array
    // get venues by category
    if (obj.categories.length > 0) {
      const venuesByCategory = allVenues.filter(venue => {
        const _subcatIds: number[] = venue.subcategories
          .map(
            subcat =>
              subcat !== null &&
              subcat.subcategory_id !== 0 &&
              subcat.subcategory_id
          )
          .filter(subcat => subcat > 0);

        return _subcatIds.some(subcatId => {
          const subcategory = allSubcategories.find(s => s.id === subcatId);
          const catId = subcategory.category_id;
          return catIds.includes(catId);
        });
      });

      // add 'type' field to each venue
      const arrWithTypeField = venuesByCategory.map(venue => {
        venue.type = 'venue';
        return venue;
      });

      searchedListings.push(...arrWithTypeField);
    }

    // get & filter listings by subcategory
    if (obj.subcategories.length > 0) {
      const allListings = await getAllListings();
      const arr = [];
      await allListings.forEach((listing: XanoListing) => {
        const passes = listing.subcategories.some(
          i => i.subcategory_id !== 0 && subcatIds.includes(i.subcategory_id)
        );
        if (passes) arr.push(listing);
      });

      searchedListings.push(...arr);
    }

    // get listings by category
    if (obj.categories.length > 1) {
      const arr = await Promise.all(
        obj.categories.map(async cat => get(cat.category_id))
      );

      searchedListings.push(...[...arr.flat()]);
    } else if (obj.categories.length === 1) {
      const arr = await get(obj.categories[0].category_id);
      searchedListings.push(...arr);
    }

    // const hi = Promise.all(
    //   searchedListings.map(async listing => {
    //     const umm = await getDistance(coords, listing._venue.address1);
    //     console.log({ umm });
    //     return listing;
    //   })
    // );
    // console.log({ hi });

    return searchedListings;
  } catch (error) {
    console.error('FUNCTION: getSearchedListingsAndVenues()', error.response);
    return error;
  }
};
