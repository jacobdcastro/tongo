import { XanoPhoto } from './photo';
import { XanoVenue } from './venue';

export interface XanoRecurringObj {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly' | '';
  weekly: {
    weeks: number;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  monthly: {
    type: 'date' | 'day';
    months: number;
    weeks: number;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    day: number;
    first: boolean;
    second: boolean;
    third: boolean;
    fourth: boolean;
    fifth: boolean;
    last: boolean;
  };
  yearly: {
    years: number;
  };
  ends_on: Date;
}

export type StartEndDates = {
  start_date_time?: number;
  end_date_time?: number;
  startDate?: number;
  endDate?: number;
};

export class XanoListing {
  id: number;
  created_at: Date;
  photo: XanoPhoto;
  title: string;
  description: string;
  start_date_time: number;
  end_date_time: number;
  price: number;
  tags: string[];
  subcategories: [{ subcategory_id: number }];
  venue_id: number;
  tickets_available: number;
  recurring: XanoRecurringObj;
  type: 'event' | 'special';
  published: boolean;
  _venue?: XanoVenue;
  upcoming_dates: StartEndDates[];
  distance?: number;

  constructor(data: XanoListing, dates?: StartEndDates) {
    this.id = data.id;
    this.created_at = data.created_at;
    this.photo = data.photo;
    this.title = data.title;
    this.description = data.description;
    this.start_date_time = data.start_date_time;
    this.end_date_time = data.end_date_time;
    this.price = data.price;
    this.tags = data.tags;
    this.subcategories = data.subcategories;
    this.venue_id = data.venue_id;
    this.tickets_available = data.tickets_available;
    this.recurring = data.recurring;
    this.type = data.type;
    this.published = data.published;
    this._venue = data._venue;
    this.upcoming_dates = data.upcoming_dates;
    this.distance = data.distance;

    if (dates) {
      this.start_date_time = dates.start_date_time;
      this.end_date_time = dates.end_date_time;
    }
  }
}
