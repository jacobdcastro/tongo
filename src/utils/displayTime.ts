import { format } from 'date-fns';

interface DayVenueHours {
  day: string;
  open: string;
  close: string;
}

interface HourObj {
  hour: number;
  minute: number;
}

export const getTodaysHours = (hours: DayVenueHours[]) => {
  const day = format(Date.now(), 'EEEE').toLowerCase();
  return hours.find(d => d.day === day);
};
