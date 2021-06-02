import React, { Ref, RefObject, useState } from 'react';
import VenueCard from '../cards/VenueCard';
import ListingCard from '../cards/ListingCard';
import { ReactDatesObj } from '../../../@types/state';
import { UseQueryCountReturn } from '../../../hooks/useQueryCount';
import { ListingApiResponse } from '../../../lib/popularSearchQuery';

interface PropTypes {
  counter: UseQueryCountReturn;
  resultData: ListingApiResponse;
  // resultData: number;
  dates: ReactDatesObj;
  isFullWidth?: boolean;
  cardRef?: RefObject<HTMLDivElement>;
}

const ResultsCard = ({
  counter,
  resultData,
  isFullWidth,
  dates,
  cardRef,
}: PropTypes): JSX.Element => {
  return resultData.type === 'venue' ? (
    <VenueCard
      counter={counter}
      data={resultData}
      isFullWidth={isFullWidth}
      dates={dates}
      cardRef={cardRef ? cardRef : null}
    />
  ) : (
    <ListingCard
      counter={counter}
      data={resultData}
      isFullWidth={isFullWidth}
      cardRef={cardRef ? cardRef : null}
    />
  );
};
export default ResultsCard;
