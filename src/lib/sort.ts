import { shuffle } from 'lodash';
import { XanoListing } from '../@types/apiTypes/listing';
import { XanoVenue } from '../@types/apiTypes/venue';
import { XanoListingOrVenue } from '../@types/apiTypes/xanoGeneral';
import { SortResultsFunction } from '../@types/sortResultsFunction';

export const sortGreaterLesser = (
  listings: XanoListing[],
  venues: XanoVenue[]
): {
  lesserArr: XanoListing[] | XanoVenue[];
  greaterArr: XanoListing[] | XanoVenue[];
} => {
  if (listings.length > venues.length) {
    return {
      greaterArr: listings,
      lesserArr: venues,
    };
  } else {
    return {
      greaterArr: venues,
      lesserArr: listings,
    };
  }
};

// utilizes closures
const sortedResultHelper = (
  arr1: XanoVenue[] | XanoListing[],
  arr2: XanoVenue[] | XanoListing[]
): [() => void, () => void, XanoListingOrVenue[]] => {
  let _counter1 = 0;
  let _counter2 = 0;
  const sortedResults: XanoListingOrVenue[] = [];
  return [
    () => {
      if (_counter1 < arr1.length) {
        sortedResults.push(arr1[_counter1]);
        _counter1++;
      }
    },
    () => {
      if (_counter2 < arr2.length) {
        sortedResults.push(arr2[_counter2]);
        _counter2++;
      }
    },
    sortedResults,
  ];
};

export const sortForAllDays: SortResultsFunction = (listings, venues) => {
  const { greaterArr, lesserArr } = sortGreaterLesser(listings, venues);
  const totalLength = venues.length + listings.length;
  const totalLengthQuotient = Math.floor(totalLength / (lesserArr.length + 1));

  const lesserPositions: number[] =
    lesserArr.length > 0
      ? greaterArr.map((l, i) => (i + 1) * totalLengthQuotient - 5)
      : greaterArr.map((l, i) => i + 1);

  const [addLesser, addGreater, sortedResults] = sortedResultHelper(
    greaterArr,
    lesserArr
  );
  for (let i = 0; i < totalLength; i++) {
    lesserPositions.includes(i) ? addLesser() : addGreater();
  }

  return sortedResults;
};

export const sortForOneDay: SortResultsFunction = (listings, venues) => {
  const { greaterArr, lesserArr } = sortGreaterLesser(listings, venues);
  const totalLength = venues.length + listings.length;
  const totalLengthQuotient = Math.floor(totalLength / (lesserArr.length + 1));
  const lesserPositions: number[] =
    lesserArr.length > 0
      ? greaterArr.map((l, i) => (i + 1) * totalLengthQuotient)
      : greaterArr.map((l, i) => i + 1);

  // console.log({ greaterArr, lesserArr, lesserPositions });
  const [addLesser, addGreater, sortedResults] = sortedResultHelper(
    lesserArr,
    greaterArr
  );

  if (lesserArr.length > 0) {
    for (let i = 0; i < totalLength; i++) {
      lesserPositions.includes(i) ? addLesser() : addGreater();
    }
    return sortedResults;
  } else {
    return greaterArr;
  }
};

export const sortForDateRange: SortResultsFunction = (listings, venues) => {
  if (listings.length === 0) return venues;
  if (venues.length === 0) return listings;
  const { greaterArr, lesserArr } = sortGreaterLesser(listings, venues);
  const totalLength = venues.length + listings.length;
  const totalLengthQuotient = Math.floor(totalLength / (lesserArr.length + 1));

  const lesserPositions: number[] =
    lesserArr.length > 0
      ? greaterArr.map((l, i) => (i + 1) * totalLengthQuotient)
      : greaterArr.map((l, i) => i + 1);

  // console.log({ listings, venues, totalLength });
  // console.log({ greaterArr, lesserArr });

  const [addLesser, addGreater, sortedResults] = sortedResultHelper(
    lesserArr,
    greaterArr
  );
  // console.log('1', sortedResults);
  for (let i = 0; i < totalLength; i++) {
    lesserPositions.includes(i) ? addLesser() : addGreater();
  }
  // console.log('2', sortedResults);

  return sortedResults;
};

// ! ==============================================================
// ! ==============================================================
// TODO create array of arrays of listings occuring on same day

// ? [[nov3rd,nov3rd,nov3rd], [nov4th,nov4th,nov4th], [nov5th,nov5th,nov5th]]

// * Then use different functions above to sort each one differently
// - For one day, 8 venues for each listing shown
// - For date range, use quotient formula
// - For all days, place 10 venues for each listing in first 3 days, then exponentially decrease amount of venues shown until none left, then rest of listings shown
