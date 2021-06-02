import { XanoPhoto } from './photo';

export interface XanoVisibility {
  type: string;
  restricted: {
    stars_1_2: boolean;
    stars_3: boolean;
    stars_4: boolean;
    stars_5: boolean;
  };
  private: {
    brand_id: number[];
  };
}

export type XanoOfferRedemption = { used_at: number | Date; brand_id: number };

export interface XanoOffer {
  id: number;
  created_at: Date;
  photo: XanoPhoto;
  title: string;
  description: string;
  visibility: XanoVisibility;
  start_date_time: number | Date;
  end_date_time: number | Date;
  coupon_code: string;
  terms_and_conditions: string;
  venue_id: number;
  listing_id?: number;
  redemptions?: XanoOfferRedemption[];
}
