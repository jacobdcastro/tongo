import moment, { Moment } from 'moment';
import { VenueHoursDay, VenueHours } from '../@types/apiTypes/xanoGeneral';
import { ReactDatesObj } from '../@types/state';

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const formatStr = 'ddd MMM Do, hh:mma';

// converts datetime to 00:00/23:59
export const convertTimestampToDate = (
  datetime: number,
  type: 'start' | 'end'
): number => {
  if (type === 'start')
    return parseInt(
      moment(datetime).hour(0).minute(0).millisecond(0).format('x')
    );
  if (type === 'end')
    return parseInt(
      moment(datetime).hour(23).minute(59).millisecond(999).format('x')
    );
};

// converts '19:30' to '7:30 PM'
export const convertTimeString = (time: string): string => {
  if (time.length === 4) time = '0'.concat(time);
  let hourNum = parseInt(time[0] + time[1]);
  const minuteNum = parseInt(time[3] + time[4]);
  let hourStr: string;
  let minuteStr = ':';

  if (minuteNum === 0) minuteStr = '';
  else if (minuteNum < 10) minuteStr += '0' + minuteNum;
  else minuteStr += minuteNum.toString();

  if (hourNum === 0) {
    hourNum = 12;
    minuteStr += ' AM';
  } else if (hourNum === 12) {
    hourNum = 12;
    hourStr = '12';
    minuteStr += ' PM';
  } else if (hourNum > 12 && hourNum < 24) {
    hourNum = hourNum - 12;
    hourStr = hourNum.toString();
    minuteStr += ' PM';
  } else {
    hourStr = hourNum.toString();
    minuteStr += ' AM';
  }

  if (minuteNum === 0) {
    if (hourNum === 12) return '12 PM';
    if (hourNum === 24) return '12 AM';
    if (hourNum === 0) return '12 AM';
  }

  return hourStr + minuteStr;
};

export const createListingHoursString = (
  start_date_time: number,
  end_date_time: number,
  id?: number
): string => {
  const formattedStartTime = convertTimeString(
    moment(start_date_time).format('HH:mm')
  );
  const formattedEndTime = convertTimeString(
    moment(end_date_time).format('HH:mm')
  );

  if (moment(start_date_time).isSame(moment(), 'day')) {
    if (moment().isBetween(moment(start_date_time), moment(end_date_time))) {
      return `Now Til ${formattedEndTime}`;
    }
    return `Today • ${formattedStartTime}`;
  } else if (moment().add(1, 'day').isSame(start_date_time, 'day')) {
    return `Tomorrow • ${formattedStartTime}`;
  }

  // any other date
  return `${moment(start_date_time).format(
    'ddd MMM Do'
  )} • ${formattedStartTime}`;
};

export const findTodayObj = (time: VenueHours): VenueHoursDay =>
  time.find(item => item.day === moment().format('dddd').toLowerCase());

export const findNextOpenDayObj = (
  time: VenueHours,
  startDate?: number
): VenueHoursDay => {
  const dayIndex = startDate ? moment(startDate).day() : moment().day();
  let nextDayObj: VenueHoursDay;
  let i = 1;
  while (!nextDayObj) {
    const day = moment()
      .day(dayIndex + i)
      .format('dddd')
      .toLowerCase();

    const dayHours = time.find(item => item.day === day);

    if (dayHours) {
      nextDayObj = dayHours;
      break;
    }
    i += 1;
  }
  return nextDayObj;
};

export const createVenueHoursString = (time: VenueHours): string => {
  const todayObj = findTodayObj(time);
  if (todayObj)
    return `Open Today from ${convertTimeString(
      todayObj.open
    )} - ${convertTimeString(todayObj.close)}`;
  else return 'Closed Today';
};

// creates moment obj from string "12:35"
export const createMomentFromTimeString = (
  str: string,
  date?: Moment,
  day?: string,
  id?: number
): Moment => {
  const hour = parseInt(str[0] + str[1]);
  const min = parseInt(str[3] + str[4]);

  if (day) {
    const i = days.indexOf(day);
    const dayIndex = i < moment().day() ? i + 7 : i;
    return moment().day(dayIndex).hour(hour).minute(min);
  }

  if (date) {
    return moment(date).hour(hour).minute(min);
  }
};

export const createOpeningClosingMoments = (
  hours: VenueHoursDay,
  id?: number
): Moment[] => {
  const { open, close, day } = hours;
  const openHour = parseInt(open[0] + open[1]);
  const closeHour = parseInt(close[0] + close[1]);

  const openMoment = createMomentFromTimeString(open, null, day, id);

  const openCloseMoments = [
    openMoment,
    closeHour < openHour || closeHour > 23
      ? createMomentFromTimeString(close, null, days[days.indexOf(day) + 1])
      : createMomentFromTimeString(close, null, day),
  ];

  return openCloseMoments;
};

