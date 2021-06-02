import React, { RefObject, useEffect } from 'react';
import Link from 'next/link';
import {
  getListingById,
  getListingCardById,
  isXanoVenue,
} from '../../../lib/listings';
import slugify, { createSingleListingSlug } from '../../../lib/slugify';
import Card from '../SsrResultCard';
import { createListingHoursString } from '../../../lib/dates';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CardTypeLabel from './CardTypeLabel';
import useOfferAvailable from '../../../hooks/useOfferAvailable';
import { useQuery } from 'react-query';
import ResultsCardSkeleton from './LoadingCard';
import { ListingApiResponse } from '../../../lib/popularSearchQuery';
import { UseQueryCountReturn } from '../../../hooks/useQueryCount';
import moment from 'moment';

interface PropTypes {
  counter: UseQueryCountReturn;
  data: ListingApiResponse;
  isFullWidth?: boolean;
  cardRef?: RefObject<HTMLDivElement> | null;
  searchId?: number;
}

const ListingCard = ({
  counter,
  data,
  isFullWidth,
  cardRef,
  searchId,
}: PropTypes): JSX.Element => {
  const { isLoading, isFetching, isIdle, error, data: listing } = useQuery(
    [data.type, data.id, searchId],
    (k, id: number) => getListingCardById(id),
    {
      enabled: data && counter.queryCount === data.index,
      onSuccess: () => counter.handleQueryCompletion(),
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // keepPreviousData: true,
    }
  );

  if (isLoading || isIdle)
    return <ResultsCardSkeleton isFullWidth={isFullWidth} cardRef={cardRef} />;

  return (
    <div draggable="false" ref={cardRef}>
      <Link
        href="/listings/[id]/[date]/[slug]"
        as={createSingleListingSlug(
          data.id,
          data.start_date_time,
          listing.title
        )}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <Card isFullWidth={isFullWidth}>
            <div className="image">
              <div className="cardIcons">
                <CardTypeLabel label={listing.type} offerIsAvailable={false} />
                {/* <button className="favoriteIconBtn">
                <img />
              </button> */}
              </div>
              <span className="overlay" />
              <img
                className="cardHeroImg"
                src={
                  listing.photo
                    ? `https://x608-3b7f-b1ce.n7.xano.io${listing.photo.path}?tpl=big`
                    : '/assets/heroImg/image1.png'
                }
                alt=""
              />
            </div>

            <div className="info">
              <p className="time">
                {createListingHoursString(
                  data.start_date_time,
                  data.end_date_time,
                  listing.id
                ).toUpperCase()}
              </p>
              <h3>{listing.title}</h3>
              <h4>{listing._venue.name}</h4>
              {/* <span className="location">
                <LocationOnIcon />
                0.3mi
              </span> */}
            </div>
          </Card>
        </a>
      </Link>
    </div>
  );
};

export default ListingCard;
