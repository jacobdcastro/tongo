import moment from 'moment';
import { XanoRecurringObj } from '../@types/apiTypes/listing';
const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

type PopulateParams = {
  start: Date | number;
  end: Date | number;
  recurring: XanoRecurringObj;
};
type UpcomingDateObj = {
  start_date_time: number | Date;
  end_date_time: number | Date;
};
type PopulateFn = (data: PopulateParams) => void | UpcomingDateObj[];

export const populateUpcomingDates: PopulateFn = data => {
  const { type } = data.recurring;
  if (type === 'weekly') return createDatesWeekly(data);
  // if (type === 'monthly') return createDatesMonthly(data);
  // if (type === 'yearly') return createDatesYearly(data);
  return [{ start_date_time: Date.now(), end_date_time: Date.now() }];
};

export const createDatesWeekly: PopulateFn = (data: PopulateParams) => {
  const { weekly } = data.recurring;
  const upcomingDates = [];
  const validDays = [];

  // create array of days of the week by index
  for (const day in weekly) {
    if (weekly[day] === true) validDays.push(days.indexOf(day));
  }

  // create dates 6 months (26 weeks) ahead
  for (let i = 0; i < 26; i++) {
    // add 7 days for every week assigned
    const weekMultiplier = i * (7 * weekly.weeks);
    validDays.forEach(d => {
      const start = moment(data.start);
      const end = moment(data.end);
      const duration = end.day() - start.day();

      const start_date_time = parseInt(
        start.day(d + weekMultiplier).format('x')
      );
      // if event ends on different day, add duration of days to end_date_time
      const end_date_time = parseInt(
        end.day(d + weekMultiplier + duration).format('x')
      );

      if (moment(start_date_time).isSameOrAfter(moment()))
        upcomingDates.push({
          start_date_time,
          end_date_time,
        });
    });
  }
  return upcomingDates.sort((a, b) => a.start_date_time - b.start_date_time);
};

// export const createDatesMonthly: PopulateFn = (data: PopulateParams) => {};

// export const createDatesYearly: PopulateFn = (data: PopulateParams) => {};
