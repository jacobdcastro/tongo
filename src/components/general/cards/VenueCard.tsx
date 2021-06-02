import React, { useState, RefObject, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Card from '../SsrResultCard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { XanoVenue } from '../../../@types/apiTypes/venue';
import {
  createVenueHoursString,
  createVenueHoursStringForCard,
} from '../../../lib/dates';
import CardTypeLabel from './CardTypeLabel';
import { ReactDatesObj } from '../../../@types/state';
import useOfferAvailable from '../../../hooks/useOfferAvailable';
import slugify from '../../../lib/slugify';
import { useQuery, useQueryCache } from 'react-query';
import { getVenueById, getVenueCardById } from '../../../lib/venues';
import ResultsCardSkeleton from './LoadingCard';
import { ListingApiResponse } from '../../../lib/popularSearchQuery';
import { UseQueryCountReturn } from '../../../hooks/useQueryCount';
import useXanoImageByWindowSize from '../../../hooks/useXanoImageByWindowSize';
import moment from 'moment';

interface PropTypes {
  counter: UseQueryCountReturn;
  data: ListingApiResponse | { id: number; index: number };
  isFullWidth?: boolean;
  dates: ReactDatesObj;
  cardRef?: RefObject<HTMLDivElement> | null;
  searchId?: number;
  carouselCounter?: { counter: UseQueryCountReturn; index: number };
}

const VenueCard = ({
  counter,
  data,
  isFullWidth,
  dates,
  cardRef,
  searchId,
  carouselCounter,
}: PropTypes): JSX.Element => {
  const queryCache = useQueryCache();
  const [dateStr, setDateStr] = useState<string>();
  const { isLoading, isIdle, error, data: venue } = useQuery(
    ['venue', data.id, searchId],
    (k, id: number) => getVenueCardById(id),
    {
      enabled:
        data &&
        counter.queryCount === data.index &&
        (carouselCounter
          ? carouselCounter.counter.queryCount === carouselCounter.index
          : true),
      onSuccess: () => counter.handleQueryCompletion(),
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      keepPreviousData: true,
    }
  );

  const [tempHasRefetched, setTempHasRefetched] = useState(false);
  useEffect(() => {
    if (
      carouselCounter &&
      carouselCounter.counter.queryCount === 8 &&
      carouselCounter.index === 4 &&
      !tempHasRefetched
    ) {
      queryCache.refetchQueries(['venue', 101, null], { exact: true });
      setTempHasRefetched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselCounter]);

  useEffect(() => {
    if (venue) {
      setDateStr(
        createVenueHoursStringForCard(
          venue.hours_of_operation,
          dates,
          data.id,
          parseInt(moment().format('x'))
        ).toUpperCase()
      );
    }
  }, [venue, dates, data.id]);

  const offerIsAvailable = useOfferAvailable(venue);

  if (isLoading || isIdle)
    return <ResultsCardSkeleton isFullWidth={isFullWidth} cardRef={cardRef} />;

  if (error || !data) return null;

  return (
    <div draggable={false} ref={cardRef}>
      <Link
        href="/venue/[id]/[slug]"
        as={`/venue/${data.id}/${slugify(venue.name)}`}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <Card isFullWidth={isFullWidth}>
            <div className="image">
              <div className="cardIcons">
                <CardTypeLabel
                  label={'venue'}
                  offer={venue._offer_of_venue[0]}
                  offerIsAvailable={offerIsAvailable}
                />
                {/* <button className="favoriteIconBtn">
                <img />
              </button> */}
              </div>
              <span className="overlay" />
              <img
                className="cardHeroImg"
                src={
                  venue.main_image
                    ? `https://x608-3b7f-b1ce.n7.xano.io${
                        venue.main_image.path
                      }?tpl=${'big'}`
                    : '/assets/heroImg/image1.png'
                }
                alt=""
              />
            </div>

            <div className="info">
              <p className="time">{dateStr}</p>
              <h3>{venue.tagline || venue.description}</h3>
              <h4>{venue.name}</h4>
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

export default VenueCard;
