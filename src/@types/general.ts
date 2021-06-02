export type HTagTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingPropTypes {
  headerType: HTagTypes;
  children: string;
  iconFilename?: string;
  iconFilepath?: string;
  iconAlt?: string;
  uppercase?: boolean;
  className?: string;
  iconDimensions?: { height?: number; width?: number };
}

// export enum SlideInDirection {
//   FromTop = 'FROM_TOP',
//   FromBottom = 'FROM_BOTTOM',
//   FromLeft = 'FROM_LEFT',
//   FromRight = 'FROM_RIGHT',
// }

export enum PageType {
  Index = 'INDEX',
  Venue = 'VENUE',
  Event = 'EVENT',
  Category = 'CATEGORY',
  Map = 'MAP',
}
