import { FilterState } from '../state';
import { XanoPhoto } from './photo';

export interface PopularSearch {
  id: number;
  created_at: number | Date;
  name: string;
  categories: [{ category_id: number }];
  subcategories: [{ subcategory_id: number }];
  featured_venues: number[];
  suggested_filter?: FilterState;
  hero_image?: XanoPhoto;
}