export const createVenueHoursStringForCard = (
  time: VenueHours,
  { startDate, endDate }: ReactDatesObj,
  id?: number,
  dateFetched?: number
): string => {
  // find next open day's hours
  const findNextOpenDaysHours = (): string => {
    const nextOpenDayHours = findNextOpenDayObj(time, dateFetched || null);
    const { open } = nextOpenDayHours;
    const [openingMoment] = createOpeningClosingMoments(nextOpenDayHours, id);
    const formattedOpenTime = convertTimeString(open);
    // if (day === moment().add(1, 'day').format('dddd').toLowerCase()) {
    //   return `OpensTomorrow ${formattedOpenTime}`;
    // }
    return `Closed • Opens ${openingMoment.format('ddd')} ${formattedOpenTime}`;
  };

  // show specific date's hours
  if (dateFetched !== null || dateFetched !== undefined) {
    // console.log({ dateFetched: moment(dateFetched).format('ddd MMM Do') });
    const dayOfWeek = moment(dateFetched).format('dddd').toLowerCase();

    const _hours = time.find(h => h.day === dayOfWeek);

    if (!_hours) return findNextOpenDaysHours();

    const [openingMoment, closingMoment] = createOpeningClosingMoments(_hours);
    const formattedOpenTime = convertTimeString(_hours.open);
    const formattedCloseTime = convertTimeString(_hours.close);

    if (moment().isSame(dateFetched, 'day')) {
      // today
      if (id === 29) {
        console.log(
          id,
          time,
          openingMoment.format(formatStr),
          closingMoment.format(formatStr),
          moment().isSame(dateFetched, 'day'),
          moment().isBefore(openingMoment, 'hour'),
          moment().isBefore(closingMoment, 'hour')
        );
      }
      if (moment().isBefore(openingMoment, 'hour')) {
        return `TODAY • ${formattedOpenTime} - ${formattedCloseTime}`;
      } else if (moment().isBefore(closingMoment, 'hour')) {
        return `OPEN TILL • ${formattedCloseTime}`;
      } else {
        return findNextOpenDaysHours();
      }
    } else if (moment().add(1, 'day').isSame(dateFetched, 'day')) {
      // tomorrow
      return `TOMORROW • ${formattedOpenTime} - ${formattedCloseTime}`;
    } else {
      // other date
      return `${moment(dateFetched).format(
        'ddd MMM Do'
      )} • ${formattedOpenTime} - ${formattedCloseTime}`;
    }
  }

  // show today's hours
  if (!startDate || moment(startDate).isSame(moment(), 'day')) {
    const todayObj = findTodayObj(time);
    if (todayObj) {
      if (
        moment().isBetween(
          createMomentFromTimeString(todayObj.open),
          createMomentFromTimeString(todayObj.close)
        )
      ) {
        return `Open Till  ${convertTimeString(todayObj.close)}`;
      } else if (moment().isBefore(createMomentFromTimeString(todayObj.open))) {
        return `Today • ${convertTimeString(todayObj.open)}`;
      } else {
        const nextOpenDayObj = findNextOpenDayObj(time);
        return `Closed • Open ${convertTimeString(
          createMomentFromTimeString(nextOpenDayObj.open).format('HH:mm')
        )}  ${nextOpenDayObj.day.slice(0, 3)}`;
      }
    } else {
      const nextOpenDayObj = findNextOpenDayObj(time);
      return `Closed • Open ${nextOpenDayObj.day.slice(
        0,
        3
      )} ${convertTimeString(
        createMomentFromTimeString(nextOpenDayObj.open).format('HH:mm')
      )}`;
    }
  }

  // show single day's hours (for featured venues)
  if (startDate && !endDate) {
    const startDateObj = time.find(
      d => d.day === moment(startDate).format('dddd').toLowerCase()
    );
    if (startDateObj) {
      if (
        startDateObj.day === moment().add(1, 'day').format('dddd').toLowerCase()
      ) {
        return `Tomorrow • ${convertTimeString(startDateObj.open)}`;
      } else {
        return `${moment(startDate).format('ddd MMM Do')} • ${convertTimeString(
          startDateObj.open
        )}`;
      }
    } else {
      const nextOpenDayObj = findNextOpenDayObj(time);
      return `Closed • Open ${nextOpenDayObj.day.slice(
        0,
        3
      )} ${convertTimeString(
        createMomentFromTimeString(nextOpenDayObj.open).format('HH:mm')
      )}`;
    }
  }

  const tomorrow = parseInt(moment().add(1, 'day').format('x'));

  // show other day's hours
  const dur = endDate ? moment(endDate).diff(startDate, 'days') : null;
  const startDayIndex = moment(startDate).day();
  const days = [];
  for (let i = 0; i <= dur; i++) {
    const day = moment(startDate)
      .day(startDayIndex + i)
      .format('dddd')
      .toLowerCase();
    days.push(day);
  }
  const hours = time.find(h => days.includes(h.day));

  // show tomorrows hours
  if (hours.day === moment(tomorrow).format('dddd').toLowerCase())
    return `Tomorrow • ${convertTimeString(hours.open)}`;

  return `${moment(startDate).format('ddd MMM Do')} • ${convertTimeString(
    hours.open
  )}`;
};
