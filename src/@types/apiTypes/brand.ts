import { XanoPhoto } from './photo';

export interface XanoBrand {
  id: number;
  created_at: number | Date;
  name: string;
  type: string;
  url: string;
  hero_image: XanoPhoto;
  email: string;
  subcategories: [{ subcategory_id: number }];
  is_approved: boolean;
  membership: [{ user_id: number }];
  tags: [{ tag: string }];
  video?: unknown; // ! TBD
  attachment?: unknown; // ! TBD
  stars: number;
  approved_venues: [{ venue_id: number }];
  slug: string;
}
