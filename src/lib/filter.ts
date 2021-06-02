import { ReactDatesObj } from '../@types/state';
import moment from 'moment';

export type DateFilterFunction = () => ReactDatesObj;

export type QuickFilterOption = {
  label: string;
  getNewDates: DateFilterFunction;
};

const dateFilterNow: DateFilterFunction = () => ({
  startDate: parseInt(moment().format('x')),
  endDate: null,
  label: 'Now',
});

const dateFilterToday: DateFilterFunction = () => ({
  startDate: parseInt(moment().format('x')),
  endDate: null,
  label: 'Today',
});

export const dateFilterTomorrow: DateFilterFunction = () => ({
  startDate: parseInt(
    moment()
      .day(moment().day() + 1)
      .format('x')
  ),
  endDate: null,
  label: 'Tomorrow',
});

const dateFilterThisWeek: DateFilterFunction = () => ({
  startDate: parseInt(moment().format('x')),
  endDate: parseInt(moment().add(7, 'day').format('x')),
  label: 'This Week',
});

const dateFilterThisWeekend: DateFilterFunction = () => {
  const weekendDays = [0, 5, 6];
  return {
    startDate: parseInt(
      weekendDays.includes(moment().day())
        ? moment().format('x')
        : moment().day(5).format('x')
    ),
    endDate: parseInt(
      moment().day() === 7 ? null : moment().day(7).format('x')
    ),
    label: 'This Weekend',
  };
};

const dateFilterNextWeek: DateFilterFunction = () => ({
  startDate: parseInt(moment().day(7).format('x')),
  endDate: parseInt(moment().day(14).format('x')),
  label: 'Next Week',
});

export const quickFilterOptions: QuickFilterOption[] = [
  { label: 'Now', getNewDates: dateFilterNow },
  { label: 'Today', getNewDates: dateFilterToday },
  { label: 'Tomorrow', getNewDates: dateFilterTomorrow },
  { label: 'This Week', getNewDates: dateFilterThisWeek },
  { label: 'This Weekend', getNewDates: dateFilterThisWeekend },
  { label: 'Next Week', getNewDates: dateFilterNextWeek },
];
