import { XanoListing } from '../@types/apiTypes/listing';

const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

export default slugify;

export const createSingleListingSlug = (
  id: number,
  start_date_time: number,
  title: string
): string =>
  `/listings/${id.toString()}/${start_date_time.toString()}/${slugify(title)}`;

export const generateListingPath = (
  listing: XanoListing
): { id: string; slug: string; date: string } => ({
  id: listing.id.toString(),
  date: listing.start_date_time.toString(),
  slug: slugify(listing.title),
});

// ? =======================
// create slugs for ALL listing upcoming dates
// generate carousel card for each upcoming date of listing
// generate page for each upcoming date of listing
// create slug for link on each carousel card
