export interface XanoSubcategory {
  id: number;
  created_at: number | Date;
  name: string;
  category_id: number;
  suggested_tags?: [{ tag: string }];
  type?: string;
}
