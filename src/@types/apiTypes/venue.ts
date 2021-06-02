import { XanoPhoto } from './photo';
import { VenueHours, XanoCTAButton } from './xanoGeneral';
import { StartEndDates, XanoListing } from './listing';
import { XanoOffer } from './offer';
import { XanoSubcategory } from './subcategoriy';

export class XanoVenue {
  id: number;
  created_at: Date;
  name: string;
  tagline: string;
  description: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: number;
  phone_number: string;
  website: string;
  email: string;
  price: string;
  subcategories: [
    {
      subcategory_id: number;
      _subcategory: XanoSubcategory;
    }
  ];
  customer_alert: string;
  hours_of_operation: VenueHours;
  latitude: number;
  longitude: number;
  brands: [
    {
      brand_id: number;
      is_approved: boolean;
    }
  ];
  buttons?: [
    {
      show_button: boolean;
      button: string;
      url: string;
    }
  ];
  button?: XanoCTAButton;
  button_2?: XanoCTAButton;
  membership: [
    {
      user_id: number;
    }
  ];
  avatar: string;
  main_image: XanoPhoto;
  dine_in: boolean;
  take_out: boolean;
  delivery: boolean;
  outdoor_seating: boolean;
  curbside_pickup: boolean;
  tags: string[];
  _listing_of_venue: XanoListing;
  published: boolean;
  _offer_of_venue?: XanoOffer[];
  active_ts?: number;

  // these fields are added in getSearchedListingsAndVenues() for use by listing/venue result cards
  type?: string;
  distance?: number;

  start_date_time?: number;
  end_date_time?: number;

  constructor(data: XanoVenue, dates?: StartEndDates) {
    this.id = data.id;
    this.created_at = data.created_at;
    this.name = data.name;
    this.tagline = data.tagline;
    this.description = data.description;
    this.address1 = data.address1;
    this.address2 = data.address2;
    this.city = data.city;
    this.state = data.state;
    this.zip_code = data.zip_code;
    this.phone_number = data.phone_number;
    this.website = data.website;
    this.email = data.email;
    this.price = data.price;
    this.subcategories = data.subcategories;
    this.customer_alert = data.customer_alert;
    this.hours_of_operation = data.hours_of_operation;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.brands = data.brands;
    this.buttons = data.buttons;
    this.button = data.button;
    this.button_2 = data.button_2;
    this.membership = data.membership;
    this.avatar = data.avatar;
    this.main_image = data.main_image;
    this.dine_in = data.dine_in;
    this.take_out = data.take_out;
    this.delivery = data.delivery;
    this.outdoor_seating = data.outdoor_seating;
    this.curbside_pickup = data.curbside_pickup;
    this.tags = data.tags;
    this._listing_of_venue = data._listing_of_venue;
    this._offer_of_venue = data._offer_of_venue;
    this.type = data.type;
    this.distance = data.distance;
    this.published = data.published;
    this.active_ts = data.active_ts;

    if (dates) {
      this.start_date_time = dates.start_date_time;
      this.end_date_time = dates.end_date_time;
    }
  }
}
