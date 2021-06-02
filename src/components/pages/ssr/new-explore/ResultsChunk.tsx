import React, { RefObject, useState } from 'react';
import { ListingApiResponse } from '../../../../lib/popularSearchQuery';
import useQueryCount from '../../../../hooks/useQueryCount';
import ResultsCard from '../../../general/carousels/CategoryCarouselCard';
import { FilterState } from '../../../../@types/state';

interface PropTypes {
  chunk: ListingApiResponse[];
  previousChunksLength: number;
  filter: FilterState;
  cardRef: RefObject<HTMLDivElement>;
  indexToFetchMore: number;
}

const ResultsChunk = ({
  chunk,
  previousChunksLength,
  filter,
  cardRef,
  indexToFetchMore,
}: PropTypes): JSX.Element => {
  const { queryCount, handleQueryCompletion, resetCount } = useQueryCount();
  if (chunk.length === 0) return null;
  return (
    <>
      {chunk.map(
        (result, i) =>
          result &&
          (previousChunksLength + i - 1 === indexToFetchMore ? (
            <ResultsCard
              key={i}
              counter={{
                queryCount,
                handleQueryCompletion,
                resetCount,
              }}
              resultData={{ ...result, index: i }}
              dates={filter.dates}
              cardRef={cardRef}
              isFullWidth
            />
          ) : (
            <ResultsCard
              key={i}
              counter={{
                queryCount,
                handleQueryCompletion,
                resetCount,
              }}
              resultData={{ ...result, index: i }}
              dates={filter.dates}
              isFullWidth
            />
          ))
      )}
    </>
  );
};

export default ResultsChunk;
