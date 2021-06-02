import React, { RefObject, useMemo } from 'react';
import styled from 'styled-components';
import pulsate from '../../../styles/keyframes/Pulsate';

interface CardProps {
  isFullWidth: boolean;
  cardRef?: RefObject<HTMLDivElement> | null;
}

const LoadingCardDiv = styled.div<CardProps>`
  flex-grow: 1;
  height: 270px;
  width: 100%;
  background-color: ${props => props.theme.bg};
  margin: ${props => (props.isFullWidth ? '15px 0 20px' : '0')};
  box-shadow: 2px 4px 10px #ddd;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  pointer-events: auto;

  .bg-pulse {
    animation: 2s ${pulsate} infinite;
    border-radius: 2px;
  }

  .image {
    position: relative;
    height: 70%;
    border-radius: 8px 8px 0 0;
  }

  .info {
    position: relative;
    height: 30%;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .time {
      padding: 3px 0;
      height: 10px;
      width: 40%;
    }
    .h3 {
      width: 50%;
      height: 18px;
      padding: 3px 0;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }

    .h4 {
      // ! TEMPORARY until location services are added
      /* width: calc(100% - 49px); */
      width: 70%;
      height: 12px;

      padding: 3px 0;
    }
  }
`;

const ResultsCardSkeleton = ({
  isFullWidth,
  cardRef,
}: CardProps): JSX.Element => {
  return (
    <LoadingCardDiv isFullWidth={isFullWidth} draggable={false} ref={cardRef}>
      <div className="image bg-pulse" />
      <div className="info">
        <div className="time bg-pulse" />
        <div className="h3 bg-pulse" />
        <div className="h4 bg-pulse" />
      </div>
    </LoadingCardDiv>
  );
};

export default ResultsCardSkeleton;

export const MultipleLoadingCards = ({
  count,
  isFullWidth,
}: {
  count: number;
  isFullWidth?: boolean;
}): JSX.Element => {
  const arr = useMemo(() => {
    const j = [];
    for (let i = 0; i < count; i++) {
      j.push(i);
    }
    return j;
  }, [count]);
  return (
    <>
      {arr.forEach(i => (
        <ResultsCardSkeleton key={i} isFullWidth={isFullWidth} />
      ))}
    </>
  );
};
